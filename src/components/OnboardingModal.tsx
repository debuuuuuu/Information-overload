import React, { useState } from 'react';
import type { UserProfile, UserType, ConsumptionStyle, DeliveryMode } from '../types';
import {
  X, Check, ChevronRight, ChevronLeft, Sparkles, User, Layers, Sliders, Users,
  Calendar, Key, EyeOff, Radio, Clock, BookOpen, Rocket
} from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSaveProfile: (updated: UserProfile) => void;
  onCompleteAndScan: (updated: UserProfile) => void;
}

const ALL_TOPICS = [
  "AI", "Machine Learning", "Programming", "Cybersecurity", "Startups",
  "College", "Science", "Finance", "Sports", "Gaming", "Technology",
  "Research", "Hackathons"
];

const SUGGESTED_ENTITIES = ["OpenAI", "Sam Altman", "Project Mentor", "Microsoft", "Google DeepMind", "Anthropic", "CISA"];
const SUGGESTED_EVENTS = ["Hackathon 2026", "Semester examinations", "AI conference", "Product launch"];
const SUGGESTED_KEYWORDS = ["MCP", "Agentic AI", "RAG", "LLM", "Next.js", "Zero-Day"];
const SUGGESTED_DEPRIORITIZED = ["Sports", "Gaming", "Celebrity news"];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onSaveProfile,
  onCompleteAndScan
}) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({ ...userProfile });
  const [customTopic, setCustomTopic] = useState("");
  const [customEntity, setCustomEntity] = useState("");
  const [customEvent, setCustomEvent] = useState("");
  const [customKeyword, setCustomKeyword] = useState("");

  if (!isOpen) return null;

  const totalSteps = 10;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onSaveProfile(profile);
      onCompleteAndScan(profile);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '720px', maxHeight: '90vh' }}>
        {/* Step Indicator Header */}
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-cobalt">Step {step} of {totalSteps}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>InfoLens Personalization Wizard</span>
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {step === 1 && "Step 1 — Profile & Role"}
              {step === 2 && "Step 2 — Select Core Interests"}
              {step === 3 && "Step 3 — Set Importance Levels (0-100)"}
              {step === 4 && "Step 4 — People, Companies & Entities"}
              {step === 5 && "Step 5 — Tracked Events & Milestones"}
              {step === 6 && "Step 6 — Monitored Keywords"}
              {step === 7 && "Step 7 — Deprioritized Topics (Digest Area)"}
              {step === 8 && "Step 8 — Information Sources"}
              {step === 9 && "Step 9 — Attention & Quiet Hours"}
              {step === 10 && "Step 10 — Consumption Style & Confirmation"}
            </h3>
          </div>
          <button onClick={onClose} className="btn btn-secondary btn-sm" style={{ padding: '6px', borderRadius: '50%' }}>
            <X size={16} />
          </button>
        </div>

        {/* Wizard Step Progress Bar */}
        <div style={{ width: '100%', height: '4px', background: 'var(--bg-tertiary)' }}>
          <div style={{
            width: `${(step / totalSteps) * 100}%`,
            height: '100%',
            background: 'var(--cobalt)',
            boxShadow: '0 0 8px var(--cobalt-glow)',
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* Step Content */}
        <div className="modal-body" style={{ minHeight: '380px' }}>
          {/* STEP 1: Profile */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-silver)', marginBottom: '8px' }}>
                  What is your full name?
                </label>
                <input
                  type="text"
                  className="input-text"
                  value={profile.name}
                  onChange={e => setProfile({ ...profile, name: e.target.value })}
                  placeholder="e.g. Alex Rivera"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-silver)', marginBottom: '10px' }}>
                  Select your user archetype:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                  {(["Student", "Professional", "Researcher", "Entrepreneur", "Other"] as UserType[]).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setProfile({ ...profile, userType: type })}
                      className="btn"
                      style={{
                        padding: '12px 14px',
                        background: profile.userType === type ? 'rgba(0, 40, 255, 0.18)' : 'var(--bg-tertiary)',
                        border: `1px solid ${profile.userType === type ? 'var(--cobalt)' : 'var(--border-subtle)'}`,
                        color: profile.userType === type ? '#ffffff' : 'var(--text-silver)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <User size={18} color={profile.userType === type ? 'var(--cobalt-bright)' : 'var(--text-silver)'} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{type}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Interests Selection */}
          {step === 2 && (
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-silver)', marginBottom: '14px' }}>
                Select topics that matter to you. You can assign precise numerical weights in the next step.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                {ALL_TOPICS.map(topic => {
                  const isSelected = profile.interests[topic] !== undefined;
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => {
                        const newInterests = { ...profile.interests };
                        if (isSelected) {
                          delete newInterests[topic];
                        } else {
                          newInterests[topic] = 75; // default weight
                        }
                        setProfile({ ...profile, interests: newInterests });
                      }}
                      className="btn btn-sm"
                      style={{
                        background: isSelected ? 'rgba(0, 40, 255, 0.2)' : 'var(--bg-tertiary)',
                        borderColor: isSelected ? 'var(--cobalt)' : 'var(--border-subtle)',
                        color: isSelected ? '#ffffff' : 'var(--text-silver)',
                        borderRadius: 'var(--radius-full)'
                      }}
                    >
                      {isSelected ? <Check size={14} color="var(--cobalt-bright)" /> : <Layers size={14} />}
                      <span>{topic}</span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Topic Input */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Add custom topic (e.g. Quantum Computing)..."
                  className="input-text"
                  value={customTopic}
                  onChange={e => setCustomTopic(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customTopic.trim()) {
                      setProfile({
                        ...profile,
                        interests: { ...profile.interests, [customTopic.trim()]: 80 }
                      });
                      setCustomTopic("");
                    }
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  Add
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Importance Weights */}
          {step === 3 && (
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-silver)', marginBottom: '14px' }}>
                Set a relevance weight (0–100) for every selected topic. High values elevate items into the Critical zone.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '50vh', overflowY: 'auto', paddingRight: '8px' }}>
                {Object.entries(profile.interests).map(([topic, weight]) => (
                  <div key={topic} style={{ padding: '10px 14px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>
                        {topic}
                      </span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--cobalt-bright)' }}>
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
          )}

          {/* STEP 4: People & Entities */}
          {step === 4 && (
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-silver)', marginBottom: '14px' }}>
                Add important people, companies, organizations, or mentors to track:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px', maxHeight: '42vh', overflowY: 'auto' }}>
                {Object.entries(profile.entities).map(([entity, weight]) => (
                  <div key={entity} style={{ padding: '10px 14px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>
                        @{entity}
                      </span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--cobalt-bright)' }}>
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

              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Track new entity (e.g. Anthropic, Sam Altman)..."
                  className="input-text"
                  value={customEntity}
                  onChange={e => setCustomEntity(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customEntity.trim()) {
                      setProfile({
                        ...profile,
                        entities: { ...profile.entities, [customEntity.trim()]: 85 }
                      });
                      setCustomEntity("");
                    }
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  Track
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Events */}
          {step === 5 && (
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-silver)', marginBottom: '14px' }}>
                Define events or deadlines you are actively following:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                {SUGGESTED_EVENTS.map(ev => {
                  const active = profile.events.includes(ev);
                  return (
                    <button
                      key={ev}
                      type="button"
                      onClick={() => {
                        const newEvents = active
                          ? profile.events.filter(e => e !== ev)
                          : [...profile.events, ev];
                        setProfile({ ...profile, events: newEvents });
                      }}
                      className="btn btn-sm"
                      style={{
                        background: active ? 'rgba(0, 40, 255, 0.2)' : 'var(--bg-tertiary)',
                        borderColor: active ? 'var(--cobalt)' : 'var(--border-subtle)',
                        color: active ? '#ffffff' : 'var(--text-silver)'
                      }}
                    >
                      <Calendar size={13} color="var(--cobalt)" />
                      <span>{ev}</span>
                    </button>
                  );
                })}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Add custom event (e.g. Midterm Exams 2026)..."
                  className="input-text"
                  value={customEvent}
                  onChange={e => setCustomEvent(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customEvent.trim() && !profile.events.includes(customEvent.trim())) {
                      setProfile({ ...profile, events: [...profile.events, customEvent.trim()] });
                      setCustomEvent("");
                    }
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  Add
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: Keywords */}
          {step === 6 && (
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-silver)', marginBottom: '14px' }}>
                Add specific technical terms or watchlist keywords:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                {profile.keywords.map(kw => (
                  <span
                    key={kw}
                    className="tag-chip"
                    style={{
                      background: 'rgba(0, 40, 255, 0.15)',
                      borderColor: 'var(--cobalt)',
                      color: '#ffffff',
                      padding: '6px 12px'
                    }}
                  >
                    <Key size={12} color="var(--cobalt-bright)" />
                    <span>{kw}</span>
                    <button
                      type="button"
                      onClick={() => setProfile({ ...profile, keywords: profile.keywords.filter(k => k !== kw) })}
                      style={{ background: 'none', border: 'none', color: 'var(--text-silver)', cursor: 'pointer', marginLeft: '4px' }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Add keyword (e.g. Next.js, MCP, RAG)..."
                  className="input-text"
                  value={customKeyword}
                  onChange={e => setCustomKeyword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customKeyword.trim() && !profile.keywords.includes(customKeyword.trim())) {
                      setProfile({ ...profile, keywords: [...profile.keywords, customKeyword.trim()] });
                      setCustomKeyword("");
                    }
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  Add Keyword
                </button>
              </div>
            </div>
          )}

          {/* STEP 7: Deprioritized Topics */}
          {step === 7 && (
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-silver)', marginBottom: '14px' }}>
                Select topics you generally do NOT want prioritized. They won't be deleted, but placed into the Batched Digest area.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {SUGGESTED_DEPRIORITIZED.map(topic => {
                  const isDeprioritized = profile.deprioritizedTopics.includes(topic);
                  return (
                    <label
                      key={topic}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        background: 'var(--bg-tertiary)',
                        borderRadius: 'var(--radius-md)',
                        border: `1px solid ${isDeprioritized ? 'var(--cobalt)' : 'var(--border-subtle)'}`,
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <EyeOff size={16} color={isDeprioritized ? 'var(--cobalt)' : 'var(--text-muted)'} />
                        <div>
                          <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>{topic}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Apply -35 penalty & route to Batched Digest</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={isDeprioritized}
                        onChange={() => {
                          const newDep = isDeprioritized
                            ? profile.deprioritizedTopics.filter(t => t !== topic)
                            : [...profile.deprioritizedTopics, topic];
                          setProfile({ ...profile, deprioritizedTopics: newDep });
                        }}
                        style={{ accentColor: 'var(--cobalt)', width: '18px', height: '18px' }}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 8: Sources */}
          {step === 8 && (
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                Configure which information channels InfoLens ingests:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { key: 'news', label: 'News & Curated RSS', desc: 'Real-time tech and industry RSS feeds' },
                  { key: 'messages', label: 'Simulated Team & College Messages', desc: 'Mentor updates, academic notices, team pings [SIMULATED]' },
                  { key: 'articles', label: 'In-Depth Technical Articles', desc: 'Engineering blogs, Hacker News, system design reviews' },
                  { key: 'research', label: 'Pre-prints & Academic Research', desc: 'arXiv, Nature, IEEE Xplore, research labs' },
                  { key: 'savedUrls', label: 'Saved URLs & Bookmarks', desc: 'Manual links queued for intelligence extraction' }
                ].map(src => {
                  const isEnabled = profile.sources[src.key as keyof typeof profile.sources];
                  return (
                    <label
                      key={src.key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        background: 'var(--bg-tertiary)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        cursor: 'pointer'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{src.label}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{src.desc}</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={isEnabled}
                        onChange={() => {
                          setProfile({
                            ...profile,
                            sources: { ...profile.sources, [src.key]: !isEnabled }
                          });
                        }}
                        style={{ accentColor: 'var(--cobalt)', width: '18px', height: '18px' }}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 9: Attention Preferences */}
          {step === 9 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-silver)', marginBottom: '8px' }}>
                  Information Delivery Mode:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {[
                    { mode: "immediate", label: "Immediate Important", desc: "Top priority surfaces instantly" },
                    { mode: "batched", label: "Batched Normal", desc: "Lower signals gathered in digests" },
                    { mode: "chronological", label: "Chronological", desc: "Time-ordered flow" }
                  ].map(item => (
                    <button
                      key={item.mode}
                      type="button"
                      onClick={() => setProfile({
                        ...profile,
                        attention: { ...profile.attention, delivery: item.mode as DeliveryMode }
                      })}
                      className="btn"
                      style={{
                        padding: '10px',
                        background: profile.attention.delivery === item.mode ? 'rgba(0, 40, 255, 0.2)' : 'var(--bg-tertiary)',
                        border: `1px solid ${profile.attention.delivery === item.mode ? 'var(--cobalt)' : 'var(--border-subtle)'}`,
                        color: profile.attention.delivery === item.mode ? '#ffffff' : 'var(--text-silver)',
                        flexDirection: 'column',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{item.label}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quiet Hours */}
              <div style={{ padding: '14px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={16} color="var(--cobalt)" />
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>Quiet Hours Window</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.attention.quietHours.enabled}
                    onChange={e => setProfile({
                      ...profile,
                      attention: {
                        ...profile.attention,
                        quietHours: { ...profile.attention.quietHours, enabled: e.target.checked }
                      }
                    })}
                    style={{ accentColor: 'var(--cobalt)', width: '18px', height: '18px' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Start Time</label>
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
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>End Time</label>
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

                <div style={{ marginTop: '10px', fontSize: '0.75rem', color: 'var(--text-silver)' }}>
                  Exceptions allowed during quiet hours: Critical security & Urgent mentor directives bypass quiet hours automatically.
                </div>
              </div>
            </div>
          )}

          {/* STEP 10: Consumption Style */}
          {step === 10 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-silver)', marginBottom: '10px' }}>
                  Choose Your Reading & Synthesis Depth:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {[
                    { style: "quick", title: "Quick", desc: "1-2 sentence high-level impact summaries" },
                    { style: "balanced", title: "Balanced", desc: "Executive summary + 4 bullet facts + source links" },
                    { style: "deep", title: "Deep", desc: "Full architectural breakdown + citations + context" }
                  ].map(s => (
                    <button
                      key={s.style}
                      type="button"
                      onClick={() => setProfile({ ...profile, consumptionStyle: s.style as ConsumptionStyle })}
                      className="btn"
                      style={{
                        padding: '16px 12px',
                        background: profile.consumptionStyle === s.style ? 'rgba(0, 40, 255, 0.2)' : 'var(--bg-tertiary)',
                        border: `1px solid ${profile.consumptionStyle === s.style ? 'var(--cobalt)' : 'var(--border-subtle)'}`,
                        color: profile.consumptionStyle === s.style ? '#ffffff' : 'var(--text-silver)',
                        flexDirection: 'column',
                        textAlign: 'center',
                        gap: '6px'
                      }}
                    >
                      <BookOpen size={20} color={profile.consumptionStyle === s.style ? 'var(--cobalt-bright)' : 'var(--text-silver)'} />
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{s.title}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{s.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Profile Summary Box */}
              <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--cobalt-border)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--cobalt-bright)', marginBottom: '6px' }}>
                  ✦ Ready to Ingest & Personalize
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-silver)', lineHeight: 1.5 }}>
                  Profile established for <strong>{profile.name}</strong> ({profile.userType}). InfoLens will run a 50-item live scan across your news, messages, and research sources, deduplicate near-copies, and synthesize 11 topic clusters.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Controls */}
        <div className="modal-footer">
          {step > 1 && (
            <button onClick={handleBack} className="btn btn-secondary btn-sm">
              <ChevronLeft size={15} />
              Previous
            </button>
          )}

          <button onClick={handleNext} className="btn btn-primary btn-sm">
            {step === totalSteps ? (
              <>
                <Rocket size={15} />
                <span>Confirm & Run Pipeline Scan</span>
              </>
            ) : (
              <>
                <span>Next</span>
                <ChevronRight size={15} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
