import React, { useState } from 'react';
import type { Cluster, InformationItem } from '../types';
import { X, ExternalLink, Globe, MessageSquare, BookOpen, Search, Clock, User, Code, FileText } from 'lucide-react';

interface SourcesModalProps {
  cluster: Cluster | null;
  onClose: () => void;
}

export const SourcesModal: React.FC<SourcesModalProps> = ({ cluster, onClose }) => {
  const [selectedItem, setSelectedItem] = useState<InformationItem | null>(null);
  const [viewJson, setViewJson] = useState(false);

  if (!cluster) return null;

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'news': return <Globe size={15} color="var(--cobalt)" />;
      case 'message': return <MessageSquare size={15} color="var(--cobalt)" />;
      case 'article': return <BookOpen size={15} color="var(--cobalt)" />;
      case 'research': return <Search size={15} color="var(--cobalt)" />;
      default: return <FileText size={15} color="#ffffff" />;
    }
  };

  const activeItem = selectedItem || cluster.items[0];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '850px', maxHeight: '90vh' }}>
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
              <Globe size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                Original Source Intelligence & Provenance
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-silver)' }}>
                {cluster.items.length} verified sources synthesized for this cluster
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-secondary btn-sm" style={{ padding: '6px', borderRadius: '50%' }}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px', padding: '20px' }}>
          {/* Source List Column */}
          <div style={{ borderRight: '1px solid var(--border-subtle)', paddingRight: '16px', display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '60vh', overflowY: 'auto' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Underlying Sources ({cluster.items.length})
            </div>

            {cluster.items.map((item) => {
              const isSelected = activeItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? 'rgba(0, 40, 255, 0.15)' : 'var(--bg-tertiary)',
                    border: `1px solid ${isSelected ? 'var(--cobalt)' : 'var(--border-subtle)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {getSourceIcon(item.sourceType)}
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#ffffff' }}>
                        {item.sourceName}
                      </span>
                    </div>
                    <span className="badge badge-subtle" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                      {item.sourceType}
                    </span>
                  </div>

                  <h5 style={{
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    color: isSelected ? '#ffffff' : 'var(--text-silver)',
                    lineHeight: 1.35,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {item.title}
                  </h5>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    <Clock size={11} />
                    <span>{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : 'Recent'}</span>
                    {Boolean(item.metadata?.simulatedMessage) && (
                      <span style={{ color: 'var(--cobalt-bright)', fontWeight: 600 }}>• [SIMULATED]</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Item Deep Inspection Column */}
          {activeItem && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '60vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-cobalt">{activeItem.sourceType}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-silver)' }}>
                    {activeItem.sourceName}
                  </span>
                </div>
                <button
                  onClick={() => setViewJson(!viewJson)}
                  className="btn btn-outline btn-xs"
                >
                  <Code size={13} />
                  {viewJson ? 'View Article Content' : 'Inspect Normalized JSON'}
                </button>
              </div>

              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.4, marginBottom: '8px' }}>
                  {activeItem.title}
                </h4>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '0.775rem', color: 'var(--text-silver)', marginBottom: '14px' }}>
                  {activeItem.author && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <User size={13} color="var(--cobalt)" />
                      <span>{activeItem.author}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Clock size={13} color="var(--cobalt)" />
                    <span>{activeItem.publishedAt ? new Date(activeItem.publishedAt).toUTCString() : 'Just now'}</span>
                  </div>
                  {activeItem.url && (
                    <a
                      href={activeItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--cobalt-bright)', textDecoration: 'none' }}
                    >
                      <span>Open Origin Link</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>

              {viewJson ? (
                <pre style={{
                  padding: '14px',
                  background: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.75rem',
                  color: 'var(--cobalt-bright)',
                  overflowX: 'auto',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {JSON.stringify(activeItem, null, 2)}
                </pre>
              ) : (
                <div style={{
                  padding: '16px',
                  background: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  lineHeight: 1.6,
                  fontSize: '0.875rem',
                  color: '#ffffff'
                }}>
                  {activeItem.content}
                </div>
              )}

              {/* Extracted Metadata Pills */}
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Extracted Entities & Topics
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {activeItem.topics.map(t => (
                    <span key={t} className="tag-chip" style={{ color: 'var(--cobalt-bright)', borderColor: 'var(--cobalt-border)' }}>
                      #{t}
                    </span>
                  ))}
                  {activeItem.entities.map(e => (
                    <span key={e} className="tag-chip" style={{ color: '#ffffff', borderColor: 'var(--border-medium)' }}>
                      @{e}
                    </span>
                  ))}
                  {activeItem.events.map(ev => (
                    <span key={ev} className="tag-chip" style={{ color: 'var(--text-silver)', borderColor: 'var(--border-subtle)' }}>
                      ✦ {ev}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-secondary btn-sm">
            Close Provenance Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
