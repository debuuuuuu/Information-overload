import React, { useState } from 'react';
import type { Cluster, UserProfile, PriorityLevel } from '../types';
import {
  Bell, Clock, ShieldAlert, AlertTriangle, CheckCircle, Moon, Sun, ArrowUpRight,
  Sparkles, ShieldCheck, Inbox, EyeOff, Layers, ExternalLink
} from 'lucide-react';

interface AttentionCenterViewProps {
  clusters: Cluster[];
  userProfile: UserProfile;
  onOpenImportance: (cluster: Cluster) => void;
  onOpenSources: (cluster: Cluster) => void;
}

export const AttentionCenterView: React.FC<AttentionCenterViewProps> = ({
  clusters,
  userProfile,
  onOpenImportance,
  onOpenSources
}) => {
  // Simulated clock toggle: Day (14:30 - Quiet Hours Inactive) vs Night (23:30 - Quiet Hours ACTIVE)
  const [isSimulatedNight, setIsSimulatedNight] = useState(true);

  const quietHoursStart = userProfile.attention.quietHours.start || "22:00";
  const quietHoursEnd = userProfile.attention.quietHours.end || "07:00";
  const quietHoursActive = userProfile.attention.quietHours.enabled && isSimulatedNight;

  // Priority groupings
  const criticalItems = clusters.filter(c => c.priority === "critical");
  const importantItems = clusters.filter(c => c.priority === "important");
  const normalItems = clusters.filter(c => c.priority === "normal");
  const lowItems = clusters.filter(c => c.priority === "low" || c.isDigestItem);

  // Items that bypassed quiet hours
  const bypassedItems = clusters.filter(c => c.reasoning.bypassedQuietHours || c.priority === "critical");

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-cobalt">Attention Center</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cognitive Load & Quiet Hours Management</span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Attention Engine & Digest Routing
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Prevents notification fatigue by enforcing quiet hours, batching secondary digests, and only breaking through for urgent signals.
          </p>
        </div>

        {/* Quiet Hours Simulation Controller */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 16px',
          background: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-md)',
          border: `1px solid ${quietHoursActive ? 'var(--cobalt)' : 'var(--border-subtle)'}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {quietHoursActive ? (
              <Moon size={18} color="var(--cobalt)" />
            ) : (
              <Sun size={18} color="var(--cobalt)" />
            )}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ffffff' }}>
                {quietHoursActive ? "QUIET HOURS ACTIVE (23:30)" : "QUIET HOURS INACTIVE (14:30)"}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-silver)' }}>
                Configured Window: {quietHoursStart} – {quietHoursEnd}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsSimulatedNight(!isSimulatedNight)}
            className="btn btn-outline btn-xs"
          >
            Toggle Simulated Time
          </button>
        </div>
      </div>

      {/* Attention Stats Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '18px', borderLeft: '4px solid var(--cobalt)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--cobalt-bright)' }}>
              Critical Urgency
            </span>
            <span className="badge badge-cobalt">{criticalItems.length}</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
            {criticalItems.length} <span style={{ fontSize: '0.85rem', color: 'var(--text-silver)' }}>clusters</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-silver)', marginTop: '4px' }}>
            Immediate delivery • Bypasses quiet hours
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '18px', borderLeft: '4px solid var(--cobalt)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--cobalt-bright)' }}>
              Important Signal
            </span>
            <span className="badge badge-cobalt">{importantItems.length}</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
            {importantItems.length} <span style={{ fontSize: '0.85rem', color: 'var(--text-silver)' }}>clusters</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-silver)', marginTop: '4px' }}>
            Highlighted prominently on dashboard
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '18px', borderLeft: '4px solid var(--border-medium)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-silver)' }}>
              Normal Relevant
            </span>
            <span className="badge badge-subtle">{normalItems.length}</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
            {normalItems.length} <span style={{ fontSize: '0.85rem', color: 'var(--text-silver)' }}>clusters</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-silver)', marginTop: '4px' }}>
            Standard stream • Suppressed during quiet hours
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '18px', borderLeft: '4px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)' }}>
              Batched Digest
            </span>
            <span className="badge badge-subtle">{lowItems.length}</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
            {lowItems.length} <span style={{ fontSize: '0.85rem', color: 'var(--text-silver)' }}>clusters</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-silver)', marginTop: '4px' }}>
            Deprioritized topics released at 08:00 & 18:00
          </p>
        </div>
      </div>

      {/* Urgent Items That Bypassed Quiet Hours Section */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <ShieldAlert size={20} color="var(--cobalt)" />
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>
              Urgent Items that Bypassed Quiet Hours
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-silver)' }}>
              These items qualified for quiet-hour emergency override based on urgency tags or CVSS severity:
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {bypassedItems.map(c => (
            <div
              key={c.id}
              style={{
                padding: '16px',
                background: 'rgba(0, 40, 255, 0.08)',
                border: '1px solid var(--cobalt-border)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div style={{ maxWidth: '75%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span className="badge badge-cobalt">BYPASSED QUIET HOURS</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--cobalt-bright)' }}>
                    {c.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-silver)' }}>
                    Score: <strong>{c.importanceScore}/100</strong>
                  </span>
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                  {c.title}
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-silver)', marginTop: '4px' }}>
                  {c.quickSummary}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => onOpenImportance(c)} className="btn btn-secondary btn-xs">
                  <Sparkles size={12} color="var(--cobalt)" />
                  Why Bypassed?
                </button>
                <button onClick={() => onOpenSources(c)} className="btn btn-secondary btn-xs">
                  View Sources ({c.items.length})
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Items Currently Batched in Digest Section */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Inbox size={20} color="var(--accent-cyan)" />
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Items Currently Batched in Daily Digest
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Non-urgent and deprioritized topics held back until your next scheduled digest window (Morning: 08:00 AM | Evening: 18:00 PM):
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
          {lowItems.map(c => (
            <div
              key={c.id}
              style={{
                padding: '16px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="badge badge-low">BATCHED DIGEST</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Score: {c.importanceScore}/100</span>
              </div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {c.title}
              </h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                {c.quickSummary}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Next Release: Today 18:00</span>
                <button onClick={() => onOpenSources(c)} className="btn btn-outline btn-xs">
                  Inspect Sources
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
