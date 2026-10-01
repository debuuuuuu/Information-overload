import React, { useState, useEffect } from 'react';
import type { Cluster, UserProfile } from '../types';
import {
  Clock, CloudLightning, Sparkles, Play, Pause, RotateCcw,
  Sun, Moon, ArrowUpRight, ShieldCheck, Radio
} from 'lucide-react';

interface WidgetsBarProps {
  clusters: Cluster[];
  userProfile: UserProfile;
  onOpenImportance: (cluster: Cluster) => void;
  onOpenSources: (cluster: Cluster) => void;
}

export const WidgetsBar: React.FC<WidgetsBarProps> = ({
  clusters,
  userProfile,
  onOpenImportance,
  onOpenSources
}) => {
  const [now, setNow] = useState<Date>(new Date());
  const [timeMode, setTimeMode] = useState<"countdown" | "clock">("clock");
  const [focusSeconds, setFocusSeconds] = useState<number>(25 * 60);
  const [focusRunning, setFocusRunning] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let focusInterval: ReturnType<typeof setTimeout>;
    if (focusRunning && focusSeconds > 0) {
      focusInterval = setInterval(() => {
        setFocusSeconds(s => s - 1);
      }, 1000);
    }
    return () => clearInterval(focusInterval);
  }, [focusRunning, focusSeconds]);

  // Target midnight cutoff
  const targetMidnight = new Date(now);
  targetMidnight.setHours(23, 59, 59, 999);
  const diffMs = Math.max(0, targetMidnight.getTime() - now.getTime());
  const cdHours = Math.floor(diffMs / (1000 * 60 * 60));
  const cdMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const cdSecs = Math.floor((diffMs % (1000 * 60)) / 1000);

  const format2 = (n: number) => n.toString().padStart(2, '0');

  const localHours = format2(now.getHours());
  const localMins = format2(now.getMinutes());
  const localSecs = format2(now.getSeconds());

  const pomMins = Math.floor(focusSeconds / 60);
  const pomSecs = focusSeconds % 60;

  const topCluster = clusters.find(c => c.priority === "critical") || clusters[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
      {/* =========================================================================
          HERO WIDGET: LIVE INTELLIGENCE STREAM
          ========================================================================= */}
      <div className="hero-animate-in" style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        padding: '24px',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
        animationDelay: '0.1s'
      }}>
        {/* Top Header Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="anim-live-pulse" style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: 'var(--cobalt)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <Radio size={14} />
            </div>
            <div>
              <span className="font-serif" style={{ fontSize: '0.95rem', fontWeight: 800, letterSpacing: '0.04em', color: 'var(--text-primary)' }}>
                Nexus // Live Signal Stream
              </span>
            </div>
          </div>
          <span className="badge badge-cobalt">LIVE INTELLIGENCE</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {clusters
            .flatMap(c => c.items)
            .slice(0, 4)
            .map((item, idx) => (
            <div key={item.id || idx} style={{
              display: 'flex',
              gap: '12px',
              borderBottom: idx === 3 ? 'none' : '1px solid var(--border-subtle)',
              paddingBottom: idx === 3 ? '0' : '12px',
              alignItems: 'flex-start'
            }}>
              <div style={{ 
                fontSize: '0.7rem', 
                color: 'var(--cobalt)', 
                fontWeight: 700, 
                minWidth: '55px', 
                paddingTop: '2px',
                fontFamily: 'var(--font-mono)'
              }}>
                {item.publishedAt ? new Date(item.publishedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'LIVE'}
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.4 }}>
                  {item.title}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-silver)', textTransform: 'uppercase', background: 'var(--bg-tertiary)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                    {item.sourceName}
                  </span>
                  {item.topics.slice(0, 1).map(t => (
                    <span key={t} style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          ROW 2: ARCHITECTURAL TELEMETRY BLUEPRINT CARDS (IMAGE 4 SUMMIT STYLE)
          ========================================================================= */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        {/* CARD 1: FIG.01 COGNITIVE SIGNAL WEATHER & STREAM */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          position: 'relative',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {/* Blueprint Corner Crosshair '+' (Image 4 Motif) */}
          <div style={{ position: 'absolute', top: '8px', right: '10px', fontSize: '0.85rem', color: 'var(--cobalt)', fontFamily: 'monospace' }}>+</div>
          <div style={{ position: 'absolute', bottom: '8px', left: '10px', fontSize: '0.85rem', color: 'var(--cobalt)', fontFamily: 'monospace' }}>+</div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span className="font-serif" style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cobalt)' }}>
              [ FIG.01 // COGNITIVE CLARITY STREAM ]
            </span>
            <span className="badge badge-cobalt" style={{ fontSize: '0.62rem' }}>
              ELEV. ● LIVE
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <span style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
              92%
            </span>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>Signal Clarity Index</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-silver)' }}>Ambient noise reduced by 88%</div>
            </div>
          </div>

          <div style={{
            marginTop: '14px',
            padding: '10px 14px',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.76rem',
            color: 'var(--text-silver)',
            lineHeight: 1.45
          }}>
            <span style={{ color: 'var(--cobalt)', fontWeight: 700 }}>✦ Telemetry Storm:</span> CVE-2026-4401 zero-day exploit and Hackathon 2026 cutoff have generated inbound surges. 4 redundant cross-posts quarantined.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
            <div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Ambient Pressure</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                14 pings/hr <span style={{ fontSize: '0.7rem', color: 'var(--cobalt)' }}>(Filtered)</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Quarantined Noise</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--cobalt)', marginTop: '2px' }}>
                -88% Cognitive Load
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: FIG.02 PROVENANCE & FACT VERIFICATION */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          position: 'relative',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {/* Blueprint Corner Crosshairs */}
          <div style={{ position: 'absolute', top: '8px', right: '10px', fontSize: '0.85rem', color: 'var(--cobalt)', fontFamily: 'monospace' }}>+</div>
          <div style={{ position: 'absolute', bottom: '8px', left: '10px', fontSize: '0.85rem', color: 'var(--cobalt)', fontFamily: 'monospace' }}>+</div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span className="font-serif" style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cobalt)' }}>
              [ FIG.02 // PROVENANCE & INTEGRITY ]
            </span>
            <button
              onClick={() => onOpenImportance(topCluster)}
              className="btn btn-outline btn-xs"
              style={{ fontSize: '0.68rem', color: 'var(--cobalt)', borderColor: 'var(--cobalt)' }}
            >
              Inspect Proof ↗
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <span style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
              74%
            </span>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>Verified Decisions</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-silver)' }}>Backed by verified primary sources</div>
            </div>
          </div>

          <div style={{ marginTop: '14px' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Corroboration Gap Vectors:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {["Cost Analysis Verified", "Risk Comparison Modeled", "Timeline Impact Calibrated"].map(factor => (
                <span
                  key={factor}
                  className="tag-chip"
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--text-primary)',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-medium)',
                    padding: '3px 8px'
                  }}
                >
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--cobalt)' }} />
                  {factor}
                </span>
              ))}
            </div>
          </div>

          <div style={{
            marginTop: '16px',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem'
          }}>
            <span style={{ color: 'var(--text-muted)' }}>Complete Provenance Traceability</span>
            <span
              onClick={() => onOpenSources(topCluster)}
              style={{ color: 'var(--cobalt)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              Audit Sources ({topCluster.items.length}) <ArrowUpRight size={13} />
            </span>
          </div>
        </div>

        {/* CARD 3: FIG.03 DEEP FOCUS & ATTENTION SHIELD */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          position: 'relative',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          {/* Blueprint Corner Crosshairs */}
          <div style={{ position: 'absolute', top: '8px', right: '10px', fontSize: '0.85rem', color: 'var(--cobalt)', fontFamily: 'monospace' }}>+</div>
          <div style={{ position: 'absolute', bottom: '8px', left: '10px', fontSize: '0.85rem', color: 'var(--cobalt)', fontFamily: 'monospace' }}>+</div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span className="font-serif" style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cobalt)' }}>
                [ FIG.03 // ATTENTION SHIELD ]
              </span>
              <span className="badge badge-subtle" style={{ fontSize: '0.62rem' }}>
                SHIELD ARMED
              </span>
            </div>

            <div style={{ fontSize: '0.74rem', color: 'var(--text-silver)', marginBottom: '10px' }}>
              Quiet Hours: <strong style={{ color: 'var(--text-primary)' }}>{userProfile.attention.quietHours.start} – {userProfile.attention.quietHours.end}</strong> (Bypass critical score ≥90 only)
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              background: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Focus Pomodoro</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                  {format2(pomMins)}:{format2(pomSecs)}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  onClick={() => setFocusRunning(!focusRunning)}
                  className="btn btn-cobalt btn-xs"
                  style={{ padding: '6px 12px' }}
                >
                  {focusRunning ? <Pause size={13} /> : <Play size={13} />}
                  <span>{focusRunning ? 'Pause' : 'Start'}</span>
                </button>
                <button
                  onClick={() => {
                    setFocusRunning(false);
                    setFocusSeconds(25 * 60);
                  }}
                  className="btn btn-outline btn-xs"
                  style={{ padding: '6px 8px' }}
                >
                  <RotateCcw size={13} />
                </button>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '16px',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem'
          }}>
            <span style={{ color: 'var(--text-muted)' }}>Next Release: 18:00</span>
            <span style={{ color: 'var(--cobalt)', fontWeight: 700 }}>
              5 Deprioritized Items Queued
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
