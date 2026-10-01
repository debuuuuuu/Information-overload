import React, { useState } from 'react';
import type { Cluster, UserProfile, ConsumptionStyle } from '../types';
import { WidgetsBar } from './WidgetsBar';
import { AnimatedAsciiCanvas } from './AnimatedAsciiCanvas';
import {
  Sparkles, Globe, ShieldAlert, Award, FileText, ExternalLink, ThumbsUp,
  ThumbsDown, Filter, Search, ChevronDown, ChevronUp, Layers, CheckCircle2,
  Clock, BookOpen, AlertCircle, ArrowUpRight, ShieldCheck, Flame, Inbox, RefreshCw,
  MoreHorizontal, File, Calendar
} from 'lucide-react';

interface DashboardViewProps {
  clusters: Cluster[];
  userProfile: UserProfile;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenImportance: (cluster: Cluster) => void;
  onOpenSources: (cluster: Cluster) => void;
  onOpenFeedback: (cluster: Cluster) => void;
  onQuickUsefulFeedback: (clusterId: string) => void;
  onNavigateToTab: (tab: string) => void;
  onConsumptionStyleChange: (style: ConsumptionStyle) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  clusters,
  userProfile,
  searchQuery,
  onSearchChange,
  onOpenImportance,
  onOpenSources,
  onOpenFeedback,
  onQuickUsefulFeedback,
  onNavigateToTab,
  onConsumptionStyleChange
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedDigest, setExpandedDigest] = useState(false);

  // Filter clusters by search query and category
  const filteredClusters = clusters.filter(c => {
    const matchesSearch = searchQuery === "" ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.keyEntities.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedCategory === "all") return true;
    if (selectedCategory === "important") return c.priority === "critical" || c.priority === "important";
    if (selectedCategory === "ai") return c.topics.includes("AI");
    if (selectedCategory === "cyber") return c.topics.includes("Cybersecurity");
    if (selectedCategory === "hackathon") return c.topics.includes("Hackathons");
    if (selectedCategory === "digest") return c.isDigestItem || c.priority === "low";
    return true;
  });

  const highPriorityClusters = filteredClusters.filter(c => !c.isDigestItem && (c.priority === "critical" || c.priority === "important"));
  const relevantClusters = filteredClusters.filter(c => !c.isDigestItem && c.priority === "normal");
  const batchedDigestClusters = filteredClusters.filter(c => c.isDigestItem || c.priority === "low");

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Avant-Garde Editorial Hero Banner (Inspired directly by Reference Image 1 & 2) */}
      <div className="editorial-header-banner">
        {/* Top Checkerboard Accent Ribbon (Image 1 Motif) */}
        <div className="checkerboard-ribbon" />

        <div style={{
          padding: '22px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle Screentone Dots Background Texture (Image 2 Manga Screentone Motif) */}
          <div className="screentone-pattern" style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.12,
            pointerEvents: 'none'
          }} />

          {/* Animated ASCII Canvas replacing the static image */}
          <div style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '45%',
            opacity: 0.65,
            pointerEvents: 'none',
            overflow: 'hidden',
            maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 90%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 90%)'
          }}>
            <AnimatedAsciiCanvas interactive={false} density="medium" width={600} height={300} />
          </div>

          {/* Left / Center Content */}
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '820px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="font-serif" style={{
                fontSize: '0.72rem',
                color: 'var(--cobalt)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 800
              }}>
                ✦ ATLAS NO.252 // ARCHITECTURAL EDITORIAL · COGNITIVE RECEPTION
              </span>
              <span className="badge badge-cobalt" style={{ fontSize: '0.62rem' }}>
                STREAM ● LIVE
              </span>
            </div>

            <h1 className="font-display" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              fontSize: '2.8rem',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              marginTop: '12px',
              marginBottom: '4px'
            }}>
              <span>INFOLENS</span>
              <span style={{ color: 'var(--cobalt)', fontSize: '1.15em' }}>INTELLIGENCE OS</span>
            </h1>

            <p className="font-serif" style={{
              fontSize: '0.92rem',
              color: 'var(--text-silver)',
              marginTop: '6px',
              fontStyle: 'italic',
              maxWidth: '680px'
            }}>
              "In a modern world where self-realization has become an integral part of happiness, intelligence is not what you consume — it is what you filter."
            </p>

            <div style={{
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              marginTop: '10px',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <span>情報知能 · 認知過負荷解消システム</span>
              <span style={{ color: 'var(--border-strong)' }}>|</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>50 Ingested Raw Signals</span>
              <span style={{ color: 'var(--cobalt)' }}>→ 46 Canonical</span>
              <span style={{ color: 'var(--cobalt)' }}>→ 11 Semantic Clusters</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>→ 5 High Priority</span>
            </div>
          </div>

          {/* Right Status Block */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '8px',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{
              padding: '8px 16px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--cobalt-border)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'right'
            }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active Identity</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>{userProfile.name} ({userProfile.userType})</div>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-silver)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--cobalt)' }} />
              Neo4j Semantic Graph & MCP Online
            </div>
          </div>
        </div>

        {/* Bottom Checkerboard Accent Ribbon (Image 1 Motif) */}
        <div className="checkerboard-ribbon-subtle" />
      </div>

      {/* =========================================================================
          TWO COLUMN LAYOUT: FLOATING LEFT BLOCK & RIGHT MAIN FEED
          ========================================================================= */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(330px, 380px) 1fr',
        gap: '28px',
        alignItems: 'start'
      }}>
        {/* LEFT FLOATING BLOCK (Sidebar) */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          position: 'sticky',
          top: '24px',
          zIndex: 10
        }}>
          {/* =========================================================================
              IDENTITY & ATTENTION CALIBRATION STUDIO
              ========================================================================= */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* Left Form: Persona & Topics */}
        <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="font-serif" style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.12em', color: 'var(--cobalt)', textTransform: 'uppercase' }}>
                ✦ CALIBRATION STUDIO // IDENTITY & ATTENTION MATRIX
              </span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Calibrate Your Personal Space
            </h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-silver)', marginTop: '4px', marginBottom: '20px' }}>
              Select an archetype and adjust interest weights. The entire information space recalibrates mathematically in real time.
            </p>

            {/* Persona Pills */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '18px' }}>
              {[
                { type: "Student", label: "Student & Hacker", ai: 100, hack: 95, cyber: 85 },
                { type: "Researcher", label: "AI Researcher", ai: 100, hack: 40, cyber: 80 },
                { type: "Entrepreneur", label: "Tech Founder", ai: 95, hack: 60, cyber: 90 }
              ].map(p => {
                const isSelected = userProfile.userType === p.type;
                return (
                  <button
                    key={p.type}
                    onClick={() => {
                      userProfile.userType = p.type as any;
                      userProfile.interests["AI"] = p.ai;
                      userProfile.interests["Hackathons"] = p.hack;
                      userProfile.interests["Cybersecurity"] = p.cyber;
                      onConsumptionStyleChange(userProfile.consumptionStyle);
                    }}
                    type="button"
                    style={{
                      padding: '10px 12px',
                      borderRadius: '12px',
                      border: `1.5px solid ${isSelected ? 'var(--cobalt)' : 'var(--border-medium)'}`,
                      background: isSelected ? 'var(--cobalt-subtle)' : 'var(--bg-tertiary)',
                      color: isSelected ? 'var(--cobalt)' : 'var(--text-primary)',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            {/* Live Sliders for 3 Primary Topics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
              {[
                { key: "AI", label: "AI & Models" },
                { key: "Hackathons", label: "Hackathons" },
                { key: "Cybersecurity", label: "Cybersecurity" }
              ].map(t => (
                <div key={t.key} style={{ padding: '10px 12px', background: 'var(--bg-tertiary)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    <span>{t.label}</span>
                    <span style={{ color: 'var(--cobalt)', fontFamily: 'var(--font-mono)' }}>{userProfile.interests[t.key] ?? 50}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={userProfile.interests[t.key] ?? 50}
                    onChange={e => {
                      userProfile.interests[t.key] = parseInt(e.target.value);
                      onConsumptionStyleChange(userProfile.consumptionStyle);
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Tracked Entities */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Tracked:</span>
              {["OpenAI", "Sam Altman", "Project Mentor", "CISA", "Microsoft"].map(ent => (
                <span
                  key={ent}
                  className="tag-chip"
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--cobalt)',
                    borderColor: 'var(--cobalt-border)',
                    background: 'var(--cobalt-subtle)',
                    padding: '2px 8px'
                  }}
                >
                  @{ent}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Profile: <strong>{userProfile.name}</strong> · Quiet Window: <strong>{userProfile.attention.quietHours.start}–{userProfile.attention.quietHours.end}</strong>
            </span>
            <button
              onClick={() => onNavigateToTab("preferences")}
              className="btn btn-cobalt btn-xs"
              style={{ padding: '6px 14px', fontWeight: 700 }}
            >
              Open Full Calibration Matrix ↗
            </button>
          </div>
        </div>

        {/* Right Half: Museum-Grade 1-Bit Dithered Art (Reference Image 1) */}
        <div style={{
          position: 'relative',
          background: '#000000',
          minHeight: '280px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '28px'
        }}>
          {/* Replaced static dithered art with live ASCII canvas */}
          <div style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.8
          }}>
            <AnimatedAsciiCanvas interactive={true} density="medium" width={380} height={280} />
          </div>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 25%, rgba(0,0,0,0.2) 60%, transparent 100%)',
            pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative', zIndex: 1, color: '#ffffff' }}>
            <div className="font-serif" style={{ fontSize: '0.7rem', letterSpacing: '0.18em', color: '#0028ff', textTransform: 'uppercase', fontWeight: 800 }}>
              ✦ ATLAS NO.252 // COGNITIVE HARMONY
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginTop: '2px', lineHeight: 1.3 }}>
              A Quiet Mind in an Age of Information Deluge.
            </h3>
            <p style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '4px', lineHeight: 1.45 }}>
              Fine-grain noise suppression, verified provenance trails, and mathematical ranking tailored to your active workflow.
            </p>
          </div>
        </div>
      </div>

      {/* Front Page Widgets Bar (Image 5 style Information Gap, Timer, Weather, Focus) */}
      <WidgetsBar
        clusters={clusters}
        userProfile={userProfile}
        onOpenImportance={onOpenImportance}
        onOpenSources={onOpenSources}
      />

        </div> {/* End of Left Sidebar */}

        {/* RIGHT MAIN FEED BLOCK */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Filter Toolbar & Consumption Style Toggles (Strict Cobalt & Monochrome) */}
          <div className="glass-panel" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        {/* Category Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}>
          {[
            { id: "all", label: "All Signals" },
            { id: "important", label: "✦ Top Priority (≥70)" },
            { id: "ai", label: "AI & Models" },
            { id: "hackathon", label: "Hackathons" },
            { id: "cyber", label: "Cybersecurity" },
            { id: "digest", label: "Batched Digest" }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="btn btn-sm"
              style={{
                borderRadius: 'var(--radius-full)',
                background: selectedCategory === cat.id ? 'var(--cobalt)' : 'var(--bg-tertiary)',
                color: selectedCategory === cat.id ? '#ffffff' : 'var(--text-silver)',
                border: `1px solid ${selectedCategory === cat.id ? 'var(--cobalt)' : 'var(--border-subtle)'}`,
                boxShadow: selectedCategory === cat.id ? '0 0 12px var(--cobalt-glow)' : 'none',
                fontSize: '0.78rem'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Reading Consumption Style Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Reading Mode:
          </span>
          <div style={{
            display: 'inline-flex',
            background: 'var(--bg-tertiary)',
            padding: '3px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            {(["quick", "balanced", "deep"] as ConsumptionStyle[]).map(style => (
              <button
                key={style}
                onClick={() => onConsumptionStyleChange(style)}
                className="btn btn-xs"
                style={{
                  textTransform: 'capitalize',
                  background: userProfile.consumptionStyle === style ? 'var(--cobalt)' : 'transparent',
                  color: userProfile.consumptionStyle === style ? '#ffffff' : 'var(--text-silver)',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 1: HIGH PRIORITY / IMPORTANT CLUSTERS (IMAGE 4 FOLDER CARDS - ELECTRIC COBALT) */}
      {highPriorityClusters.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--cobalt)', fontSize: '1.2rem' }}>✦</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                Priority Action & Intelligence
              </h3>
              <span className="badge badge-cobalt" style={{ fontSize: '0.7rem' }}>
                {highPriorityClusters.length} Clusters
              </span>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-silver)' }}>
              Evaluated personal importance ≥ 70
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
            {highPriorityClusters.map((cluster, idx) => (
              <div key={cluster.id} className="hero-animate-in" style={{ animationDelay: `${0.1 + idx * 0.08}s` }}>
                <FolderCard
                  cluster={cluster}
                  userProfile={userProfile}
                  isPriority={true}
                  onOpenImportance={onOpenImportance}
                  onOpenSources={onOpenSources}
                  onOpenFeedback={onOpenFeedback}
                  onQuickUsefulFeedback={onQuickUsefulFeedback}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: RELEVANT / NORMAL CLUSTERS (IMAGE 4 FOLDER CARDS - MONOCHROME DARK WITH COBALT ACCENTS) */}
      {relevantClusters.length > 0 && (
        <div style={{ marginTop: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--text-silver)', fontSize: '1rem' }}>✦</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                Relevant Intelligence
              </h3>
              <span className="badge badge-subtle" style={{ fontSize: '0.7rem' }}>
                {relevantClusters.length} Clusters
              </span>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Standard relevance (45–69)
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
            {relevantClusters.map((cluster, idx) => (
              <div key={cluster.id} className="hero-animate-in" style={{ animationDelay: `${0.2 + idx * 0.08}s` }}>
                <FolderCard
                  cluster={cluster}
                  userProfile={userProfile}
                  isPriority={false}
                  onOpenImportance={onOpenImportance}
                  onOpenSources={onOpenSources}
                  onOpenFeedback={onOpenFeedback}
                  onQuickUsefulFeedback={onQuickUsefulFeedback}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: BATCHED DIGEST (STRICT MONOCHROME) */}
      {batchedDigestClusters.length > 0 && (
        <div style={{ marginTop: '14px' }}>
          <div
            onClick={() => setExpandedDigest(!expandedDigest)}
            className="glass-panel"
            style={{
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              borderColor: 'var(--border-subtle)',
              background: 'rgba(15, 23, 42, 0.5)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Inbox size={18} color="var(--text-muted)" />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                    Batched Daily Digest
                  </h3>
                  <span className="badge badge-subtle">{batchedDigestClusters.length} Deprioritized Clusters</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Sports, Gaming, and Entertainment automatically suppressed to protect attention.
                </p>
              </div>
            </div>

            <button className="btn btn-outline btn-xs" style={{ gap: '4px' }}>
              <span>{expandedDigest ? 'Collapse Digest' : 'Expand Digest'}</span>
              {expandedDigest ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          {expandedDigest && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px', marginTop: '16px' }}>
              {batchedDigestClusters.map((cluster, idx) => (
                <div key={cluster.id} className="hero-animate-in" style={{ animationDelay: `${0.05 + idx * 0.05}s` }}>
                  <FolderCard
                    cluster={cluster}
                    userProfile={userProfile}
                    isPriority={false}
                    onOpenImportance={onOpenImportance}
                    onOpenSources={onOpenSources}
                    onOpenFeedback={onOpenFeedback}
                    onQuickUsefulFeedback={onQuickUsefulFeedback}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
        </div> {/* End Right Feed Block */}
      </div> {/* End Two Column Grid */}
    </div>
  );
};

// IMAGE 4: FOLDER-TAB & NOTE-CARD DESIGN (STRICT COBALT & MONOCHROME)
interface FolderCardProps {
  cluster: Cluster;
  userProfile: UserProfile;
  isPriority: boolean;
  onOpenImportance: (cluster: Cluster) => void;
  onOpenSources: (cluster: Cluster) => void;
  onOpenFeedback: (cluster: Cluster) => void;
  onQuickUsefulFeedback: (clusterId: string) => void;
}

const FolderCard: React.FC<FolderCardProps> = ({
  cluster,
  userProfile,
  isPriority,
  onOpenImportance,
  onOpenSources,
  onOpenFeedback,
  onQuickUsefulFeedback
}) => {
  const [feedbackGiven, setFeedbackGiven] = useState<boolean | null>(null);

  const getSummaryContent = () => {
    if (userProfile.consumptionStyle === "quick") return cluster.quickSummary;
    if (userProfile.consumptionStyle === "deep") return cluster.deepSummary;
    return cluster.summary;
  };

  return (
    <div className="folder-card-wrapper">
      {/* Peeking Document Sheets (Image 4) in Clean Monochromatic Silver */}
      <div className="folder-sheet-peek-2" />
      <div className="folder-sheet-peek" />

      {/* Upper Folder Lip Tab (Cobalt for Priority, Monochrome Dark for Relevant) */}
      <div
        className={`folder-tab-header ${isPriority ? 'folder-tab-cobalt' : 'folder-tab-mono'}`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <File size={16} />
          <span style={{ fontSize: '0.88rem', fontWeight: 800, letterSpacing: '-0.01em' }}>
            {cluster.category}
          </span>
          <span style={{
            fontSize: '0.72rem',
            background: isPriority ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)',
            padding: '2px 7px',
            borderRadius: '12px'
          }}>
            {cluster.items.length}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 900, fontFamily: 'var(--font-mono)' }}>
            {cluster.importanceScore}/100
          </span>
          <MoreHorizontal size={16} style={{ cursor: 'pointer', opacity: 0.8 }} />
        </div>
      </div>

      {/* Main Folder Note Card Body (Image 4) */}
      <div
        className="folder-body"
        style={{
          borderBottomLeftRadius: '20px',
          borderBottomRightRadius: '20px',
          background: 'var(--bg-card)'
        }}
      >
        {/* Title */}
        <h4 style={{
          fontSize: '1.05rem',
          fontWeight: 700,
          color: '#ffffff',
          lineHeight: 1.4,
          marginBottom: '8px',
          letterSpacing: '-0.01em'
        }}>
          {cluster.title}
        </h4>

        {/* Summary Text */}
        <p style={{
          fontSize: '0.82rem',
          color: 'var(--text-silver)',
          lineHeight: 1.55,
          marginBottom: '14px',
          display: '-webkit-box',
          WebkitLineClamp: userProfile.consumptionStyle === 'quick' ? 2 : userProfile.consumptionStyle === 'deep' ? 6 : 4,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {getSummaryContent()}
        </p>

        {/* Key Points (Balanced / Deep mode) */}
        {userProfile.consumptionStyle !== 'quick' && cluster.keyPoints && cluster.keyPoints.length > 0 && (
          <div style={{
            padding: '10px 12px',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '14px'
          }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
              ✦ Key Verified Points:
            </div>
            <ul style={{ paddingLeft: '14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {cluster.keyPoints.slice(0, 2).map((kp, i) => (
                <li key={i} style={{ fontSize: '0.75rem', color: '#ffffff', lineHeight: 1.4 }}>
                  {kp}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags & Entities strictly in Cobalt & Silver */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
          {cluster.topics.slice(0, 3).map(t => (
            <span key={t} className="tag-chip" style={{ color: 'var(--cobalt-bright)', borderColor: 'var(--cobalt-border)', fontSize: '0.72rem' }}>
              #{t}
            </span>
          ))}
          {cluster.keyEntities.slice(0, 2).map(e => (
            <span key={e} className="tag-chip" style={{ color: '#ffffff', borderColor: 'var(--border-medium)', fontSize: '0.72rem' }}>
              @{e}
            </span>
          ))}
        </div>

        {/* Date Stamp & Actions Bottom Row (Image 4 Style) */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '10px',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            TODAY, 1 OCT 2026
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={() => onOpenImportance(cluster)}
              className="btn btn-outline btn-xs"
              style={{ fontSize: '0.7rem', padding: '3px 8px', color: '#ffffff', borderColor: 'var(--cobalt)' }}
              title="Inspect mathematical explainability"
            >
              <Sparkles size={11} color="var(--cobalt)" />
              Why?
            </button>

            <button
              onClick={() => onOpenClusterDetail(cluster)}
              className="btn btn-cobalt btn-xs"
              style={{ fontSize: '0.7rem', padding: '3px 8px', gap: '4px' }}
              title="View full cluster dossier"
            >
              Open Dossier <ExternalLink size={11} />
            </button>

            <button
              onClick={() => onOpenSources(cluster)}
              className="btn btn-outline btn-xs"
              style={{ fontSize: '0.7rem', padding: '3px 8px' }}
              title="View original sources"
            >
              Sources ({cluster.items.length})
            </button>

            {/* Thumbs up / down feedback */}
            <button
              onClick={() => {
                setFeedbackGiven(true);
                onQuickUsefulFeedback(cluster.id);
              }}
              className="btn btn-outline btn-xs"
              style={{
                padding: '3px 6px',
                color: feedbackGiven === true ? 'var(--cobalt-bright)' : 'var(--text-muted)',
                borderColor: feedbackGiven === true ? 'var(--cobalt)' : 'var(--border-subtle)'
              }}
              title="Useful"
            >
              <ThumbsUp size={11} />
            </button>
            <button
              onClick={() => {
                setFeedbackGiven(false);
                onOpenFeedback(cluster);
              }}
              className="btn btn-outline btn-xs"
              style={{
                padding: '3px 6px',
                color: feedbackGiven === false ? 'var(--text-white)' : 'var(--text-muted)',
                background: feedbackGiven === false ? 'rgba(255,255,255,0.1)' : 'transparent'
              }}
              title="Not Useful"
            >
              <ThumbsDown size={11} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
