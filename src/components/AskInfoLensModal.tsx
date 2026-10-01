import React, { useState } from 'react';
import type { Cluster, ChatMessage, UserProfile, InformationItem } from '../types';
import { answerInfoLensQuery } from '../engine/chatAssistant';
import { X, Send, Sparkles, Bot, ExternalLink, RefreshCw, MessageSquare } from 'lucide-react';

interface AskInfoLensModalProps {
  isOpen: boolean;
  onClose: () => void;
  clusters: Cluster[];
  userProfile: UserProfile;
  allItems: InformationItem[];
  onOpenSources: (cluster: Cluster) => void;
  onOpenImportance: (cluster: Cluster) => void;
}

const PRESET_QUERIES = [
  "What should I know today?",
  "What happened in AI today?",
  "What changed since yesterday?",
  "Show me information related to my hackathon.",
  "Why is this important?",
  "Summarize today's cybersecurity news."
];

export const AskInfoLensModal: React.FC<AskInfoLensModalProps> = ({
  isOpen,
  onClose,
  clusters,
  userProfile,
  allItems,
  onOpenSources,
  onOpenImportance
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-greeting",
      sender: "infolens",
      text: `Hello ${userProfile.name}! I am your InfoLens Personal Information Intelligence Assistant. I have indexed your **50 collected items**, resolved duplicates, and synthesized your **11 personalized clusters**.\n\nAsk me anything about today's signals, hackathon deadlines, AI developments, or security advisories:`,
      timestamp: "Just now"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const q = textToSend || inputValue;
    if (!q.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const response = answerInfoLensQuery(q, clusters, userProfile, allItems);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '780px', height: '82vh' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'var(--cobalt-subtle)',
              border: '1px solid var(--cobalt-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--cobalt-bright)'
            }}>
              <Sparkles size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                Ask InfoLens
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-silver)' }}>
                Synthesizing answers exclusively from your verified information space
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-secondary btn-sm" style={{ padding: '6px', borderRadius: '50%' }}>
            <X size={16} />
          </button>
        </div>

        {/* Suggested Prompt Chips */}
        <div style={{
          padding: '12px 20px',
          background: 'var(--bg-tertiary)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}>
          {PRESET_QUERIES.map(q => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="btn btn-outline btn-xs"
              style={{ borderRadius: 'var(--radius-full)', background: 'var(--bg-card)', color: 'var(--text-silver)' }}
            >
              <MessageSquare size={11} color="var(--cobalt)" />
              {q}
            </button>
          ))}
        </div>

        {/* Message Thread */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
          {messages.map(msg => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: msg.sender === 'user' ? '80%' : '90%'
              }}
            >
              {msg.sender === 'infolens' && (
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--cobalt)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  flexShrink: 0,
                  boxShadow: '0 0 10px var(--cobalt-glow)'
                }}>
                  <Bot size={18} />
                </div>
              )}

              <div style={{
                background: msg.sender === 'user' ? 'var(--cobalt)' : 'var(--bg-tertiary)',
                color: '#ffffff',
                padding: '14px 18px',
                borderRadius: 'var(--radius-md)',
                border: msg.sender === 'user' ? 'none' : '1px solid var(--border-subtle)',
                fontSize: '0.88rem',
                lineHeight: 1.6
              }}>
                <div style={{ whiteSpace: 'pre-wrap' }}>
                  {msg.text}
                </div>

                {/* Inline Source Citations */}
                {msg.sources && msg.sources.length > 0 && (
                  <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      Cited Sources & Provenance Links:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {msg.sources.map(src => {
                        const parentCluster = clusters.find(c => c.items.some(i => i.id === src.id));
                        return (
                          <button
                            key={src.id}
                            onClick={() => {
                              if (parentCluster) onOpenSources(parentCluster);
                            }}
                            className="tag-chip"
                            style={{
                              cursor: 'pointer',
                              background: 'var(--bg-primary)',
                              borderColor: 'var(--cobalt)',
                              color: 'var(--cobalt-bright)'
                            }}
                          >
                            <span>{src.sourceName}</span>
                            <ExternalLink size={10} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {msg.clusterReferenceId && (
                  <div style={{ marginTop: '10px' }}>
                    {(() => {
                      const refCluster = clusters.find(c => c.id === msg.clusterReferenceId);
                      if (!refCluster) return null;
                      return (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => onOpenImportance(refCluster)}
                            className="btn btn-outline btn-xs"
                            style={{ fontSize: '0.7rem', color: '#ffffff', borderColor: 'var(--cobalt)' }}
                          >
                            <Sparkles size={11} color="var(--cobalt)" />
                            Why is this important?
                          </button>
                          <button
                            onClick={() => onOpenSources(refCluster)}
                            className="btn btn-outline btn-xs"
                            style={{ fontSize: '0.7rem' }}
                          >
                            View {refCluster.items.length} Original Sources
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                )}

                <div style={{ fontSize: '0.68rem', color: msg.sender === 'user' ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', marginTop: '6px', textAlign: 'right' }}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-secondary)' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <RefreshCw size={14} className="animate-spin" />
              </div>
              <span style={{ fontSize: '0.8rem' }}>InfoLens is reasoning over 11 topic clusters and verifying provenance...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="modal-footer" style={{ background: 'var(--bg-secondary)', padding: '14px 20px' }}>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            style={{ display: 'flex', width: '100%', gap: '10px' }}
          >
            <input
              type="text"
              className="input-text"
              placeholder="Ask anything about your information space..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary" disabled={!inputValue.trim()}>
              <Send size={15} />
              <span>Ask</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
