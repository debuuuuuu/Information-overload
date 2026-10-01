import React, { useState } from 'react';
import type { UserProfile, ConsumptionStyle, DeliveryMode } from '../types';
import { DEFAULT_USER_PROFILE } from '../data/mockData';
import {
  Sliders, Sparkles, RefreshCw, Layers, Users, Calendar, Key, EyeOff,
  Radio, Clock, BookOpen, RotateCcw, CheckCircle2, Zap
} from 'lucide-react';

interface PreferencesViewProps {
  userProfile: UserProfile;
  onSaveAndRecalculate: (updatedProfile: UserProfile) => void;
}

export const PreferencesView: React.FC<PreferencesViewProps> = ({
  userProfile,
  onSaveAndRecalculate
}) => {
  const [profile, setProfile] = useState<UserProfile>({ ...userProfile });
  const [recalculating, setRecalculating] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");

  const handleRecalculate = () => {
    setRecalculating(true);
    setTimeout(() => {
      onSaveAndRecalculate(profile);
      setRecalculating(false);
      setNotificationMsg(`Information space recalculated! AI Importance: ${profile.interests["AI"] ?? 0}/100.`);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3500);
    }, 400);
  };

  const handlePresetAiDrop = () => {
    const updated = {
      ...profile,
      interests: {
        ...profile.interests,
        "AI": 20
      }
    };
    setProfile(updated);
    setRecalculating(true);
    setTimeout(() => {
      onSaveAndRecalculate(updated);
      setRecalculating(false);
      setNotificationMsg("Demo Step: AI importance dropped from 100 to 20! Dashboard visibly re-ranked: Hackathon and Cybersecurity now occupy top positions.");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }, 400);
  };

  const handleResetDefaults = () => {
    setProfile({ ...DEFAULT_USER_PROFILE });
    setRecalculating(true);
    setTimeout(() => {
      onSaveAndRecalculate({ ...DEFAULT_USER_PROFILE });
      setRecalculating(false);
      setNotificationMsg("Reset to standard demo profile: AI set to 100, Hackathons 95, Cybersecurity 85.");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3500);
    }, 400);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Recalculate Toast Alert */}
      {showNotification && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1100,
          background: 'var(--bg-secondary)',
          border: '1px solid var(--cobalt)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: 'var(--shadow-lg), 0 0 20px var(--cobalt-glow)',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <CheckCircle2 size={20} color="var(--cobalt)" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#ffffff' }}>
              Information Space Recalculated
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-silver)' }}>
              {notificationMsg}
            </div>
          </div>
        </div>
      )}

      {/* Top Banner with Action Buttons */}
      <div className="glass-panel" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-cobalt">Personalization Engine</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Configurable Personal Weights & Attention Policies</span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
            User Preferences & Signal Weights
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-silver)', marginTop: '2px' }}>
            Modify interest weights, mute topics, track entities, and click recalculate to dynamically reorganise your feed.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={handlePresetAiDrop}
            className="btn btn-secondary btn-sm"
            title="Sets AI weight to 20 for judge demonstration"
          >
            <Zap size={14} color="var(--cobalt)" />
            Scenario: Drop AI to 20
          </button>

          <button
            onClick={handleResetDefaults}
            className="btn btn-outline btn-sm"
          >
            <RotateCcw size={14} />
            Reset to Default
          </button>

          <button
            onClick={handleRecalculate}
            disabled={recalculating}
            className="btn btn-cobalt"
            style={{ fontWeight: 700, padding: '10px 20px' }}
          >
            {recalculating ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                <span>Recalculating Space...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>⚡ Recalculate My Information Space</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {/* TOPIC INTEREST WEIGHTS */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Layers size={18} color="var(--cobalt)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
              Core Topic Importance (0–100)
            </h3>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-silver)', marginBottom: '14px' }}>
            Changes in topic weights directly drive mathematical importance scoring:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(profile.interests).map(([topic, weight]) => (
              <div key={topic} style={{ padding: '8px 12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#ffffff' }}>{topic}</span>
                  <span style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--cobalt-bright)'
                  }}>
                    {weight} / 100
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weight}
                  onChange={e => {
                    setProfile({
                      ...profile,
                      interests: { ...profile.interests, [topic]: Number(e.target.value) }
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* PEOPLE & ENTITIES */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Users size={18} color="var(--cobalt)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
              Tracked People & Entities
            </h3>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-silver)', marginBottom: '14px' }}>
            Elevates items mentioning key figures or organizations by up to +20 points:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(profile.entities).map(([entity, weight]) => (
              <div key={entity} style={{ padding: '8px 12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#ffffff' }}>@{entity}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--cobalt-bright)' }}>
                    {weight} / 100
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weight}
                  onChange={e => {
                    setProfile({
                      ...profile,
                      entities: { ...profile.entities, [entity]: Number(e.target.value) }
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* TRACKED EVENTS & KEYWORDS */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Calendar size={18} color="var(--cobalt)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
              Tracked Events & Watchlist Keywords
            </h3>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Followed Events (+15 pts match bonus)
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {profile.events.map(ev => (
                <span key={ev} className="tag-chip" style={{ color: 'var(--text-silver)', borderColor: 'var(--border-medium)' }}>
                  ✦ {ev}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Tracked Keywords (+10 pts match bonus)
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {profile.keywords.map(kw => (
                <span key={kw} className="tag-chip" style={{ color: 'var(--cobalt-bright)', borderColor: 'var(--cobalt-border)' }}>
                  #{kw}
                </span>
              ))}
            </div>
          </div>

          {/* Deprioritized Topics */}
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <EyeOff size={16} color="var(--cobalt)" />
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>
                Deprioritized Topics (-35 pts Penalty)
              </div>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-silver)', marginBottom: '8px' }}>
              Routed to Batched Digest:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {profile.deprioritizedTopics.map(dp => (
                <span key={dp} className="tag-chip" style={{ color: 'var(--text-muted)', borderColor: 'var(--border-subtle)' }}>
                  {dp}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CONSUMPTION & ATTENTION POLICIES */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <BookOpen size={18} color="var(--cobalt)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
              Consumption Style & Quiet Hours
            </h3>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Information Consumption Style
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {(["quick", "balanced", "deep"] as ConsumptionStyle[]).map(style => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setProfile({ ...profile, consumptionStyle: style })}
                  className="btn btn-sm"
                  style={{
                    textTransform: 'capitalize',
                    background: profile.consumptionStyle === style ? 'var(--cobalt)' : 'var(--bg-tertiary)',
                    borderColor: profile.consumptionStyle === style ? 'var(--cobalt)' : 'var(--border-subtle)',
                    color: profile.consumptionStyle === style ? '#ffffff' : 'var(--text-silver)'
                  }}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Clock size={15} color="var(--cobalt)" />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>Quiet Hours Window</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Start</label>
                <input
                  type="time"
                  className="input-text"
                  value={profile.attention.quietHours.start}
                  onChange={e => setProfile({
                    ...profile,
                    attention: {
                      ...profile.attention,
                      quietHours: { ...profile.attention.quietHours, start: e.target.value }
                    }
                  })}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>End</label>
                <input
                  type="time"
                  className="input-text"
                  value={profile.attention.quietHours.end}
                  onChange={e => setProfile({
                    ...profile,
                    attention: {
                      ...profile.attention,
                      quietHours: { ...profile.attention.quietHours, end: e.target.value }
                    }
                  })}
                />
              </div>
            </div>
          </div>

          {/* Big Recalculate Button */}
          <div style={{ marginTop: '24px' }}>
            <button
              onClick={handleRecalculate}
              disabled={recalculating}
              className="btn btn-cobalt"
              style={{ width: '100%', padding: '12px', fontWeight: 700 }}
            >
              {recalculating ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Recalculating...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>⚡ Recalculate My Information Space</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
