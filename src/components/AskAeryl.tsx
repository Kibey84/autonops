'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import {
  MessageCircle, X, Send, Mic, MicOff, Volume2, VolumeX,
  Loader2, ChevronRight, Sparkles,
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: { title: string; url?: string }[];
}

function getTimestamp(): string {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  });
}

function getPageContext(pathname: string): string {
  if (pathname.startsWith('/dashboard')) return 'customer_dashboard';
  if (pathname.startsWith('/admin')) return 'admin_mission_control';
  if (pathname === '/how-it-works') return 'how_it_works';
  if (pathname === '/services') return 'services';
  if (pathname === '/technology') return 'technology';
  if (pathname === '/contact') return 'contact';
  if (pathname === '/about') return 'about';
  if (pathname === '/') return 'homepage';
  return 'general';
}

function getInitialChips(pathname: string): string[] {
  if (pathname.startsWith('/dashboard')) {
    return ['Mission status briefing', 'Request new sortie', 'Show active alerts'];
  }
  if (pathname.startsWith('/admin')) {
    return ['Ops summary', 'Asset readiness check', 'Weather at target'];
  }
  return ['How does the platform work?', 'Mission capabilities', 'Talk to operations'];
}

// ─── VOICE SUPPORT ──────────────────────────────────────────

function useVoice() {
  const [isListening, setIsListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SR) {
      setSpeechEnabled(true);
      const recognition = new SR();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = useCallback((onResult: (text: string) => void) => {
    if (!recognitionRef.current) return;
    const rec = recognitionRef.current;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      onResult(text);
      setIsListening(false);
    };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);
    rec.start();
    setIsListening(true);
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const speak = useCallback((text: string) => {
    if (!ttsEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    // Try to find a female voice
    const voices = window.speechSynthesis.getVoices();
    const female = voices.find((v) => /female|samantha|victoria|karen|moira/i.test(v.name));
    if (female) utterance.voice = female;
    window.speechSynthesis.speak(utterance);
  }, [ttsEnabled]);

  return { isListening, speechEnabled, ttsEnabled, setTtsEnabled, startListening, stopListening, speak };
}

// ─── MAIN COMPONENT ────────────────────────────────────────

export default function AskAeryl() {
  const pathname = usePathname();
  const isOpsPage = pathname.startsWith('/dashboard') || pathname.startsWith('/admin');

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chips, setChips] = useState<string[]>([]);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const voice = useVoice();

  // Auto-open on ops pages
  useEffect(() => {
    if (isOpsPage) setIsOpen(true);
  }, [isOpsPage]);

  // Set initial chips based on page
  useEffect(() => {
    if (messages.length === 0) {
      setChips(getInitialChips(pathname));
    }
  }, [pathname, messages.length]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: text.trim(), timestamp: getTimestamp() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setChips([]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          sessionId: 'aeryl-' + Date.now(),
          pageContext: getPageContext(pathname),
        }),
      });

      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();

      const assistantMsg: Message = {
        role: 'assistant',
        content: data.answer,
        timestamp: getTimestamp(),
        sources: data.sources,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setChips(data.suggestedChips || []);

      // Speak response if TTS enabled
      voice.speak(data.answer);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Comms interrupted. Try again or contact operations at bob.lee@autonops.us.',
          timestamp: getTimestamp(),
        },
      ]);
      setChips(['Try again', 'Talk to operations']);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, pathname, voice]);

  const handleVoiceInput = useCallback(() => {
    if (voice.isListening) {
      voice.stopListening();
    } else {
      voice.startListening((text) => {
        setInput(text);
        sendMessage(text);
      });
    }
  }, [voice, sendMessage]);

  // ─── RENDER ───────────────────────────────────────────────

  return (
    <>
      {/* Collapsed button */}
      {!isOpen && (
        <button
          onClick={() => { setIsOpen(true); setHasNewMessage(false); }}
          className="fixed bottom-6 right-6 z-50 group"
        >
          <div className={`relative w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 shadow-lg flex items-center justify-center transition-all ${hasNewMessage ? '' : 'hover:scale-105'}`}>
            {hasNewMessage && (
              <div className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping opacity-50" />
            )}
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -top-8 right-0 bg-slate-800 text-white text-[10px] font-mono px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Ask Aeryl
          </div>
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-5rem)] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Ask Aeryl</h3>
                <p className="text-[10px] text-slate-400 font-mono">AI Mission Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {/* TTS toggle */}
              <button
                onClick={() => voice.setTtsEnabled(!voice.ttsEnabled)}
                className={`p-1.5 rounded transition-colors ${voice.ttsEnabled ? 'text-red-400 bg-red-500/10' : 'text-slate-500 hover:text-slate-300'}`}
                title={voice.ttsEnabled ? 'Mute voice' : 'Enable voice'}
              >
                {voice.ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-7 h-7 text-red-500" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">Aeryl online.</h4>
                <p className="text-[11px] text-slate-400 max-w-[250px] mx-auto">
                  {isOpsPage
                    ? 'Standing by for mission directives. What do you need?'
                    : 'I can brief you on capabilities, walk you through the platform, or connect you with ops. Go ahead.'}
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${msg.role === 'assistant' ? 'border-l-2 border-l-red-600 pl-3' : ''}`}>
                  <div className={`rounded-xl px-3.5 py-2.5 ${
                    msg.role === 'user'
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-800 text-slate-200'
                  }`}>
                    <div className={`text-[12px] leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'assistant' ? 'font-mono' : ''
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                  <div className={`text-[9px] font-mono text-slate-600 mt-1 ${
                    msg.role === 'user' ? 'text-right' : ''
                  }`}>
                    {msg.role === 'assistant' ? 'AERYL · ' : ''}{msg.timestamp}
                  </div>
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-1 space-y-0.5">
                      {msg.sources.map((s, j) => (
                        <a key={j} href={s.url || '#'} className="block text-[9px] text-red-400/70 font-mono hover:text-red-400">
                          {s.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="border-l-2 border-l-red-600 pl-3">
                  <div className="bg-slate-800 rounded-xl px-3.5 py-2.5">
                    <Loader2 className="w-4 h-4 text-red-500 animate-spin" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chips */}
          {chips.length > 0 && !isLoading && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {chips.map((chip, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(chip)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 text-slate-300 text-[10px] font-mono rounded-full hover:bg-slate-700 hover:text-white transition-colors border border-slate-700"
                >
                  {chip}
                  <ChevronRight className="w-3 h-3" />
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-slate-700 bg-slate-800/50">
            <div className="flex items-center gap-2">
              {/* Voice input */}
              {voice.speechEnabled && (
                <button
                  onClick={handleVoiceInput}
                  className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    voice.isListening
                      ? 'bg-red-600 text-white animate-pulse'
                      : 'bg-slate-700 text-slate-400 hover:text-white'
                  }`}
                  title={voice.isListening ? 'Stop listening' : 'Voice input'}
                >
                  {voice.isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              )}
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder={voice.isListening ? 'Listening...' : 'Ask Aeryl...'}
                className="flex-1 px-3 py-2 bg-slate-700 border-0 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                disabled={isLoading || voice.isListening}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center text-white hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

