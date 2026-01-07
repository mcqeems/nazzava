/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ButtonBack } from '@/components/ui/button-back';
import { nazzaBotChat, type NazzaBotMessage } from '../actions/actions';
import MarkdownMessage from './MarkdownMessage';
import { BotIcon, EllipsisVerticalIcon, MicIcon, MicOffIcon, SendHorizonalIcon } from 'lucide-react';
import Dot from './Dot';
import CuteBot from './CuteBot';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const STORAGE_KEY = 'nazzabot_history_v1';
const MAX_MEMORY = 5;

const MENU_ANIM_MS = 160;
const DIALOG_ANIM_MS = 180;

const TYPING_INTERVAL_MS = 16; // ~60fps
const TYPING_CHARS_PER_TICK = 12; // faster typing

function normalizeBotText(text: string) {
  // If the model escapes <br>, unescape it so tables can keep line breaks.
  let out = text.replaceAll(/\r\n|\r/g, '\n');
  out = out.replaceAll(/&lt;br\s*\/?\s*&gt;/gi, '<br>');

  // Prevent massive vertical gaps when the model outputs many <br> or blank lines.
  out = out.replaceAll(/(<br\s*\/?\s*>\s*){3,}/gi, '<br><br>');
  out = out.replaceAll(/\n{3,}/g, '\n\n');
  return out;
}

function loadHistory(): Message[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const cleaned: Message[] = parsed
      .filter((m: any) => m && (m.role === 'user' || m.role === 'bot') && typeof m.content === 'string')
      .map((m: any) => ({ role: m.role, content: String(m.content) }))
      .filter((m: Message) => m.content.trim().length > 0);
    return cleaned.slice(-MAX_MEMORY);
  } catch {
    return [];
  }
}

function saveHistory(messages: Message[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_MEMORY)));
  } catch {
    // ignore storage quota / disabled storage
  }
}

