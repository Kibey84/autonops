'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import type { AuthSession, Message } from '@/lib/data/types';
import { getMessagesForAccount } from '@/lib/data/mock';
import DashboardPanel from './DashboardPanel';

interface CustomerMessagesViewProps {
  session: AuthSession;
}

interface MessageGroup {
  label: string;
  contextId: string;
  messages: Message[];
}

function formatTimestamp(dateStr: string): string {
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function CustomerMessagesView({ session }: CustomerMessagesViewProps) {
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!session.accountId) return;
    // includeInternal = false — filter out internal messages
    const msgs = getMessagesForAccount(session.accountId, false);
    setAllMessages(msgs);
    if (msgs.length > 0) {
      // Default to the first thread
      const firstContext = msgs[0].requestId || msgs[0].missionId || 'general';
      setActiveThread(firstContext);
    }
  }, [session.accountId]);

  // Combine server messages + local messages
  const combined = [...allMessages, ...localMessages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  // Group messages by request/mission context
  const groups: MessageGroup[] = [];
  const groupMap = new Map<string, MessageGroup>();

  for (const msg of combined) {
    const contextId = msg.requestId || msg.missionId || 'general';
    if (!groupMap.has(contextId)) {
      const label = msg.requestId
        ? `Request ${msg.requestId}`
        : msg.missionId
          ? `Mission ${msg.missionId}`
          : 'General';
      const group: MessageGroup = { label, contextId, messages: [] };
      groupMap.set(contextId, group);
      groups.push(group);
    }
    groupMap.get(contextId)!.messages.push(msg);
  }

  // Get active thread messages
  const activeGroup = groups.find((g) => g.contextId === activeThread) || groups[0];
  const threadMessages = activeGroup?.messages || [];

  // Auto-scroll when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [threadMessages.length]);

  const handleSend = () => {
    const trimmed = newMessage.trim();
    if (!trimmed || !activeThread) return;

    const msg: Message = {
      id: `msg-local-${Date.now()}`,
      missionId: activeGroup?.messages[0]?.missionId || null,
      requestId: activeGroup?.messages[0]?.requestId || null,
      accountId: session.accountId || '',
      userId: session.userId,
      userName: session.userName,
      content: trimmed,
      isInternal: false,
      createdAt: new Date().toISOString(),
    };

    setLocalMessages((prev) => [...prev, msg]);
    setNewMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <p className="text-sm text-slate-400 mt-1">
          Communications with the AutonOps operations team
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4" style={{ minHeight: '500px' }}>
        {/* Thread List */}
        <div className="lg:col-span-1">
          <DashboardPanel title="Threads" statusColor="cyan">
            <div className="space-y-1">
              {groups.map((group) => {
                const isActive = group.contextId === activeThread;
                const lastMsg = group.messages[group.messages.length - 1];
                return (
                  <button
                    key={group.contextId}
                    onClick={() => setActiveThread(group.contextId)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-red-600/15 border border-red-500/30'
                        : 'bg-slate-900/30 border border-slate-700/50 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className={`w-3.5 h-3.5 ${isActive ? 'text-red-400' : 'text-slate-500'}`} />
                      <span className={`font-mono text-[11px] font-medium truncate ${isActive ? 'text-red-400' : 'text-slate-300'}`}>
                        {group.label}
                      </span>
                    </div>
                    {lastMsg && (
                      <p className="text-[10px] text-slate-500 truncate pl-5">
                        {lastMsg.userName}: {lastMsg.content}
                      </p>
                    )}
                    <p className="text-[10px] text-slate-600 pl-5 mt-0.5">
                      {group.messages.length} message{group.messages.length !== 1 ? 's' : ''}
                    </p>
                  </button>
                );
              })}

              {groups.length === 0 && (
                <p className="text-xs text-slate-500 p-3">No message threads yet.</p>
              )}
            </div>
          </DashboardPanel>
        </div>

        {/* Message Thread */}
        <div className="lg:col-span-3 flex flex-col">
          <DashboardPanel
            title={activeGroup?.label || 'Messages'}
            statusColor="green"
            className="flex-1 flex flex-col"
          >
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-[400px]">
              {threadMessages.length === 0 ? (
                <p className="text-sm text-slate-500 py-4">No messages in this thread.</p>
              ) : (
                threadMessages.map((msg) => {
                  const isOwnMessage = msg.userId === session.userId;
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          isOwnMessage
                            ? 'bg-red-600/15 border border-red-500/30'
                            : 'bg-slate-900/50 border border-slate-700/50'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`font-mono text-[11px] font-medium ${
                              isOwnMessage ? 'text-red-400' : 'text-slate-300'
                            }`}
                          >
                            {msg.userName}
                          </span>
                          <span className="font-mono text-[10px] text-slate-500">
                            {formatTimestamp(msg.createdAt)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-slate-700/50 pt-3">
              <div className="flex items-end gap-2">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 px-3 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-colors resize-none font-mono text-[11px]"
                  placeholder="Type a message..."
                  rows={2}
                />
                <button
                  onClick={handleSend}
                  disabled={!newMessage.trim()}
                  className="px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-slate-600 mt-1.5">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </DashboardPanel>
        </div>
      </div>
    </div>
  );
}
