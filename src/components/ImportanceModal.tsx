import React from 'react';
import type { Cluster } from '../types';
import { X, Sparkles, CheckCircle, AlertTriangle, Sliders, ShieldCheck } from 'lucide-react';

interface ImportanceModalProps {
  cluster: Cluster | null;
  onClose: () => void;
  onOpenPreferences: () => void;
}

export const ImportanceModal: React.FC<ImportanceModalProps> = ({ cluster, onClose, onOpenPreferences }) => {
  if (!cluster) return null;

  const { reasoning } = cluster;

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'var(--priority-critical)';
    if (score >= 70) return 'var(--priority-important)';
    if (score >= 45) return 'var(--priority-normal)';
    return 'var(--priority-low)';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(99, 102, 241, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-indigo)'
            }}>
              <Sparkles size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                Why Are You Seeing This?
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-silver)' }}>
                Transparent mathematical explainability model for InfoLens Personalization
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn btn-secondary btn-sm"
            style={{ padding: '6px', borderRadius: '50%' }}
          >
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          {/* Target Cluster Title */}
          <div style={{
            padding: '12px 16px',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--cobalt-bright)', textTransform: 'uppercase' }}>
                {cluster.category}
              </span>
              <span className={`badge badge-${cluster.priority}`}>
                {cluster.priority}
              </span>
            </div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff' }}>
              {cluster.title}
            </h4>
          </div>

          {/* Big Score Meter */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            background: 'rgba(11, 15, 25, 0.85)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '20px'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Calculated Personal Importance
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
                <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--cobalt)', fontFamily: 'var(--font-mono)' }}>
                  {reasoning.score}
                </span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-silver)' }}>/ 100</span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Status Determination</div>
              <div style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--cobalt-bright)',
                marginTop: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                justifyContent: 'flex-end'
              }}>
                <ShieldCheck size={16} color="var(--cobalt)" />
                {reasoning.score >= 85 ? 'Elevated to Top Priority' : reasoning.score >= 70 ? 'Ranked as Important' : 'Standard Feed'}
              </div>
            </div>
          </div>

          {/* Qualitative Reasons */}
          <div style={{ marginBottom: '24px' }}>
            <h5 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-silver)', marginBottom: '10px' }}>
              Personalization Factors Triggered
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {reasoning.bulletReasons.map((reason, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '9px 12px',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem'
                  }}
                >
                  <Sparkles size={15} color="var(--cobalt)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ color: '#ffffff' }}>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mathematical Scoring Breakdown */}
          <div>
            <h5 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-silver)', marginBottom: '12px' }}>
              Scoring Rubric Breakdown
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {reasoning.breakdown.map((item, idx) => (
                <div key={idx} style={{ padding: '10px 14px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>
                      {item.label}
                    </span>
                    <span style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--cobalt-bright)'
                    }}>
                      {item.points > 0 ? `+${item.points}` : item.points} {item.maxPoints > 0 ? `/ ${item.maxPoints} pts` : 'pts'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-silver)' }}>
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            onClick={() => {
              onClose();
              onOpenPreferences();
            }}
            className="btn btn-secondary btn-sm"
          >
            <Sliders size={14} />
            Adjust Weights in Settings
          </button>
          <button onClick={onClose} className="btn btn-primary btn-sm">
            Close Explanation
          </button>
        </div>
      </div>
    </div>
  );
};
