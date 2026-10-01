import React, { useState } from 'react';
import type { Cluster, UserProfile, InformationItem } from '../types';
import { ArrowLeft, ExternalLink, ShieldCheck, Activity, Brain, Radio } from 'lucide-react';

interface ClusterDetailViewProps {
  cluster: Cluster;
  userProfile: UserProfile;
  onBack: () => void;
  onOpenSourceUrl: (url: string) => void;
}

export const ClusterDetailView: React.FC<ClusterDetailViewProps> = ({
  cluster,
  userProfile,
  onBack,
  onOpenSourceUrl
}) => {
  const [selectedItem, setSelectedItem] = useState<InformationItem | null>(cluster.items[0] || null);

  return (
    <div className="hero-animate-in" style={{ padding: '24px 40px', maxWidth: '1600px', margin: '0 auto' }}>
      
      {/* Navigation Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <button 
          onClick={onBack}
          className="btn btn-outline btn-sm"
          style={{ gap: '8px', fontSize: '0.85rem' }}
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span className="font-serif" style={{ fontSize: '0.75rem', color: 'var(--cobalt)', letterSpacing: '0.1em', fontWeight: 800 }}>
            INTELLIGENCE DOSSIER // {cluster.id.toUpperCase()}
          </span>
          <span className="badge badge-cobalt">{cluster.category}</span>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(380px, 1fr) minmax(320px, 400px)',
        gap: '40px',
        alignItems: 'start'
      }}>
        
        {/* LEFT COLUMN: Synthesis & Analysis */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Header Block */}
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '16px' }}>
              {cluster.title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid var(--border-medium)', paddingBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={18} color="var(--cobalt)" />
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Priority: {cluster.priority.toUpperCase()}</span>
              </div>
              <div style={{ width: '1px', height: '16px', background: 'var(--border-strong)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Brain size={18} color="var(--text-muted)" />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-silver)' }}>
                  Score: <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>{cluster.importanceScore}/100</span>
                </span>
              </div>
              <div style={{ width: '1px', height: '16px', background: 'var(--border-strong)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="var(--text-muted)" />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-silver)' }}>
                  Sources: <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>{cluster.sourceCount}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Deep Summary Block */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-xl)',
            padding: '32px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 className="font-serif" style={{ fontSize: '0.85rem', color: 'var(--cobalt)', letterSpacing: '0.1em', fontWeight: 800, marginBottom: '16px' }}>
              EXECUTIVE SYNTHESIS
            </h3>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--text-primary)', opacity: 0.9 }}>
              {cluster.deepSummary}
            </p>
          </div>

          {/* Key Points & Entities */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-lg)', padding: '24px', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-silver)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', background: 'var(--cobalt)', borderRadius: '50%' }} /> Key Findings
              </h4>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {cluster.keyPoints.map((kp, idx) => (
                  <li key={idx} style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>{kp}</li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-lg)', padding: '24px', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-silver)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', background: 'var(--cobalt)', borderRadius: '50%' }} /> Tracked Entities
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cluster.keyEntities.map(ent => (
                  <span key={ent} className="tag-chip" style={{ fontSize: '0.75rem', background: 'var(--bg-secondary)' }}>
                    @{ent}
                  </span>
                ))}
              </div>
              
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-silver)', marginTop: '24px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', background: 'var(--cobalt)', borderRadius: '50%' }} /> Tracked Topics
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cluster.topics.map(t => (
                  <span key={t} className="tag-chip" style={{ fontSize: '0.75rem', background: 'var(--bg-secondary)' }}>
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Underlying Sources List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '24px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Source Provenance</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cluster.items.length} Items Indexed</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {cluster.items.map((item, idx) => (
              <div 
                key={item.id}
                onClick={() => setSelectedItem(item)}
                style={{
                  background: selectedItem?.id === item.id ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                  border: `1px solid ${selectedItem?.id === item.id ? 'var(--cobalt)' : 'var(--border-subtle)'}`,
                  boxShadow: selectedItem?.id === item.id ? '0 4px 16px var(--cobalt-subtle)' : 'none',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Radio size={14} color="var(--cobalt)" />
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--cobalt)' }}>
                    {item.sourceName}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                    {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : 'Live'}
                  </span>
                </div>
                
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                  {item.title}
                </h4>
              </div>
            ))}
          </div>

          {/* Detailed View of Selected Source */}
          {selectedItem && (
            <div style={{
              marginTop: '12px',
              padding: '20px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--cobalt-border)',
              borderRadius: 'var(--radius-lg)'
            }}>
              <h5 style={{ fontSize: '0.85rem', color: 'var(--text-silver)', marginBottom: '12px', fontWeight: 700 }}>
                Selected Source Extraction
              </h5>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                {selectedItem.content.length > 200 ? `${selectedItem.content.substring(0, 200)}...` : selectedItem.content}
              </p>
              
              <button 
                onClick={() => onOpenSourceUrl(selectedItem.url || "https://example.com")}
                className="btn btn-cobalt" 
                style={{ width: '100%', gap: '8px' }}
              >
                Access Full Source Article <ExternalLink size={16} />
              </button>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};
