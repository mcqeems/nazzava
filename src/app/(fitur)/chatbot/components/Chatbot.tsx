/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ButtonBack } from '@/components/ui/button-back';
import { nazzaBotChat, type NazzaBotMessage } from '../actions/actions';
import MarkdownMessage from './MarkdownMessage';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const STORAGE_KEY = 'nazzabot_history_v1';
const MAX_MEMORY = 5;

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
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<Message[]>([]);

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

  const getNazzaBotResponse = async (nextMessages: Message[]) => {
    // Only send last 5 messages to the server
    const sliced = nextMessages.slice(-MAX_MEMORY);
    const payload: NazzaBotMessage[] = sliced.map((m) => ({
      role: m.role === 'bot' ? 'assistant' : 'user',
      content: m.content,
    }));

    return normalizeBotText((await nazzaBotChat(payload)).trim());
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.lang = 'id-ID';
        recognitionRef.current.interimResults = false;
        recognitionRef.current.maxAlternatives = 1;

        recognitionRef.current.onresult = async (event: any) => {
          const transcript = String(event?.results?.[0]?.[0]?.transcript ?? '').trim();
          setPrompt('');
          setLoading(true);
          setShowHeader(false);
          const userMsg: Message = { role: 'user', content: transcript };
          const nextMessages: Message[] = [...messagesRef.current, userMsg].slice(-MAX_MEMORY);
          setMessages(nextMessages);
          try {
            const response = await getNazzaBotResponse(nextMessages);
            await typeText(response);
          } catch {
            setMessages((prev) => [...prev, { role: 'bot', content: 'Terjadi kesalahan. Silakan coba lagi.' }]);
            setLoading(false);
          }
        };

        recognitionRef.current.onerror = () => {};
      }
    }
  }, []);

  const typeText = async (text: string) => {
    setTypingContent('');
    let index = 0;
    setShowSuggestions(false);
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
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setShowHeader(false);
    const input = prompt;
    setPrompt('');
    try {
      const userMsg: Message = { role: 'user', content: input };
      const nextMessages: Message[] = [...messages, userMsg].slice(-MAX_MEMORY);
      setMessages(nextMessages);
      const response = await getNazzaBotResponse(nextMessages);
      await typeText(response);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: 'bot', content: 'Terjadi kesalahan. Silakan coba lagi.' }]);
      setLoading(false);
    }
  };

  const handleAsk = async (question: string) => {
    setPrompt('');
    setShowSuggestions(false);
    setShowHeader(false);
    setLoading(true);
    try {
      const userMsg: Message = { role: 'user', content: question };
      const nextMessages: Message[] = [...messages, userMsg].slice(-MAX_MEMORY);
      setMessages(nextMessages);
      const response = await getNazzaBotResponse(nextMessages);
      await typeText(response);
    } catch {
      setMessages((prev) => [...prev, { role: 'bot', content: 'Terjadi kesalahan. Silakan coba lagi.' }]);
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const handleShowMic = () => {
    if (typeof window !== 'undefined') {
      const micAudio = new Audio('/audio/mic.mp3');
      micAudio.play();
    }
    recognitionRef.current?.start();
  };

  return (
    <div>
      <ButtonBack />
      <div
        className="w-full flex-col flex fixed font-poppins justify-between h-screen pt-24"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        {showHeader && (
          <div className="flex flex-col justify-center lg:mt-0 mt-12 items-center gap-8 ">
            <Image src="/image/chatbot/ask.webp" alt="Ask" width={35} height={35} className="lg:w-8.75 w-6.25 h-auto" />
            <h1 className="font-semibold text-[16px] lg:text-[24px] text-center ">Tanyakan apa saja kepada AI kami</h1>
          </div>
        )}

        <div className="flex flex-col mx-auto w-[320px] lg:w-225 justify-between h-[calc(100vh-100px)] pb-14">
          <div
            className={`flex flex-col overflow-y-auto px-2 lg:px-6 py-4 space-y-4 ${
              messages.length > 0 ? 'h-full' : 'lg:h-[26vh] h-[16vh]'
            }`}
          >
            {messages.map((msg, index) => (
              <div key={index} className="flex flex-col gap-1 lg:gap-2">
                <div
                  className={`w-full text-[18px] text-foreground flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <p className="font-medium">{msg.role === 'user' ? 'Me' : 'Greenly Bot'}</p>
                </div>
                <div
                  className={`p-4 rounded-lg max-w-[95%] lg:max-w-[70%] shadow-md ${
                    msg.role === 'user' ? 'bg-card text-foreground ml-auto' : 'bg-card text-foreground mr-auto'
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
                <div className="animate-pulse bg-white p-4 rounded-lg w-[70%] shadow-md">
                  <Image src="/image/chatbot/answer.svg" alt="Loading" width={20} height={20} />
                </div>
              </div>
            )}

            {typingContent && (
              <div className="flex justify-start">
                <div className="bg-card p-4 rounded-lg max-w-[95%] lg:max-w-[70%] shadow-md text-[10px] lg:text-[14px] text-left text-foreground wrap-break-word leading-relaxed">
                  <MarkdownMessage content={typingContent} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {showSuggestions && (
            <div className="mb-0">
              <h1 className="text-foreground text-[14px] lg:text-[16px] mb-2 font-medium">
                Saran tentang apa yang harus ditanyakan kepada AI kami
              </h1>
              <div className="flex flex-wrap gap-3 my-4">
                {['Halo siapa kamu?', 'Bagaimana menjaga lingkungan?', 'Cara mendaur ulang sampah?'].map(
                  (question, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAsk(question)}
                      className="bg-card px-6 py-3 rounded-full text-[10px] lg:text-[12px] shadow-sm"
                    >
                      {question}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          <div className="flex items-center w-full bg-card h-20 px-4 lg:px-6 rounded-xl shadow-lg">
            <input
              type="text"
              placeholder="Tanyakan apa pun tentang kondisi lingkungan Kamu sekarang"
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                if (e.target.value.trim()) setShowSuggestions(false);
              }}
              onKeyDown={handleKeyDown}
              className="w-full outline-none text-[12px] lg:text-[14px] pr-4"
            />
            <Image
              src="/image/chatbot/mic.webp"
              alt="Mic"
              width={25}
              height={25}
              onClick={handleShowMic}
              className="cursor-pointer lg:w-7.5 w-6.25 mr-4"
            />
            <Image
              src="/image/chatbot/send.svg"
              alt="Send"
              width={25}
              height={25}
              onClick={handleSubmit}
              className="cursor-pointer lg:w-6.25 w-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
