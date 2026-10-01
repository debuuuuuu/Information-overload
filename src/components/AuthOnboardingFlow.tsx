import React, { useState, useEffect } from 'react';
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
      alignItems: 'stretch',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {/* Outer Editorial Container — full viewport */}
      <div style={{
        width: '100%',
        maxWidth: '100%',
        background: '#04060A', // Dark background for the whole modal
        color: '#05070d',
        display: 'grid',
        gridTemplateColumns: step === 1 ? '50% 50%' : '1fr', // 50/50 split on step 1
        overflow: 'hidden',
        border: 'none',
        position: 'relative'
      }}>
        {/* LEFT PANE: Form & Step Flow */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2vw',
        }}>
          {/* Floating Card */}
          <div style={{
            width: '100%',
            maxWidth: '520px',
            height: '85vh',
            padding: '44px 48px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#ffffff',
            borderRadius: '24px',
            boxShadow: '0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
            overflowY: 'auto',
            animation: 'floatGentle 6s ease-in-out infinite'
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
        </div>

        {/* RIGHT PANE: ANIMATED ASCII ART TERMINAL */}
        {step === 1 && (
          <div style={{
            position: 'relative',
            background: '#04060A',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'stretch',
            minHeight: '100%',
            fontFamily: "'JetBrains Mono', 'Courier New', monospace"
          }}>

            {/* Matrix rain background columns */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
              {[
                { left: '4%',  chars: '01∞◈░▓∴■', dur: '3.2s', delay: '0s',    opacity: 0.13 },
                { left: '8%',  chars: '01□⊕≡≈░◉', dur: '4.8s', delay: '2.1s',  opacity: 0.08 },
                { left: '11%', chars: 'アイウ01□◉⊕', dur: '2.6s', delay: '0.4s',  opacity: 0.10 },
                { left: '18%', chars: '░█▓01≈∵◈■', dur: '4.1s', delay: '1.1s',  opacity: 0.15 },
                { left: '22%', chars: 'クケ01■⊕◉≡', dur: '3.3s', delay: '0.8s',  opacity: 0.09 },
                { left: '26%', chars: '01⬡⊗∷∞◉░',  dur: '2.9s', delay: '0.7s',  opacity: 0.09 },
                { left: '34%', chars: 'エオ01▓■◈∴', dur: '3.7s', delay: '0.2s',  opacity: 0.12 },
                { left: '38%', chars: '01∴∷◈□░▓', dur: '4.5s', delay: '1.4s',  opacity: 0.08 },
                { left: '43%', chars: '01□⊕≡≈░◉▓', dur: '2.4s', delay: '1.5s',  opacity: 0.14 },
                { left: '48%', chars: '01▓░◈⬡∞∵', dur: '3.6s', delay: '0.5s',  opacity: 0.11 },
                { left: '52%', chars: 'カキ01∞■∵◈', dur: '3.5s', delay: '0.9s',  opacity: 0.10 },
                { left: '61%', chars: '░▓01⬢◉⊗≈■', dur: '2.8s', delay: '0.3s',  opacity: 0.13 },
                { left: '65%', chars: '01∞◈░▓∴■', dur: '4.2s', delay: '1.9s',  opacity: 0.07 },
                { left: '70%', chars: '01∴∷◈□░▓∞', dur: '4.3s', delay: '1.8s',  opacity: 0.11 },
                { left: '78%', chars: 'クケ01■⊕◉≡', dur: '3.1s', delay: '0.6s',  opacity: 0.15 },
                { left: '82%', chars: 'アイウ01□◉', dur: '2.7s', delay: '1.3s',  opacity: 0.10 },
                { left: '86%', chars: '01▓░◈⬡∞∵■', dur: '2.5s', delay: '1.2s',  opacity: 0.09 },
                { left: '93%', chars: 'コ01□⊗≈■◉░', dur: '3.9s', delay: '0.1s',  opacity: 0.12 },
              ].map((col, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  top: '-120%',
                  left: col.left,
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize: '0.65rem',
                  lineHeight: '1.6',
                  color: '#0028FF',
                  opacity: col.opacity,
                  animation: `matrixRain ${col.dur} linear infinite`,
                  animationDelay: col.delay,
                  userSelect: 'none',
                  letterSpacing: '0.05em'
                }}>
                  {col.chars.repeat(40).split('').map((ch, j) => (
                    <span key={j} style={{ opacity: j % 7 === 0 ? 1 : 0.5 }}>{ch}</span>
                  ))}
                </div>
              ))}
            </div>

            {/* Scanline CRT overlay */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
              background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)'
            }} />

            {/* Radial vignette */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)'
            }} />

            {/* Horizontal scanning laser */}
            <div style={{
              position: 'absolute',
              top: 0, bottom: 0, left: '-10%',
              width: '4px',
              background: '#0028FF',
              boxShadow: '0 0 20px 4px #0028FF, 0 0 40px 10px #60A5FA',
              zIndex: 3,
              pointerEvents: 'none',
              animation: 'scannerSweep 8s ease-in-out infinite alternate',
              opacity: 0.6
            }} />

            {/* SVG Background Radar */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, pointerEvents: 'none', opacity: 0.28 }}>
              <svg width="600" height="600" viewBox="0 0 600 600">
                <g style={{ animation: 'orbitalRotate 40s linear infinite', transformOrigin: '300px 300px' }}>
                  <circle cx="300" cy="300" r="280" fill="none" stroke="#0028FF" strokeWidth="1" strokeDasharray="2 18" />
                  <circle cx="300" cy="300" r="220" fill="none" stroke="#0028FF" strokeWidth="1.5" strokeDasharray="10 30" />
                  <circle cx="300" cy="300" r="180" fill="none" stroke="#60A5FA" strokeWidth="1" strokeDasharray="40 80" />
                </g>
                <g style={{ animation: 'orbitalRotate 25s linear infinite reverse', transformOrigin: '300px 300px' }}>
                  <circle cx="300" cy="300" r="130" fill="none" stroke="#0028FF" strokeWidth="2" strokeDasharray="15 15" />
                  <polygon points="300,180 404,240 404,360 300,420 196,360 196,240" fill="none" stroke="#60A5FA" strokeWidth="1" opacity="0.5" />
                </g>
                <g style={{ animation: 'orbitalRotate 12s linear infinite', transformOrigin: '300px 300px' }}>
                  <polygon points="300,220 369,260 369,340 300,380 231,340 231,260" fill="none" stroke="#0028FF" strokeWidth="1.5" strokeDasharray="5 15" />
                </g>
                {/* Crosshairs */}
                <path d="M 300 20 L 300 580 M 20 300 L 580 300" stroke="#0028FF" strokeWidth="1" opacity="0.4" />
                <path d="M 300 300 L 520 80" stroke="#60A5FA" strokeWidth="3" style={{ transformOrigin: '300px 300px', animation: 'orbitalRotate 4s linear infinite' }} />
                {/* Center glow */}
                <circle cx="300" cy="300" r="12" fill="#0028FF" style={{ filter: 'blur(8px)', animation: 'pulse 2s infinite' }} />
                
                {/* Corner Brackets */}
                <path d="M 50 100 L 50 50 L 100 50" fill="none" stroke="#0028FF" strokeWidth="2" opacity="0.5" />
                <path d="M 550 100 L 550 50 L 500 50" fill="none" stroke="#0028FF" strokeWidth="2" opacity="0.5" />
                <path d="M 50 500 L 50 550 L 100 550" fill="none" stroke="#0028FF" strokeWidth="2" opacity="0.5" />
                <path d="M 550 500 L 550 550 L 500 550" fill="none" stroke="#0028FF" strokeWidth="2" opacity="0.5" />
              </svg>
            </div>

            {/* Central ASCII diagram */}
            <div style={{ position: 'relative', zIndex: 2, padding: '24px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              <pre style={{
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                fontSize: '0.66rem',
                lineHeight: 1.45,
                color: '#475569',
                margin: 0,
                userSelect: 'none',
                display: 'inline-block',
                textAlign: 'left',
                letterSpacing: '0.04em'
              }}>
{`┌──────────────────────────────────────────────────────────────┐
│ INFOLENS KERNEL // v9.4.2                     [  `}<span style={{ color: '#0028FF', textShadow: '0 0 10px #0028FF' }}>ONLINE</span>{`  ] │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  [ `}<span style={{ color: '#FFFFFF' }}>GLOBAL INGEST</span>{` ]                                           │
│  `}<span style={{ color: '#0028FF', textShadow: '0 0 8px #0028FF' }}>#######################################</span>{`...........  78%     │
│                                                              │
│         `}<span style={{ color: '#60A5FA' }}>+</span>{` -------- `}<span style={{ color: '#0028FF', animation: 'peakBeacon 2s infinite' }}>*</span>{` -------- `}<span style={{ color: '#60A5FA' }}>+</span>{`         [ `}<span style={{ color: '#FFFFFF' }}>METRICS</span>{` ]            │
│         | \\        |        / |         > FOCUS : `}<span style={{ color: '#FFFFFF' }}>94.2%</span>{`        │
│         |   \\      |      /   |         > NOISE : 12,400       │
│         `}<span style={{ color: '#0028FF', animation: 'peakBeacon 3s infinite' }}>*</span>{` ---- `}<span style={{ color: '#0028FF', textShadow: '0 0 14px #0028FF' }}>[ CORE ]</span>{` ----- `}<span style={{ color: '#0028FF', animation: 'peakBeacon 2.5s infinite' }}>*</span>{`         > SPAN  : 3 hrs        │
│         |   /      |      \\   |                                │
│         | /        |        \\ |         [ `}<span style={{ color: '#FFFFFF' }}>PIPELINE</span>{` ]           │
│         `}<span style={{ color: '#60A5FA' }}>+</span>{` -------- `}<span style={{ color: '#60A5FA' }}>+</span>{` -------- `}<span style={{ color: '#60A5FA' }}>+</span>{`         > GRAPH SYNTH          │
│                                         > SEMANTIC EDGE        │
│                                                              │
│  [ `}<span style={{ color: '#FFFFFF' }}>ACTIVE STREAMS</span>{` ]                                          │
│  > arxiv.org/cs.ai  .......................... [ `}<span style={{ color: '#60A5FA', animation: 'pulse 2s infinite' }}>SYNCING</span>{` ] │
│  > github.com/mcp   .......................... [   `}<span style={{ color: '#0028FF', textShadow: '0 0 8px #0028FF' }}>OK</span>{`    ] │
│  > slack/eng-leads  .......................... [   `}<span style={{ color: '#0028FF', textShadow: '0 0 8px #0028FF' }}>OK</span>{`    ] │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ TRACE: `}<span style={{ color: '#0028FF' }}>0x4F 0x92 0xAA 0x11 0xBB 0x09 0x4F 0x92 0xAA 0x1A</span>{`    │
└──────────────────────────────────────────────────────────────┘`}
              </pre>

              {/* Blinking cursor at the end */}
              <div style={{ marginTop: '12px', textAlign: 'left', width: '100%', maxWidth: '380px', paddingLeft: '8px' }}>
                <span style={{ fontSize: '0.62rem', color: '#60A5FA', fontFamily: "'JetBrains Mono', monospace" }}>{`> AWAITING DIRECTIVE`}</span>
                <span style={{
                  display: 'inline-block',
                  width: '7px', height: '11px',
                  background: '#0028FF',
                  marginLeft: '6px',
                  verticalAlign: 'middle',
                  animation: 'peakBeacon 0.9s step-end infinite',
                  boxShadow: '0 0 10px rgba(0,40,255,0.9)'
                }} />
              </div>
            </div>

              {/* Caption */}
              <div style={{ marginTop: '28px', borderTop: '1px solid rgba(0,40,255,0.2)', paddingTop: '20px' }}>
                <div style={{
                  fontSize: '0.62rem', letterSpacing: '0.2em',
                  color: '#0028FF', fontWeight: 700, marginBottom: '8px'
                }}>
                  ✦ ATLAS NO.252  //  COGNITIVE HARMONY
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.3 }}>
                  A Quiet Mind in an Age of<br />Information Storms.
                </div>
                <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: '6px', lineHeight: 1.6 }}>
                  Filter ambient noise · corroborate provenance<br />
                  · protect your precious attention.
                </div>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};
