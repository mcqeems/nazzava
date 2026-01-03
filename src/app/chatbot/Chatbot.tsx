/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ButtonBack } from '@/components/ui/button-back';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const genAI = new GoogleGenerativeAI('AIzaSyD64u_CJq5n5N_twIqjlsMH8bo6tx_jy34');
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

export default function Chatbot() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [showMic, setShowMic] = useState(false);
  const [typingContent, setTypingContent] = useState('');
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, typingContent]);

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
          const transcript = event.results[0][0].transcript;
          setPrompt('');
          setShowMic(false);
          setLoading(true);
          setShowHeader(false);
          setMessages((prev) => [...prev, { role: 'user', content: transcript }]);
          try {
            const response = await getCustomResponse(transcript);
            await typeText(response);
          } catch {
            setMessages((prev) => [...prev, { role: 'bot', content: 'Terjadi kesalahan. Silakan coba lagi.' }]);
            setLoading(false);
          }
        };

        recognitionRef.current.onerror = () => {
          setShowMic(false);
        };
      }
    }
  }, []);

  const typeText = async (text: string) => {
    setTypingContent('');
    let index = 0;
    setShowSuggestions(false);
    const interval = setInterval(() => {
      if (index < text.length) {
        setTypingContent((prev) => prev + text.charAt(index));
        index++;
        setLoading(false);
      } else {
        clearInterval(interval);
        setMessages((prev) => [...prev, { role: 'bot', content: text }]);
        setTypingContent('');
        setLoading(false);
      }
    }, 10);
  };

  const getCustomResponse = async (input: string) => {
    const lower = input.toLowerCase();
    if (lower.includes('who are you'))
      return "I'm **Greenly Bot**, your environmental awareness companion. Let's make the planet greener together!";
    if (lower.includes('siapa kamu'))
      return 'Saya **Greenly Bot**, teman peduli lingkungan Anda. Mari bersama-sama menjaga bumi kita!';
    if (lower.includes('kamu siapa'))
      return 'Saya **Greenly Bot**, asisten yang siap membantu Anda menjaga dan mencintai lingkungan.';
    const result = await model.generateContent(input);
    return result.response.text();
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setShowHeader(false);
    setMessages((prev) => [...prev, { role: 'user', content: prompt }]);
    const input = prompt;
    setPrompt('');
    try {
      const response = await getCustomResponse(input);
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
    setMessages((prev) => [...prev, { role: 'user', content: question }]);
    try {
      const response = await getCustomResponse(question);
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
    setShowMic(true);
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
                  <div className="text-[10px] lg:text-[14px] text-justify">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
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
                <div className="bg-card p-4 rounded-lg max-w-[95%] lg:max-w-[70%] shadow-md text-[10px] lg:text-[14px] text-justify text-foreground">
                  <ReactMarkdown>{typingContent}</ReactMarkdown>
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
