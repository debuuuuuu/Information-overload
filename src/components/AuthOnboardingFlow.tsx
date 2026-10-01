import React, { useState } from 'react';
import type { UserProfile, ConsumptionStyle, UserType } from '../types';
import {
  Sparkles, Check, ArrowRight, ShieldCheck, User, Bell, Sliders,
  Lock, Mail, Globe, Apple, ArrowLeft, RefreshCw, Layers, Database
} from 'lucide-react';

interface AuthOnboardingFlowProps {
  userProfile: UserProfile;
  onComplete: (updatedProfile: UserProfile) => void;
  onCancel?: () => void;
}

export const AuthOnboardingFlow: React.FC<AuthOnboardingFlowProps> = ({
  userProfile,
  onComplete,
  onCancel
}) => {
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>(userProfile.name);
  const [userType, setUserType] = useState<UserType>(userProfile.userType);
  const [email, setEmail] = useState<string>("alex.rivera@university.edu");
  const [interests, setInterests] = useState<Record<string, number>>({ ...userProfile.interests });
  const [entities, setEntities] = useState<Record<string, number>>({ ...userProfile.entities });
  const [deprioritized, setDeprioritized] = useState<string[]>([...userProfile.deprioritizedTopics]);
  const [quietHoursEnabled, setQuietHoursEnabled] = useState<boolean>(userProfile.attention.quietHours.enabled);
  const [quietStart, setQuietStart] = useState<string>(userProfile.attention.quietHours.start);
  const [quietEnd, setQuietEnd] = useState<string>(userProfile.attention.quietHours.end);
  const [consumptionStyle, setConsumptionStyle] = useState<ConsumptionStyle>(userProfile.consumptionStyle);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisProgress, setSynthesisProgress] = useState(0);

  const personas: { id: UserType; title: string; desc: string; defaultInterests: Record<string, number> }[] = [
    {
      id: "Student",
      title: "Student & Hackathon Competitor",
      desc: "Balancing university coursework with intense hackathon deadlines and bleeding-edge AI models.",
      defaultInterests: { "AI": 100, "Hackathons": 95, "Cybersecurity": 85, "Technology": 70, "Sports": 10 }
    },
    {
      id: "Researcher",
      title: "AI & Systems Researcher",
      desc: "Filtering pre-print papers, reasoning model benchmarks, and open-source agent tooling.",
      defaultInterests: { "AI": 100, "Technology": 90, "Cybersecurity": 80, "Hackathons": 40, "Sports": 5 }
    },
    {
      id: "Entrepreneur",
      title: "Technology Founder / Executive",
      desc: "Tracking competitive intelligence, partner API disruptions, and zero-day threat posture.",
      defaultInterests: { "AI": 95, "Cybersecurity": 90, "Technology": 85, "Hackathons": 60, "Sports": 15 }
    }
  ];

  const handleSelectPersona = (p: typeof personas[0]) => {
    setUserType(p.id);
    setInterests(p.defaultInterests);
  };

  const handleInterestChange = (topic: string, val: number) => {
    setInterests(prev => ({ ...prev, [topic]: val }));
  };

  const toggleEntity = (ent: string) => {
    setEntities(prev => {
      const next = { ...prev };
      if (next[ent]) {
        delete next[ent];
      } else {
        next[ent] = 90;
      }
      return next;
    });
  };

  const toggleDeprioritized = (topic: string) => {
    setDeprioritized(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const handleFinish = () => {
    setIsSynthesizing(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 20;
      setSynthesisProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete({
            ...userProfile,
            name,
            userType,
            interests,
            entities,
            deprioritizedTopics: deprioritized,
            consumptionStyle,
            attention: {
              ...userProfile.attention,
              quietHours: {
                enabled: quietHoursEnabled,
                start: quietStart,
                end: quietEnd
              },
              quietExceptions: {
                critical: true,
                important: false
              }
            }
          });
        }, 400);
      }
    }, 180);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      background: 'var(--bg-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      overflowY: 'auto'
    }}>
      {/* Outer Editorial Container */}
      <div style={{
        width: '100%',
        maxWidth: '1100px',
        minHeight: '640px',
        background: '#ffffff',
        color: '#05070d',
        borderRadius: '24px',
        boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8), 0 0 32px rgba(0, 40, 255, 0.25)',
        display: 'grid',
        gridTemplateColumns: step === 1 ? '1.1fr 1fr' : '1fr',
        overflow: 'hidden',
        border: '1px solid rgba(0, 0, 0, 0.12)'
      }}>
        {/* LEFT PANE: Form & Step Flow */}
        <div style={{
          padding: '44px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff'
        }}>
          {/* Top Header / Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  background: '#0028ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}>
                  <Sparkles size={16} />
                </div>
                <span className="font-display" style={{ fontSize: '1.05rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#05070d' }}>
                  INFOLENS <span style={{ color: '#0028ff' }}>OS</span>
                </span>
              </div>

              {onCancel && (
                <button
                  onClick={onCancel}
                  className="btn btn-outline btn-xs"
                  style={{ color: '#64748b', borderColor: '#e2e8f0', fontSize: '0.72rem' }}
                >
                  Return to OS
                </button>
              )}
            </div>

            {/* Step Progress Dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              {[1, 2, 3, 4, 5].map(s => (
                <div
                  key={s}
                  style={{
                    height: '4px',
                    flex: 1,
                    borderRadius: '2px',
                    background: s <= step ? '#0028ff' : '#e2e8f0',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

            {/* STEP 1: WELCOME & CREATE IDENTITY (IMAGE 1 STYLE) */}
            {step === 1 && (
              <div>
                <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#05070d', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                  Welcome back!
                </h2>
                <p style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '6px', marginBottom: '24px' }}>
                  Your signals, your attention, your flow — all in one unified space.
                </p>

                {/* Social Login Buttons (Image 1 Style) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
                  <button
                    onClick={() => {}}
                    type="button"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '10px 14px',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#0f172a',
                      cursor: 'pointer'
                    }}
                  >
                    <Globe size={15} color="#0028ff" />
                    Sign In with Google
                  </button>
                  <button
                    onClick={() => {}}
                    type="button"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '10px 14px',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#0f172a',
                      cursor: 'pointer'
                    }}
                  >
                    <Apple size={15} color="#05070d" />
                    Sign In with Apple
                  </button>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  margin: '18px 0',
                  color: '#94a3b8',
                  fontSize: '0.72rem',
                  textTransform: 'uppercase'
                }}>
                  <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
                  Or Configure Identity
                  <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '5px' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Alex Rivera"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                        color: '#05070d'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '5px' }}>
                      Institutional / Work Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="alex.rivera@university.edu"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                        color: '#05070d'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '6px' }}>
                      Select User Persona Archetype
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {personas.map(p => (
                        <div
                          key={p.id}
                          onClick={() => handleSelectPersona(p)}
                          style={{
                            padding: '10px 14px',
                            borderRadius: '12px',
                            border: `1.5px solid ${userType === p.id ? '#0028ff' : '#e2e8f0'}`,
                            background: userType === p.id ? 'rgba(0, 40, 255, 0.05)' : '#ffffff',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#05070d' }}>{p.title}</div>
                            <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>{p.desc}</div>
                          </div>
                          {userType === p.id && (
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0028ff' }} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: TOPIC WEIGHTS CALIBRATION */}
            {step === 2 && (
              <div>
                <span className="badge badge-cobalt" style={{ fontSize: '0.65rem', marginBottom: '8px' }}>
                  STEP 2 OF 5 · PERSONALIZATION ENGINE
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#05070d', letterSpacing: '-0.02em' }}>
                  Interest Taxonomy Weights
                </h2>
                <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '4px', marginBottom: '20px' }}>
                  Calibrate how much each topic influences your mathematical personal importance score (0–100).
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  {Object.entries(interests).map(([topic, weight]) => (
                    <div
                      key={topic}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '14px',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0f172a' }}>#{topic}</span>
                        <span style={{ fontSize: '0.84rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: '#0028ff' }}>
                          {weight}/100
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={weight}
                        onChange={e => handleInterestChange(topic, parseInt(e.target.value))}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: ENTITY TRACKING */}
            {step === 3 && (
              <div>
                <span className="badge badge-cobalt" style={{ fontSize: '0.65rem', marginBottom: '8px' }}>
                  STEP 3 OF 5 · ENTITY WATCHLIST
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#05070d', letterSpacing: '-0.02em' }}>
                  Tracked Organizations & People
                </h2>
                <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '4px', marginBottom: '20px' }}>
                  Signals mentioning tracked entities receive an immediate +20 corroboration boost.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                  {["OpenAI", "Sam Altman", "Project Mentor", "CISA", "Microsoft", "Anthropic", "Google DeepMind", "Meta AI"].map(ent => {
                    const isTracked = Boolean(entities[ent]);
                    return (
                      <div
                        key={ent}
                        onClick={() => toggleEntity(ent)}
                        style={{
                          padding: '12px 16px',
                          borderRadius: '12px',
                          border: `1.5px solid ${isTracked ? '#0028ff' : '#e2e8f0'}`,
                          background: isTracked ? 'rgba(0, 40, 255, 0.05)' : '#ffffff',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: isTracked ? '#0028ff' : '#334155' }}>
                          @{ent}
                        </span>
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '6px',
                          border: `1px solid ${isTracked ? '#0028ff' : '#cbd5e1'}`,
                          background: isTracked ? '#0028ff' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff'
                        }}>
                          {isTracked && <Check size={12} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: ATTENTION SHIELD & DEPRIORITIZATION */}
            {step === 4 && (
              <div>
                <span className="badge badge-cobalt" style={{ fontSize: '0.65rem', marginBottom: '8px' }}>
                  STEP 4 OF 5 · ATTENTION ARCHITECTURE
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#05070d', letterSpacing: '-0.02em' }}>
                  Cognitive Protection & Quiet Hours
                </h2>
                <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '4px', marginBottom: '20px' }}>
                  Deprioritize non-essential noise into a batched digest and shield your focus during sleep/study.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Deprioritize Topics */}
                  <div style={{ padding: '16px', borderRadius: '14px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                      Automatically Deprioritize into Daily Batched Digest:
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {["Sports", "Gaming", "Celebrity", "Entertainment", "Gossip"].map(top => {
                        const isDep = deprioritized.includes(top);
                        return (
                          <button
                            key={top}
                            type="button"
                            onClick={() => toggleDeprioritized(top)}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '8px',
                              border: `1px solid ${isDep ? '#0028ff' : '#cbd5e1'}`,
                              background: isDep ? '#0028ff' : '#ffffff',
                              color: isDep ? '#ffffff' : '#475569',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            {top} {isDep ? '✓ Suppressed' : '+ Suppress'}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quiet Hours Window */}
                  <div style={{ padding: '16px', borderRadius: '14px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <div>
                        <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0f172a' }}>Quiet Hours Window</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Only critical score ≥90 items bypass to protect attention.</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={quietHoursEnabled}
                        onChange={e => setQuietHoursEnabled(e.target.checked)}
                        style={{ width: '18px', height: '18px', accentColor: '#0028ff' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Start Time</label>
                        <input
                          type="time"
                          value={quietStart}
                          onChange={e => setQuietStart(e.target.value)}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>End Time</label>
                        <input
                          type="time"
                          value={quietEnd}
                          onChange={e => setQuietEnd(e.target.value)}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Reading Mode */}
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                      Preferred Default Reading Mode:
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                      {(["quick", "balanced", "deep"] as ConsumptionStyle[]).map(style => (
                        <button
                          key={style}
                          type="button"
                          onClick={() => setConsumptionStyle(style)}
                          style={{
                            padding: '10px',
                            borderRadius: '10px',
                            border: `1.5px solid ${consumptionStyle === style ? '#0028ff' : '#cbd5e1'}`,
                            background: consumptionStyle === style ? 'rgba(0, 40, 255, 0.06)' : '#ffffff',
                            color: consumptionStyle === style ? '#0028ff' : '#475569',
                            fontWeight: 700,
                            textTransform: 'capitalize',
                            cursor: 'pointer',
                            fontSize: '0.82rem'
                          }}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: SYNTHESIS & LAUNCH */}
            {step === 5 && (
              <div style={{ textAlign: 'center', padding: '30px 20px' }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: '#0028ff',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  boxShadow: '0 0 24px rgba(0, 40, 255, 0.4)'
                }}>
                  <Sparkles size={26} />
                </div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#05070d', letterSpacing: '-0.02em' }}>
                  Synthesize Your Information Space
                </h2>
                <p style={{ fontSize: '0.84rem', color: '#64748b', maxWidth: '440px', margin: '6px auto 24px' }}>
                  InfoLens is ready to ingest multi-source streams, execute semantic deduplication, and calibrate your personalized priority matrix.
                </p>

                {isSynthesizing && (
                  <div style={{ maxWidth: '400px', margin: '0 auto 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginBottom: '6px' }}>
                      <span>Deduplicating & Clustering 50 Items...</span>
                      <span style={{ fontWeight: 800, color: '#0028ff' }}>{synthesisProgress}%</span>
                    </div>
                    <div style={{ height: '6px', width: '100%', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${synthesisProgress}%`, background: '#0028ff', transition: 'width 0.2s ease' }} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Navigation Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '20px',
            borderTop: '1px solid #e2e8f0',
            marginTop: '24px'
          }}>
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <ArrowLeft size={14} /> Back
              </button>
            ) : <div />}

            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 22px',
                  borderRadius: '12px',
                  background: '#0028ff',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(0, 40, 255, 0.35)'
                }}
              >
                Continue <ArrowRight size={14} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                disabled={isSynthesizing}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 28px',
                  borderRadius: '12px',
                  background: '#0028ff',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  cursor: isSynthesizing ? 'not-allowed' : 'pointer',
                  boxShadow: '0 6px 20px rgba(0, 40, 255, 0.45)',
                  margin: '0 auto'
                }}
              >
                {isSynthesizing ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    Calibrating...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Launch InfoLens OS
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* RIGHT PANE: MUSEUM-GRADE DITHERED LANDSCAPE ARTWORK (IMAGE 1 STYLE) */}
        {step === 1 && (
          <div style={{
            position: 'relative',
            background: '#000000',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '32px'
          }}>
            <img
              src="/art/dither_zen_garden.jpg"
              alt="Architectural Dithered Art"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.95
              }}
            />
            {/* Subtle Gradient Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
              pointerEvents: 'none'
            }} />

            {/* Art Project Caption */}
            <div style={{ position: 'relative', zIndex: 1, color: '#ffffff' }}>
              <div className="font-serif" style={{ fontSize: '0.72rem', letterSpacing: '0.18em', color: '#0028ff', textTransform: 'uppercase', fontWeight: 700 }}>
                ✦ ATLAS NO.252 // COGNITIVE HARMONY
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginTop: '4px', lineHeight: 1.3 }}>
                A Quiet Mind in an Age of Information Storms.
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '4px', lineHeight: 1.5 }}>
                Filter ambient noise, corroborate provenance, and protect your precious attention.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
