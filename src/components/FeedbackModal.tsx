import React, { useState } from 'react';
import type { Cluster } from '../types';
import { X, ThumbsDown, CheckCircle } from 'lucide-react';

interface FeedbackModalProps {
  cluster: Cluster | null;
  onClose: () => void;
  onSubmitFeedback: (clusterId: string, useful: boolean, reason?: string) => void;
}

const FEEDBACK_OPTIONS = [
  "Not relevant to my current goals",
  "Already knew this information",
  "Too much detail / verbose",
  "Wrong topic classification",
  "Other"
];

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ cluster, onClose, onSubmitFeedback }) => {
  const [selectedReason, setSelectedReason] = useState(FEEDBACK_OPTIONS[0]);
  const [otherText, setOtherText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!cluster) return null;

  const handleSubmit = () => {
    const reason = selectedReason === "Other" ? (otherText || "Other") : selectedReason;
    onSubmitFeedback(cluster.id, false, reason);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--cobalt-subtle)',
              border: '1px solid var(--cobalt-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--cobalt-bright)'
            }}>
              <ThumbsDown size={18} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
              Provide Feedback
            </h3>
          </div>
          <button onClick={onClose} className="btn btn-secondary btn-sm" style={{ padding: '6px', borderRadius: '50%' }}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <CheckCircle size={44} color="var(--cobalt)" style={{ marginBottom: '12px' }} />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>
                Preference Updated
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-silver)', marginTop: '4px' }}>
                InfoLens reduced the relevance weight for similar items in your information space.
              </p>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-silver)', marginBottom: '16px' }}>
                Why is <strong>"{cluster.title}"</strong> not useful to you right now?
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                {FEEDBACK_OPTIONS.map((opt) => (
                  <label
                    key={opt}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      background: selectedReason === opt ? 'rgba(0, 40, 255, 0.15)' : 'var(--bg-tertiary)',
                      border: `1px solid ${selectedReason === opt ? 'var(--cobalt)' : 'var(--border-subtle)'}`,
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      color: selectedReason === opt ? '#ffffff' : 'var(--text-silver)'
                    }}
                  >
                    <input
                      type="radio"
                      name="feedback-reason"
                      checked={selectedReason === opt}
                      onChange={() => setSelectedReason(opt)}
                      style={{ accentColor: 'var(--cobalt)' }}
                    />
                    {opt}
                  </label>
                ))}
              </div>

              {selectedReason === "Other" && (
                <input
                  type="text"
                  placeholder="Specify other reason..."
                  className="input-text"
                  value={otherText}
                  onChange={e => setOtherText(e.target.value)}
                  style={{ marginBottom: '12px' }}
                />
              )}
            </div>
          )}
        </div>

        {!submitted && (
          <div className="modal-footer">
            <button onClick={onClose} className="btn btn-secondary btn-sm">
              Cancel
            </button>
            <button onClick={handleSubmit} className="btn btn-primary btn-sm">
              Submit Feedback
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