export default function Chatbot() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [typingContent, setTypingContent] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoMounted, setInfoMounted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<Message[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuOpenRafRef = useRef<number | null>(null);
  const infoOpenRafRef = useRef<number | null>(null);
  const voiceAutoSubmitTimeoutRef = useRef<number | null>(null);
  const voicePendingTranscriptRef = useRef<string | null>(null);
  const voiceUserInteractedRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, typingContent]);

  useEffect(() => {
    const history = loadHistory();
    if (history.length > 0) {
      setMessages(history);
      setShowSuggestions(false);
      setShowHeader(false);
    }
  }, []);

  useEffect(() => {
    saveHistory(messages);
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (menuOpen) {
      setMenuMounted(true);
      return;
    }
    if (!menuMounted) return;
    const t = window.setTimeout(() => setMenuMounted(false), MENU_ANIM_MS);
    return () => window.clearTimeout(t);
  }, [menuOpen, menuMounted]);

  useEffect(() => {
    if (infoOpen) {
      setInfoMounted(true);
      return;
    }
    if (!infoMounted) return;
    const t = window.setTimeout(() => setInfoMounted(false), DIALOG_ANIM_MS);
    return () => window.clearTimeout(t);
  }, [infoOpen, infoMounted]);

  useEffect(() => {
    if (!menuOpen && !infoOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setMenuOpen(false);
      setInfoOpen(false);
    };

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (menuOpen && menuRef.current && !menuRef.current.contains(target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [menuOpen, infoOpen]);

  const openMenu = useCallback(() => {
    setMenuMounted(true);
    if (menuOpenRafRef.current !== null) {
      window.cancelAnimationFrame(menuOpenRafRef.current);
    }
    menuOpenRafRef.current = window.requestAnimationFrame(() => {
      setMenuOpen(true);
      menuOpenRafRef.current = null;
    });
  }, []);

  const closeMenu = useCallback(() => {
    if (menuOpenRafRef.current !== null) {
      window.cancelAnimationFrame(menuOpenRafRef.current);
      menuOpenRafRef.current = null;
    }
    setMenuOpen(false);
  }, []);

  const openInfo = useCallback(() => {
    setInfoMounted(true);
    if (infoOpenRafRef.current !== null) {
      window.cancelAnimationFrame(infoOpenRafRef.current);
    }
    infoOpenRafRef.current = window.requestAnimationFrame(() => {
      setInfoOpen(true);
      infoOpenRafRef.current = null;
    });
  }, []);

  const closeInfo = useCallback(() => {
    if (infoOpenRafRef.current !== null) {
      window.cancelAnimationFrame(infoOpenRafRef.current);
      infoOpenRafRef.current = null;
    }
    setInfoOpen(false);
  }, []);

  const getNazzaBotResponse = useCallback(async (nextMessages: Message[]) => {
    // Only send last 5 messages to the server
    const sliced = nextMessages.slice(-MAX_MEMORY);
    const payload: NazzaBotMessage[] = sliced.map((m) => ({
      role: m.role === 'bot' ? 'assistant' : 'user',
      content: m.content,
    }));

    return normalizeBotText((await nazzaBotChat(payload)).trim());
  }, []);

  const clearVoiceAutoSubmit = useCallback(() => {
    if (voiceAutoSubmitTimeoutRef.current !== null) {
      window.clearTimeout(voiceAutoSubmitTimeoutRef.current);
      voiceAutoSubmitTimeoutRef.current = null;
    }
    voicePendingTranscriptRef.current = null;
    voiceUserInteractedRef.current = false;
  }, []);

  const markVoiceInputInteracted = useCallback(() => {
    if (voiceAutoSubmitTimeoutRef.current === null) return;
    voiceUserInteractedRef.current = true;
    if (voiceAutoSubmitTimeoutRef.current !== null) {
      window.clearTimeout(voiceAutoSubmitTimeoutRef.current);
      voiceAutoSubmitTimeoutRef.current = null;
    }
    voicePendingTranscriptRef.current = null;
  }, []);

  const typeText = useCallback(async (text: string) => {
    setTypingContent('');
    let index = 0;
    setLoading(false);
    const interval = setInterval(() => {
      if (index < text.length) {
        const nextIndex = Math.min(index + TYPING_CHARS_PER_TICK, text.length);
        const chunk = text.slice(index, nextIndex);
        index = nextIndex;
        setTypingContent((prev) => prev + chunk);
      } else {
        clearInterval(interval);
        setMessages((prev) => [...prev, { role: 'bot' as const, content: text }].slice(-MAX_MEMORY));
        setTypingContent('');
        setLoading(false);
      }
    }, TYPING_INTERVAL_MS);
  }, []);

  const submitText = useCallback(
    async (text: string) => {
      const input = text.trim();
      if (!input) return;

      clearVoiceAutoSubmit();
      setLoading(true);
      setShowHeader(false);
      setPrompt('');

      try {
        const userMsg: Message = { role: 'user', content: input };
        const nextMessages: Message[] = [...messagesRef.current, userMsg].slice(-MAX_MEMORY);
        setMessages(nextMessages);
        const response = await getNazzaBotResponse(nextMessages);
        await typeText(response);
      } catch (error) {
        console.error(error);
        setMessages((prev) => [...prev, { role: 'bot', content: 'Terjadi kesalahan. Silakan coba lagi.' }]);
        setLoading(false);
      }
    },
    [clearVoiceAutoSubmit, getNazzaBotResponse, typeText]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'id-ID';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = String(event?.results?.[0]?.[0]?.transcript ?? '').trim();
      if (!transcript) return;

      // Show transcript in the input first.
      setPrompt(transcript);
      setShowHeader(false);

      // Auto-submit after 1.5s if the user doesn't interact (focus/change).
      if (voiceAutoSubmitTimeoutRef.current !== null) {
        window.clearTimeout(voiceAutoSubmitTimeoutRef.current);
      }
      voicePendingTranscriptRef.current = transcript;
      voiceUserInteractedRef.current = false;
      voiceAutoSubmitTimeoutRef.current = window.setTimeout(() => {
        const pending = voicePendingTranscriptRef.current;
        if (!pending) return;
        if (voiceUserInteractedRef.current) return;
        if (pending !== transcript) return;
        submitText(transcript);
      }, 1500);
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.abort();
      } catch {
        // ignore
      }

      if (voiceAutoSubmitTimeoutRef.current !== null) {
        window.clearTimeout(voiceAutoSubmitTimeoutRef.current);
        voiceAutoSubmitTimeoutRef.current = null;
      }
    };
  }, [submitText]);

  const handleSubmit = async () => {
    setShowSuggestions(false);
    await submitText(prompt);
  };

  const handleAsk = async (question: string) => {
    setShowSuggestions(false);
    await submitText(question);
  };

  const hasChat = messages.length > 0;

  const handleDeleteChat = useCallback(() => {
    if (!hasChat) return;
    clearVoiceAutoSubmit();
    setMenuOpen(false);
    setInfoOpen(false);
    setPrompt('');
    setTypingContent('');
    setLoading(false);
    setMessages([]);
    setShowHeader(true);
    setShowSuggestions(true);
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [clearVoiceAutoSubmit, hasChat]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const handleShowMic = () => {
    if (!speechSupported) return;

    // Toggle listening
    if (isListening) {
      try {
        recognitionRef.current?.stop?.();
      } catch {
        // ignore
      }
      return;
    }

    try {
      recognitionRef.current?.start?.();
    } catch {
      // Some browsers throw if start() is called too fast.
    }
  };

  return (
    <div>
      <ButtonBack />
      <div
        className="fixed inset-0 z-40 flex flex-col font-poppins pt-12 md:pt-24"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        {showHeader && (
          <div className="flex flex-col justify-center lg:mt-0 mt-12 items-center gap-8 shrink-0">
            <div className="scale-50 md:scale-80 md:mb-10">
              <CuteBot />
            </div>
            <h1 className="font-semibold text-[16px] lg:text-[24px] text-center">
              Tanyakan apa saja kepada NazzaBot!{' '}
            </h1>
          </div>
        )}

        <div className="flex flex-col mx-auto w-[320px] lg:w-225 flex-1 min-h-0 pb-14">
          <div
            className={`flex flex-col scrollbar-custom lg:px-6 py-4 space-y-4 ${
              messages.length > 0 ? 'flex-1 min-h-0' : 'lg:h-[26vh] h-[16vh] shrink-0'
            }`}
          >
            {messages.map((msg, index) => (
              <div key={index} className="flex flex-col gap-1 lg:gap-2">
                <div
                  className={`w-full text-[12px] md:text-base text-foreground flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div>
                    {msg.role === 'user' ? (
                      ''
                    ) : (
                      <div
                        className={`bg-primary-light p-3 flex flex-row items-center justify-center gap-2 rounded-lg ${
                          index === messages.length - 1 ? 'fade-in-down' : ''
                        }`}
                      >
                        <BotIcon className="md:h-6 h-4 w-auto" />
                        NazzaBot
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={`p-4 rounded-lg max-w-full shadow-md ${
                    msg.role === 'user' ? 'bg-card text-foreground ml-auto' : 'text-foreground mr-auto'
                  }`}
                >
                  <div className="text-[10px] lg:text-[14px] text-left wrap-break-word leading-relaxed">
                    <MarkdownMessage content={msg.content} />
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-card max-h-3 p-4 rounded-lg shadow-md flex items-center justify-center">
                  <Dot />
                </div>
              </div>
            )}

            {typingContent && (
              <div className="flex justify-start">
                <div className="p-4 rounded-lg max-w-full shadow-md text-[10px] lg:text-[14px] text-left text-foreground wrap-break-word leading-relaxed">
                  <MarkdownMessage content={typingContent} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="mt-auto">
            {showSuggestions && (
              <div>
                <h1 className="text-foreground text-[14px] lg:text-[16px] mb-2 font-medium">
                  Saran tentang apa yang harus ditanyakan kepada AI kami
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                  {['Halo siapa kamu?', 'Bagaimana menjaga lingkungan?', 'Cara mendaur ulang sampah?'].map(
                    (question, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAsk(question)}
                        className="w-full bg-card hover:bg-border transition-colors cursor-pointer px-6 py-3 rounded-lg text-center text-[10px] lg:text-[12px] shadow-sm"
                      >
                        {question}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
            <div className="flex items-center w-full bg-card h-20 px-2 gap-4 lg:px-4 rounded-xl shadow-lg">
              <div ref={menuRef} className="relative">
                <button
                  type="button"
                  aria-label="Open menu"
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  onClick={() => {
                    if (menuOpen) closeMenu();
                    else openMenu();
                  }}
                  className="cursor-pointer transition-colors text-foreground hover:text-muted-text"
                >
                  <EllipsisVerticalIcon />
                </button>

                {menuMounted && (
                  <div
                    role="menu"
                    aria-label="Chat menu"
                    className={`absolute left-0 bottom-12 z-50 min-w-44 overflow-hidden rounded-xl border border-border bg-card shadow-lg origin-bottom-left transition-all duration-150 ease-out ${
                      menuOpen
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 translate-y-1 pointer-events-none'
                    }`}
                  >
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        closeMenu();
                        openInfo();
                      }}
                      className="w-full px-4 py-3 text-left text-[12px] lg:text-[13px] text-foreground hover:bg-border ease-in-out transition-colors cursor-pointer"
                    >
                      Info
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      disabled={!hasChat}
                      aria-disabled={!hasChat}
                      onClick={handleDeleteChat}
                      className="w-full px-4 py-3 text-left text-[12px] lg:text-[13px] text-foreground transition-colors disabled:opacity-50 hover:bg-red-900 cursor-pointer disabled:cursor-not-allowed"
                    >
                      Delete chat
                    </button>
                  </div>
                )}
              </div>
              <input
                type="text"
                placeholder="Tanyakan apa pun tentang kondisi lingkungan Kamu sekarang"
                value={prompt}
                onFocus={markVoiceInputInteracted}
                onChange={(e) => {
                  markVoiceInputInteracted();
                  setPrompt(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                className="w-full outline-none text-[12px] lg:text-[14px] pr-4"
              />
              <button
                type="button"
                aria-label={
                  speechSupported
                    ? isListening
                      ? 'Stop voice input'
                      : 'Start voice input'
                    : 'Voice input not supported'
                }
                aria-pressed={isListening}
                disabled={!speechSupported}
                className={`relative cursor-pointer lg:w-7.5 w-6.25 transition-all text-foreground hover:text-muted-text disabled:opacity-50 disabled:cursor-not-allowed ${
                  isListening ? 'text-primary hover:text-primary' : ''
                }`}
                onClick={handleShowMic}
              >
                {isListening && (
                  <>
                    <span className="pointer-events-none absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                    <span className="pointer-events-none absolute -inset-1.5 rounded-full border border-primary/30 animate-[audioWave_1.2s_ease-out_infinite]" />
                  </>
                )}
                <span className="relative inline-flex items-center justify-center">
                  {isListening ? <MicOffIcon width={25} height={25} /> : <MicIcon width={25} height={25} />}
                </span>
              </button>
              <button
                className="cursor-pointer lg:w-7.5 w-6.25  transition-all text-foreground hover:text-muted-text"
                onClick={handleSubmit}
              >
                <span className="relative inline-flex items-center justify-center">
                  <SendHorizonalIcon width={25} height={25} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {infoMounted && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="About NazzaBot"
          className="fixed inset-0 z-60 flex items-center justify-center scale-100 md:scale-110"
        >
          <button
            type="button"
            aria-label="Close dialog"
            onClick={closeInfo}
            className={`absolute inset-0 bg-foreground/30 transition-opacity duration-150 ease-out ${
              infoOpen ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div
            className={`relative w-[92vw] max-w-lg rounded-2xl border border-border bg-card p-5 shadow-xl origin-center transition-all duration-150 ease-out ${
              infoOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-1'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-[16px] lg:text-[18px] font-semibold text-foreground">NazzaBot</h2>
                <p className="mt-1 text-[12px] lg:text-[13px] text-muted-text">
                  Asisten AI untuk membantu kamu belajar dan mengambil langkah kecil yang berdampak untuk lingkungan.
                </p>
              </div>
              <button
                type="button"
                onClick={closeInfo}
                className="shrink-0 rounded-lg px-2 py-1 text-[12px] lg:text-[13px] text-foreground bg-transparent ease-in-out cursor-pointer hover:bg-border transition-colors border border-border"
              >
                Close
              </button>
            </div>

            <div className="mt-4 space-y-3 text-[12px] lg:text-[13px] text-foreground">
              <div>
                <p className="font-medium">Best use cases</p>
                <p className="text-muted-text">
                  Tanya cara memilah sampah, ide pengurangan plastik, kebiasaan hemat air/energi, dan penjelasan singkat
                  tentang isu lingkungan.
                </p>
              </div>
              <div>
                <p className="font-medium">Cara pakai</p>
                <p className="text-muted-text">
                  Kamu bisa input dengan teks atau dengan suara (ikon mic). Setelah berbicara, hasilnya akan muncul di
                  input dan otomatis terkirim jika kamu tidak mengubahnya.
                </p>
              </div>
              <div>
                <p className="font-medium">Tips</p>
                <p className="text-muted-text">
                  Berikan konteks singkat (lokasi/kondisi) dan tujuan kamu supaya jawabannya lebih relevan.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
