'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2, ChevronRight, ArrowLeft } from 'lucide-react';

// Types
interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: { title: string; url?: string; type: string }[];
}

interface ChatState {
  isOpen: boolean;
  messages: Message[];
  inputValue: string;
  isLoading: boolean;
  sessionId: string;
  showContactForm: boolean;
  suggestedChips: string[];
}

// Initial chips
const INITIAL_CHIPS = [
  'How does AutonOps work?',
  'Pricing and ordering',
  'FAA compliance',
  'Wildfire response',
  'Partnership with Aeryl',
  'Talk to a human',
];

// Generate session ID
function generateSessionId(): string {
  return 'sess_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

// Track analytics
async function trackEvent(eventType: string, sessionId: string, metadata?: Record<string, unknown>) {
  try {
    await fetch('/api/chat-analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType, sessionId, metadata }),
    });
  } catch {
    // Silently fail analytics
  }
}

export default function ChatWidget() {
  const [state, setState] = useState<ChatState>({
    isOpen: false,
    messages: [],
    inputValue: '',
    isLoading: false,
    sessionId: '',
    showContactForm: false,
    suggestedChips: INITIAL_CHIPS,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize session ID on mount
  useEffect(() => {
    setState(prev => ({ ...prev, sessionId: generateSessionId() }));
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (state.isOpen && !state.showContactForm) {
      inputRef.current?.focus();
    }
  }, [state.isOpen, state.showContactForm]);

  const toggleChat = useCallback(() => {
    setState(prev => {
      const newIsOpen = !prev.isOpen;
      if (newIsOpen && prev.sessionId) {
        trackEvent('opened', prev.sessionId);
      }
      return { ...prev, isOpen: newIsOpen };
    });
  }, []);

  const sendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim() || state.isLoading) return;

    // Check for escalation trigger
    if (messageText.toLowerCase().includes('talk to a human') ||
        messageText.toLowerCase().includes('contact') ||
        messageText.toLowerCase().includes('speak to someone')) {
      setState(prev => ({ ...prev, showContactForm: true }));
      return;
    }

    const userMessage: Message = { role: 'user', content: messageText };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      inputValue: '',
      isLoading: true,
      suggestedChips: [],
    }));

    trackEvent('messageSent', state.sessionId, { queryLength: messageText.length });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: state.sessionId,
          message: messageText,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.answer,
        sources: data.sources,
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
        suggestedChips: data.suggestedChips || [],
      }));
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again or contact AutonOps directly at bob.lee@autonops.us.',
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isLoading: false,
        suggestedChips: ['Try again', 'Talk to a human'],
      }));
    }
  }, [state.isLoading, state.sessionId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(state.inputValue);
  };

  const handleChipClick = (chip: string) => {
    trackEvent('chipClicked', state.sessionId, { chipText: chip });
    sendMessage(chip);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, inputValue: e.target.value }));
  };

  return (
    <>
      {/* Chat Bubble Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          state.isOpen
            ? 'bg-slate-700 hover:bg-slate-600'
            : 'bg-red-600 hover:bg-red-700 animate-pulse hover:animate-none'
        }`}
        aria-label={state.isOpen ? 'Close chat' : 'Open chat'}
      >
        {state.isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat Window */}
      {state.isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">AutonOps Assistant</h3>
              <p className="text-xs text-slate-400">Ask me about our services</p>
            </div>
          </div>

          {/* Content */}
          {state.showContactForm ? (
            <ContactForm
              sessionId={state.sessionId}
              onBack={() => setState(prev => ({ ...prev, showContactForm: false }))}
              onSuccess={() => {
                setState(prev => ({
                  ...prev,
                  showContactForm: false,
                  messages: [
                    ...prev.messages,
                    {
                      role: 'assistant',
                      content: 'Thank you! Your message has been received. Our team will contact you soon.',
                    },
                  ],
                }));
              }}
            />
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {state.messages.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                      What can I help with?
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Ask about our drone operations, services, or technology.
                    </p>
                  </div>
                )}

                {state.messages.map((message, index) => (
                  <MessageBubble key={index} message={message} />
                ))}

                {state.isLoading && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl rounded-tl-sm px-4 py-3">
                      <Loader2 className="w-5 h-5 text-slate-500 animate-spin" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chips */}
              {state.suggestedChips.length > 0 && !state.isLoading && (
                <div className="px-4 pb-2">
                  <div className="flex flex-wrap gap-2">
                    {state.suggestedChips.map((chip, index) => (
                      <button
                        key={index}
                        onClick={() => handleChipClick(chip)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                      >
                        {chip}
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={state.inputValue}
                    onChange={handleInputChange}
                    placeholder="Type your question..."
                    className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 border-0 rounded-full text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    disabled={state.isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!state.inputValue.trim() || state.isLoading}
                    className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}

// Message Bubble Component
function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser
            ? 'bg-red-600'
            : 'bg-slate-200 dark:bg-slate-700'
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        )}
      </div>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-red-600 text-white rounded-tr-sm'
            : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-tl-sm'
        }`}
      >
        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
        {message.sources && message.sources.length > 0 && (
          <div className="mt-2 pt-2 border-t border-slate-300 dark:border-slate-600">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Sources:</p>
            <div className="space-y-1">
              {message.sources.map((source, idx) => (
                <a
                  key={idx}
                  href={source.url || '#'}
                  className="block text-xs text-red-600 dark:text-red-400 hover:underline"
                  target={source.url ? '_self' : undefined}
                >
                  {source.title}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Contact Form Component
function ContactForm({
  sessionId,
  onBack,
  onSuccess,
}: {
  sessionId: string;
  onBack: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    agency: '',
    question: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/chat-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, sessionId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      trackEvent('escalationSubmitted', sessionId);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to chat
      </button>

      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
        Talk to our team
      </h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
        Fill out the form below and we will get back to you shortly.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Role (optional)
          </label>
          <input
            type="text"
            value={formData.role}
            onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
            placeholder="e.g., Fire Chief, City Manager"
            className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Agency/Company (optional)
          </label>
          <input
            type="text"
            value={formData.agency}
            onChange={e => setFormData(prev => ({ ...prev, agency: e.target.value }))}
            className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Question or Message *
          </label>
          <textarea
            required
            value={formData.question}
            onChange={e => setFormData(prev => ({ ...prev, question: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
}
