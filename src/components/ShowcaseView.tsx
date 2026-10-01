import React, { useState } from 'react';
import type { UserProfile, Cluster } from '../types';
import {
  Sparkles, ArrowRight, Shield, Layers, Network, Cpu, Database,
  ArrowUpRight, Terminal, Radio, Activity, Eye, CheckCircle2
} from 'lucide-react';
import { ThreeParticleHero } from './ThreeParticleHero';
import { AnimatedAsciiCanvas } from './AnimatedAsciiCanvas';
import { AsciiBackgroundHero } from './AsciiBackgroundHero';

interface ShowcaseViewProps {
  onStartOnboarding: () => void;
  onEnterApp: (tab?: string) => void;
  clusters: Cluster[];
  userProfile: UserProfile;
}

export const ShowcaseView: React.FC<ShowcaseViewProps> = ({
  onStartOnboarding,
  onEnterApp,
  clusters,
  userProfile
}) => {
  // 90 days barcode data generation
  const barcodeDays = Array.from({ length: 90 }, (_, i) => {
    const base = 25 + Math.sin(i * 0.12) * 15 + Math.cos(i * 0.05) * 20;
    const isSpike = i === 18 || i === 54 || i === 76;
    const height = isSpike ? 85 + (i % 3) * 5 : Math.max(12, Math.min(75, base + ((i * 17) % 25)));
    return {
      day: i + 1,
      height,
      isPeak: isSpike,
      label: isSpike ? (i === 18 ? '199k' : i === 54 ? '204k' : '197k') : undefined,
      isWeekend: (i % 7 === 5 || i % 7 === 6)
    };
  });

  // Interactive diagram states for Cognitive Reception Architecture
  const [hoveredSpoke, setHoveredSpoke] = useState<number | null>(null);
  const [hoveredStack, setHoveredStack] = useState<number | null>(null);
  const [scrubbedDay, setScrubbedDay] = useState<number | null>(null);
  const [hoveredCapsule, setHoveredCapsule] = useState<number | null>(null);
  const [hoveredPetal, setHoveredPetal] = useState<number | null>(null);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#04060A',
      color: '#FFFFFF',
      overflowX: 'hidden',
      fontFamily: 'var(--font-sans)'
    }}>
      {/* ============================================================
          SHOWCASE NAVBAR (Unified Deep Obsidian + Electric Cobalt)
          ============================================================ */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(4, 6, 10, 0.88)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0 40px',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand / Logo */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.04em', color: '#FFFFFF' }}>
            /InfoLens.
          </span>
          <span style={{
            fontSize: '0.62rem',
            padding: '2px 8px',
            borderRadius: '999px',
            background: 'rgba(0, 40, 255, 0.2)',
            border: '1px solid #0028FF',
            color: '#7090FF',
            fontWeight: 800,
            letterSpacing: '0.06em'
          }}>
            OS 2026
          </span>
        </div>

        {/* Center Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          {[
            { label: 'Overview', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
            { label: 'Visual Analytics', onClick: () => document.getElementById('editorial-analytics')?.scrollIntoView({ behavior: 'smooth' }) },
            { label: 'Knowledge Graph', onClick: () => onEnterApp('graph') },
            { label: 'MCP Protocol', onClick: () => onEnterApp('mcp') },
            { label: 'Operating System', onClick: () => onEnterApp('dashboard') }
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={item.onClick}
              style={{
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                padding: '4px 0'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
              onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={() => onEnterApp('dashboard')}
            style={{
              background: 'none',
              border: 'none',
              color: '#CBD5E1',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '8px 14px'
            }}
          >
            Live Demo
          </button>
          <button
            onClick={onStartOnboarding}
            style={{
              background: '#0028FF',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '999px',
              padding: '10px 22px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 0 20px rgba(0, 40, 255, 0.6)',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span>Get started</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </header>

      {/* ============================================================
          VOYID STYLE HERO SECTION
          Enhanced Background with Fine Celestial Stardust & Ambient Cobalt Aura
          Centerpiece: ONLY Animated ASCII Matrix Stream (as requested)
          ============================================================ */}
      <section style={{
        position: 'relative',
        padding: '48px 20px 32px',
        maxWidth: '1240px',
        margin: '0 auto',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 15%, rgba(0, 40, 255, 0.16) 0%, rgba(4, 6, 10, 0.98) 65%, #04060A 100%)'
      }}>
        {/* Animated Background ASCII Art Canvas (3D Topology Sphere, Waves, Watermark, Magnetic Cursor) */}
        <AsciiBackgroundHero interactive={true} opacity={0.65} />

        {/* Refined Three.js 3D Fine Particle Mesh */}
        <ThreeParticleHero particleCount={450} />

        {/* Content Container (Layered above Background Art) */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Ambient Cobalt Breathing Aura Behind Text */}
          <div
            className="hero-aura"
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              width: '640px',
              height: '220px',
              background: 'radial-gradient(ellipse at center, rgba(0, 40, 255, 0.3) 0%, rgba(0, 40, 255, 0.08) 55%, transparent 75%)',
              filter: 'blur(45px)',
              pointerEvents: 'none',
              zIndex: -1
            }}
          />

          {/* Architectural HUD Coordinate Header */}
          <div
            className="hero-animate-in"
            style={{
              animationDelay: '0.05s',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              width: '100%',
              maxWidth: '660px',
              margin: '0 auto 12px',
              padding: '5px 14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.66rem',
              color: 'rgba(148, 163, 184, 0.65)',
              letterSpacing: '0.08em',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <span>┌ [SYS.STREAM // v2026.4]</span>
            <span style={{ color: '#0028FF', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '8px', height: '8px' }}>
                <span style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: '#0028FF', animation: 'radarPing 2.2s cubic-bezier(0, 0.2, 0.8, 1) infinite' }} />
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#0028FF', boxShadow: '0 0 8px #0028FF' }} />
              </span>
              NEURAL INGESTION ACTIVE
            </span>
            <span>[LAT. 37°46'N · LON. 122°25'W] ┐</span>
          </div>

          {/* Subtle Pill Tag */}
          <div
            className="hero-animate-in"
            style={{
              animationDelay: '0.12s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 16px',
              borderRadius: '999px',
              background: 'rgba(0, 40, 255, 0.08)',
              border: '1px solid rgba(0, 40, 255, 0.35)',
              fontSize: '0.70rem',
              color: '#E2E8F0',
              marginBottom: '16px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 0 20px rgba(0, 40, 255, 0.25)'
            }}
          >
            <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '8px', height: '8px' }}>
              <span style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: '#0028FF', animation: 'radarPing 2.6s cubic-bezier(0, 0.2, 0.8, 1) infinite' }} />
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0028FF', boxShadow: '0 0 10px #0028FF' }} />
            </span>
            <span style={{ letterSpacing: '0.04em', fontWeight: 600 }}>PERSONAL INFORMATION INTELLIGENCE OPERATING SYSTEM</span>
          </div>

          {/* Elevated Project-Specific Headline */}
          <h1
            className="hero-animate-in"
            style={{
              animationDelay: '0.20s',
              fontSize: 'clamp(2.5rem, 5.4vw, 4.4rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.04em',
              maxWidth: '960px',
              margin: '0 auto 16px',
              color: '#FFFFFF',
              position: 'relative'
            }}
          >
            <span
              style={{
                display: 'block',
                fontSize: 'clamp(2.3rem, 5vw, 4rem)',
                color: '#FFFFFF',
                letterSpacing: '-0.035em',
                marginBottom: '4px'
              }}
            >
              Turn Information Overload
            </span>
            <span
              className="hero-text-sheen"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(110deg, #FFFFFF 0%, #D8E2FE 20%, #7B9BFF 45%, #0028FF 55%, #A3BAFF 75%, #FFFFFF 100%)',
                backgroundSize: '250% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: '#7090FF',
                textShadow: '0 0 35px rgba(0, 40, 255, 0.35)'
              }}
            >
              into Personal Intelligence.
            </span>
          </h1>

          {/* Subtitle with Clear InfoLens Value Proposition */}
          <p
            className="hero-animate-in"
            style={{
              animationDelay: '0.28s',
              fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
              color: '#94A3B8',
              maxWidth: '720px',
              lineHeight: 1.6,
              margin: '0 auto 20px',
              fontWeight: 400
            }}
          >
            Stop drowning in fragmented streams. InfoLens ingests feeds across{' '}
            <span style={{ color: '#E2E8F0', borderBottom: '1px solid rgba(0, 40, 255, 0.5)', paddingBottom: '1px', fontWeight: 500 }}>MCP servers</span>,{' '}
            <span style={{ color: '#E2E8F0', borderBottom: '1px solid rgba(0, 40, 255, 0.5)', paddingBottom: '1px', fontWeight: 500 }}>arXiv</span>, and{' '}
            <span style={{ color: '#E2E8F0', borderBottom: '1px solid rgba(0, 40, 255, 0.5)', paddingBottom: '1px', fontWeight: 500 }}>developer alerts</span>{' '}
            — clustering related ideas, ranking by your personal importance, and preserving verifiable provenance.
          </p>

          {/* Core Feature Badges with Interactive Hover Elevation */}
          <div
            className="hero-animate-in"
            style={{
              animationDelay: '0.36s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              flexWrap: 'wrap',
              margin: '0 auto 26px',
              fontSize: '0.78rem',
              color: '#CBD5E1'
            }}
          >
            {[
              'Multi-Source Ingestion',
              'Semantic Clustering',
              'Neo4j Entity Graph',
              'Verifiable Provenance'
            ].map((badgeText, idx) => (
              <div
                key={badgeText}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 15px',
                  borderRadius: '999px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.09)',
                  cursor: 'default',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  backdropFilter: 'blur(8px)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = 'rgba(0, 40, 255, 0.65)';
                  e.currentTarget.style.background = 'rgba(0, 40, 255, 0.12)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 40, 255, 0.35)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.09)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '6px', height: '6px' }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#0028FF', boxShadow: '0 0 6px #0028FF' }} />
                </span>
                <span>{badgeText}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons with Breathing Pulse & Magnetic Arrow Glide */}
          <div
            className="hero-animate-in"
            style={{
              animationDelay: '0.44s',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: '28px'
            }}
          >
            <button
              onClick={onStartOnboarding}
              className="hero-cta-glow"
              style={{
                background: '#0028FF',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '999px',
                padding: '13px 32px',
                fontSize: '0.92rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.04)';
                const icon = e.currentTarget.querySelector('svg');
                if (icon) icon.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                const icon = e.currentTarget.querySelector('svg');
                if (icon) icon.style.transform = 'translateX(0)';
              }}
            >
              <span>Get started</span>
              <ArrowRight size={16} style={{ transition: 'transform 0.2s ease' }} />
            </button>

            <button
              onClick={() => onEnterApp('dashboard')}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                borderRadius: '999px',
                padding: '13px 28px',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.14)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                const icon = e.currentTarget.querySelector('svg');
                if (icon) icon.style.transform = 'translate(2px, -2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
                const icon = e.currentTarget.querySelector('svg');
                if (icon) icon.style.transform = 'translate(0, 0)';
              }}
            >
              <span>Launch Live OS</span>
              <ArrowUpRight size={15} style={{ transition: 'transform 0.2s ease' }} />
            </button>
          </div>

          {/* ============================================================
              CENTERPIECE: ANIMATED ASCII MATRIX CANVAS
              "only use this" - No toggles, full width, interactive 60 FPS
              ============================================================ */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1040px',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid rgba(0, 40, 255, 0.4)',
            boxShadow: '0 24px 80px rgba(0, 40, 255, 0.35), 0 0 1px 1px rgba(255, 255, 255, 0.1)'
          }}>
            <AnimatedAsciiCanvas width={980} height={460} density="fine" />

            {/* Floating Telemetry Chips on Artwork */}
            <div style={{
              position: 'absolute',
              bottom: '18px',
              left: '20px',
              right: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(5, 7, 13, 0.88)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '14px',
              padding: '10px 18px',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0028FF', boxShadow: '0 0 8px #0028FF' }} />
                <span style={{ fontSize: '0.78rem', color: '#FFFFFF', fontWeight: 600 }}>Active Cognitive Pipeline:</span>
                <span style={{ fontSize: '0.78rem', color: '#CBD5E1' }}>50 Ingested Signals → 11 Semantic Clusters</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                  Noise Rejection: <strong style={{ color: '#FFFFFF' }}>88%</strong>
                </span>
                <span style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                  Provenance: <strong style={{ color: '#0028FF' }}>100%</strong>
                </span>
                <button
                  onClick={() => onEnterApp('pipeline')}
                  style={{
                    background: '#0028FF',
                    border: 'none',
                    color: '#FFFFFF',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Inspect Telemetry ↗
                </button>
              </div>
            </div>
          </div>

          {/* ============================================================
              CONNECTED PIPELINE CONDUIT ("Everything Feels Connected")
              ============================================================ */}
          <div style={{
            marginTop: '40px',
            width: '100%',
            maxWidth: '1040px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '18px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            {[
              { num: '01', title: 'Raw Ingest', desc: '50 Signals (MCP/arXiv)', icon: <Radio size={14} color="#0028FF" /> },
              { num: '02', title: 'Knowledge Graph', desc: 'Neo4j Epistemic Topology', icon: <Network size={14} color="#0028FF" /> },
              { num: '03', title: 'Attention Shield', desc: 'Fatigue & Quiet Hours', icon: <Shield size={14} color="#0028FF" /> },
              { num: '04', title: 'Decisive Digest', desc: 'Personal Priorities', icon: <Layers size={14} color="#0028FF" /> }
            ].map((stage, idx) => (
              <React.Fragment key={idx}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'rgba(0, 40, 255, 0.15)',
                    border: '1px solid #0028FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {stage.icon}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#0028FF', fontFamily: 'JetBrains Mono', fontSize: '0.7rem' }}>{stage.num}</span>
                      <span>{stage.title}</span>
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#94A3B8' }}>{stage.desc}</div>
                  </div>
                </div>

                {idx < 3 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.6 }}>
                    <div style={{ width: '20px', height: '1px', background: '#0028FF' }} />
                    <span style={{ fontSize: '0.6rem', color: '#0028FF' }}>▶</span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          EDITORIAL VISUAL DATA GALLERY (Reference Image 3)
          UNIFIED INTO THE SINGLE LUXURY DARK OBSIDIAN + COBALT THEME
          ============================================================ */}
      <section id="editorial-analytics" style={{
        background: '#060913',
        color: '#FFFFFF',
        padding: '90px 32px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ marginBottom: '50px', borderBottom: '1px solid rgba(255, 255, 255, 0.12)', paddingBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: 800,
                  color: '#0028FF',
                  display: 'block',
                  marginBottom: '8px'
                }}>
                  EDITORIAL DATA VISUALIZATION // CATALOG 2026
                </span>
                <h2 style={{
                  fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  margin: 0,
                  color: '#FFFFFF'
                }}>
                  Cognitive Reception Architecture
                </h2>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.82rem', color: '#94A3B8', display: 'block' }}>
                  A visual taxonomy of attention, cluster density, and system entropy.
                </span>
                <span style={{ fontSize: '0.72rem', fontFamily: 'JetBrains Mono', color: '#0028FF' }}>
                  LAT. 27°59'N · LON. 86°55'E · ATLAS NO.252
                </span>
              </div>
            </div>
          </div>

          {/* ROW 1: Twelve features fanned out + What breaks stacked and ranked */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '28px', marginBottom: '28px' }}>
            {/* CARD 1: Twelve features, fanned out */}
            <div style={{
              background: '#0D111E',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              transition: 'border-color 0.25s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 6px', color: '#FFFFFF' }}>
                    Twelve features, fanned out
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: 0 }}>
                    one spoke per feature · big dot = launch week, sized by MAU today · small dots = every week since
                  </p>
                </div>
                {hoveredSpoke !== null && (
                  <div style={{
                    fontSize: '0.68rem',
                    fontFamily: 'JetBrains Mono',
                    color: '#0028FF',
                    background: 'rgba(0, 40, 255, 0.12)',
                    border: '1px solid rgba(0, 40, 255, 0.35)',
                    padding: '3px 10px',
                    borderRadius: '6px'
                  }}>
                    ● ACTIVE NODE INSPECTOR
                  </div>
                )}
              </div>

              {/* Radial Fan — angles -50° to +50°, origin left-center, length 115 — all nodes within 240px */}
              <div style={{ height: '240px', position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
                <svg viewBox="0 0 380 240" width="100%" height="100%">
                  {/* Sonar rings at origin */}
                  <circle cx="80" cy="120" r="5" fill="none" stroke="#0028FF" strokeWidth="1.5">
                    <animate attributeName="r" values="5;42" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.9;0" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="80" cy="120" r="5" fill="none" stroke="#60A5FA" strokeWidth="1">
                    <animate attributeName="r" values="5;42" begin="1.2s" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.75;0" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="80" cy="120" r="5" fill="#FFFFFF" style={{ filter: 'drop-shadow(0 0 10px #0028FF)' }}>
                    <animate attributeName="r" values="5;6.5;5" dur="1.8s" repeatCount="indefinite" />
                  </circle>

                  {/* 12 spokes, evenly from -50° to +50° (step ~9.1°) */}
                  {[
                    { angle: -50, label: 'Feed',   size: 10, dots: 7 },
                    { angle: -41, label: 'Graph',  size: 12, dots: 8 },
                    { angle: -32, label: 'MCP',    size: 8,  dots: 6 },
                    { angle: -23, label: 'Digest', size: 14, dots: 9 },
                    { angle: -14, label: 'Rules',  size: 7,  dots: 5 },
                    { angle:  -5, label: 'Audit',  size: 11, dots: 8 },
                    { angle:   5, label: 'Quiet',  size: 9,  dots: 6 },
                    { angle:  14, label: 'Ask',    size: 13, dots: 9 },
                    { angle:  23, label: 'Sync',   size: 8,  dots: 5 },
                    { angle:  32, label: 'Tokens', size: 6,  dots: 4 },
                    { angle:  41, label: 'Safety', size: 10, dots: 7 },
                    { angle:  50, label: 'Search', size: 11, dots: 8 }
                  ].map((spoke, idx) => {
                    const rad = (spoke.angle * Math.PI) / 180;
                    const len = 115;
                    const ox = 80, oy = 120;
                    const endX = ox + Math.cos(rad) * len;
                    const endY = oy + Math.sin(rad) * len;
                    const isHovered = hoveredSpoke === idx;
                    const isAnyHovered = hoveredSpoke !== null;
                    const speed = 1.6 + (idx % 4) * 0.35;

                    return (
                      <g key={idx}
                        style={{ cursor: 'pointer', opacity: isHovered ? 1 : isAnyHovered ? 0.28 : 1, transition: 'opacity 0.25s ease' }}
                        onMouseEnter={() => setHoveredSpoke(idx)}
                        onMouseLeave={() => setHoveredSpoke(null)}
                      >
                        {/* Spoke */}
                        <line x1={ox} y1={oy} x2={endX} y2={endY}
                          className="anim-spoke-line"
                          stroke={isHovered ? '#0028FF' : idx === 1 || idx === 3 ? 'rgba(0,40,255,0.5)' : 'rgba(255,255,255,0.22)'}
                          strokeWidth={isHovered ? '2.5' : '1.1'}
                          style={{ filter: isHovered ? 'drop-shadow(0 0 8px #0028FF)' : 'none', transition: 'all 0.2s' }}
                        />
                        {/* Photon packet */}
                        <circle r={isHovered ? 3 : 2} fill={isHovered ? '#FFFFFF' : '#60A5FA'}
                          style={{ filter: 'drop-shadow(0 0 6px #0028FF)' }}
                        >
                          <animate attributeName="cx" values={`${ox};${endX}`} dur={`${speed}s`} repeatCount="indefinite" />
                          <animate attributeName="cy" values={`${oy};${endY}`} dur={`${speed}s`} repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur={`${speed}s`} repeatCount="indefinite" />
                        </circle>
                        {/* Intermediate dots */}
                        {Array.from({ length: spoke.dots }).map((_, dIdx) => {
                          const d = 22 + (dIdx / spoke.dots) * (len - 28);
                          return (
                            <circle key={dIdx}
                              cx={ox + Math.cos(rad) * d} cy={oy + Math.sin(rad) * d}
                              r={isHovered ? 2.2 : 1.6}
                              fill={isHovered ? '#93C5FD' : '#475569'}
                              style={{ transition: 'fill 0.2s' }}
                            >
                              <animate attributeName="opacity" values="0.35;0.9;0.35" dur={`${2 + (dIdx % 3) * 0.4}s`} repeatCount="indefinite" />
                            </circle>
                          );
                        })}
                        {/* Halo ring */}
                        <circle cx={endX} cy={endY} fill="none"
                          stroke={isHovered ? '#0028FF' : '#60A5FA'} strokeWidth="1"
                        >
                          <animate attributeName="r" values={`${spoke.size/2+1};${spoke.size/2+5};${spoke.size/2+1}`} dur="2.4s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.2;0.75;0.2" dur="2.4s" repeatCount="indefinite" />
                        </circle>
                        {/* End node */}
                        <circle cx={endX} cy={endY}
                          r={isHovered ? spoke.size / 2 + 2 : spoke.size / 2}
                          fill={isHovered ? '#0028FF' : idx === 1 || idx === 3 ? '#0028FF' : '#FFFFFF'}
                          style={{ filter: isHovered ? 'drop-shadow(0 0 12px #0028FF)' : 'drop-shadow(0 0 5px rgba(0,40,255,0.5))', transition: 'all 0.2s' }}
                        />
                        {/* Label — always to the right of end node */}
                        <text
                          x={endX + 10}
                          y={endY}
                          fontSize="8"
                          fontWeight={isHovered ? '800' : '500'}
                          fill={isHovered ? '#FFFFFF' : '#94A3B8'}
                          fontFamily="Inter"
                          textAnchor="start"
                          dominantBaseline="middle"
                        >
                          {spoke.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8' }}>
                <span>LAUNCH FAN // MONO EDITORIAL</span>
                <span style={{ color: '#0028FF', fontWeight: 700 }}>
                  {hoveredSpoke !== null ? (
                    `MODE: ${hoveredSpoke + 1} // ACTIVE TELEMETRY INSPECTED`
                  ) : (
                    '12 COGNITIVE MODES · STREAMING SIGNALS'
                  )}
                </span>
              </div>
            </div>

            {/* CARD 2: What breaks, stacked and ranked */}
            <div style={{
              background: '#0D111E',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              transition: 'border-color 0.25s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 6px', color: '#FFFFFF' }}>
                    What breaks, stacked and ranked
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: 0 }}>
                    incidents by root cause · 2019-2026 · one dot = 2 incidents · sorted ascending
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.68rem',
                    fontFamily: 'JetBrains Mono',
                    color: '#60A5FA',
                    background: 'rgba(0, 40, 255, 0.12)',
                    border: '1px solid rgba(0, 40, 255, 0.35)',
                    padding: '3px 10px',
                    borderRadius: '6px'
                  }}>
                    <span className="anim-live-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0028FF', display: 'inline-block' }} />
                    <span>AUTO-RESOLVED</span>
                  </div>
                </div>
              </div>

              {/* Dot cascade — scaled counts so tallest bar (14 dots × 7px) + label fits 200px */}
              <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', overflow: 'hidden' }}>
                {[
                  { label: 'Latency',  count: 2,  num: 6  },
                  { label: 'Token',    count: 3,  num: 10 },
                  { label: 'Dupl.',    count: 4,  num: 14 },
                  { label: 'RSS 404',  count: 5,  num: 18 },
                  { label: 'Hallu.',   count: 6,  num: 22 },
                  { label: 'MCP',      count: 8,  num: 28 },
                  { label: 'Schema',   count: 10, num: 36 },
                  { label: 'Spam',     count: 12, num: 44 },
                  { label: 'Noise',    count: 14, num: 54 }
                ].map((stack, idx) => {
                  const isHovered = hoveredStack === idx;
                  const isPeak = idx === 8;

                  return (
                    <div key={idx}
                      onMouseEnter={() => setHoveredStack(idx)}
                      onMouseLeave={() => setHoveredStack(null)}
                      style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        gap: '2px', cursor: 'pointer', flexShrink: 0,
                        transform: isHovered ? 'translateY(-4px)' : 'none',
                        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    >
                      {/* Count */}
                      <span style={{
                        fontSize: '0.65rem', fontWeight: 800, lineHeight: 1, marginBottom: '3px',
                        color: isHovered || isPeak ? '#60A5FA' : '#CBD5E1',
                        textShadow: isHovered || isPeak ? '0 0 10px rgba(0,40,255,0.9)' : 'none',
                        animation: isPeak ? 'peakBeacon 2s ease-in-out infinite' : undefined,
                        transition: 'color 0.2s ease'
                      }}>
                        {stack.num}
                      </span>

                      {/* Dots — stacked bottom to top */}
                      <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '2px' }}>
                        {Array.from({ length: stack.count }).map((_, dIdx) => {
                          const isTop = dIdx === stack.count - 1;
                          const delay = ((idx * 0.18 + dIdx * 0.1) % 2.6).toFixed(2);
                          return (
                            <span key={dIdx} style={{
                              width: isHovered ? '7px' : '5px',
                              height: isHovered ? '7px' : '5px',
                              borderRadius: '50%',
                              background: isHovered ? '#0028FF' : isTop ? (isPeak ? '#0028FF' : '#FFFFFF') : '#334155',
                              boxShadow: isHovered || (isPeak && isTop) ? '0 0 8px #0028FF' : undefined,
                              animation: !isHovered && !isTop ? 'dotAscend 2.6s ease-in-out infinite'
                                : isTop && isPeak ? 'peakBeacon 1.8s ease-in-out infinite' : undefined,
                              animationDelay: `${delay}s`,
                              transition: 'all 0.2s ease'
                            }} />
                          );
                        })}
                      </div>

                      {/* Rotated label */}
                      <span style={{
                        fontSize: '0.58rem',
                        color: isHovered ? '#FFFFFF' : '#64748B',
                        fontWeight: isHovered ? 700 : 400,
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                        marginTop: '5px',
                        maxHeight: '40px',
                        overflow: 'hidden',
                        transition: 'color 0.2s ease'
                      }}>
                        {stack.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8' }}>
                <span>DOT CASCADE // MONO EDITORIAL</span>
                <span style={{ color: '#0028FF', fontWeight: 700 }}>
                  {hoveredStack !== null ? `RESOLVED: ${hoveredStack + 1}/9 STACKS` : 'RESOLVED BY INFOLENS AUTOMATION'}
                </span>
              </div>
            </div>
          </div>

          {/* ROW 2: Ninety days as a barcode */}
          <div style={{
            background: '#0D111E',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
            marginBottom: '28px',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 6px', color: '#FFFFFF' }}>
                  Ninety days as a barcode
                </h3>
                <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: 0, maxWidth: '640px' }}>
                  Every hairline is a day, whether or not anything happened in it. The dot marks the day's peak; the stem below it is just gravity. Read the field, not the numbers — the season has a texture before it has a value.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.72rem', color: '#94A3B8' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFFFFF' }} />
                  WEEKDAY PEAK
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#475569' }} />
                  WEEKEND PEAK
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0028FF', boxShadow: '0 0 8px #0028FF' }} />
                  TOP-3, LABELED
                </span>
              </div>
            </div>

            {/* Interactive Telemetry Scrubber Readout Badge */}
            {scrubbedDay !== null && barcodeDays[scrubbedDay] && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                borderRadius: '6px',
                background: 'rgba(0, 40, 255, 0.14)',
                border: '1px solid rgba(0, 40, 255, 0.4)',
                fontFamily: 'JetBrains Mono',
                fontSize: '0.72rem',
                color: '#CBD5E1',
                marginBottom: '8px'
              }}>
                <span style={{ color: '#0028FF', fontWeight: 800 }}>DAY {barcodeDays[scrubbedDay].day}</span>
                <span>//</span>
                <span>{barcodeDays[scrubbedDay].isPeak ? `SURGE ANOMALY: ${barcodeDays[scrubbedDay].label}` : `${Math.round(barcodeDays[scrubbedDay].height * 2.8)}k INGESTED SIGNALS`}</span>
                <span>//</span>
                <span style={{ color: barcodeDays[scrubbedDay].isWeekend ? '#94A3B8' : '#60A5FA' }}>
                  {barcodeDays[scrubbedDay].isWeekend ? 'WEEKEND PASSIVE' : 'ACTIVE INGESTION STREAM'}
                </span>
              </div>
            )}

            {/* Barcode Lollipop SVG with Oscilloscope Scanning Beam & Interactive Scrubbing */}
            <div
              style={{ height: '150px', width: '100%', position: 'relative', marginTop: '10px', cursor: 'crosshair' }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
                const dayIdx = Math.min(89, Math.max(0, Math.floor(ratio * 90)));
                setScrubbedDay(dayIdx);
              }}
              onMouseLeave={() => setScrubbedDay(null)}
            >
              <svg viewBox="0 0 900 140" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                {/* Continuous Oscilloscope Scanning Beam with Glow & Emitter Heads */}
                <g pointerEvents="none">
                  {/* Laser Aura Glow */}
                  <line y1="8" y2="122" stroke="rgba(0, 40, 255, 0.25)" strokeWidth="16">
                    <animate attributeName="x1" values="10;890;10" dur="7.5s" repeatCount="indefinite" />
                    <animate attributeName="x2" values="10;890;10" dur="7.5s" repeatCount="indefinite" />
                  </line>
                  {/* Crisp Electric Core Laser */}
                  <line y1="10" y2="120" stroke="#0028FF" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 12px #60A5FA)' }}>
                    <animate attributeName="x1" values="10;890;10" dur="7.5s" repeatCount="indefinite" />
                    <animate attributeName="x2" values="10;890;10" dur="7.5s" repeatCount="indefinite" />
                  </line>
                  {/* Top Emitter Bead */}
                  <circle r="4.5" fill="#FFFFFF" stroke="#0028FF" strokeWidth="2" cy="10" style={{ filter: 'drop-shadow(0 0 10px #0028FF)' }}>
                    <animate attributeName="cx" values="10;890;10" dur="7.5s" repeatCount="indefinite" />
                  </circle>
                  {/* Bottom Emitter Bead */}
                  <circle r="4.5" fill="#FFFFFF" stroke="#0028FF" strokeWidth="2" cy="120" style={{ filter: 'drop-shadow(0 0 10px #0028FF)' }}>
                    <animate attributeName="cx" values="10;890;10" dur="7.5s" repeatCount="indefinite" />
                  </circle>
                </g>

                {barcodeDays.map((bar, idx) => {
                  const x = 10 + (idx * 9.8);
                  const y = 120 - bar.height;
                  const isScrubbed = scrubbedDay === idx;

                  return (
                    <g key={idx}>
                      {/* Stem with subtle wave shimmer */}
                      <line
                        x1={x}
                        y1={120}
                        x2={x}
                        y2={y}
                        stroke={isScrubbed ? '#0028FF' : bar.isWeekend ? '#334155' : 'rgba(255, 255, 255, 0.3)'}
                        strokeWidth={isScrubbed ? '2.5' : '1'}
                        style={{
                          animation: !isScrubbed ? 'barcodeWave 4s ease-in-out infinite' : undefined,
                          animationDelay: `${(idx * 0.05) % 4}s`,
                          transition: 'stroke 0.15s ease'
                        }}
                      />

                      {/* Expanding Beacon Ring on Top 3 Surge Peaks */}
                      {bar.isPeak && (
                        <circle
                          cx={x}
                          cy={y}
                          r="3.5"
                          fill="none"
                          stroke="#0028FF"
                          strokeWidth="1.5"
                        >
                          <animate attributeName="r" values="3.5;14;3.5" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.9;0;0.9" dur="2s" repeatCount="indefinite" />
                        </circle>
                      )}

                      {/* Peak Circle */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isScrubbed ? 5.5 : bar.isPeak ? 3.8 : 2}
                        fill={isScrubbed ? '#0028FF' : bar.isPeak ? '#0028FF' : bar.isWeekend ? '#475569' : '#FFFFFF'}
                        style={{
                          filter: isScrubbed || bar.isPeak ? 'drop-shadow(0 0 10px #0028FF)' : 'none',
                          transition: 'all 0.15s ease'
                        }}
                      />

                      {/* Surge Label */}
                      {bar.label && (
                        <g>
                          <text
                            x={x}
                            y={y - 12}
                            fontSize="10"
                            fontWeight="800"
                            fill="#FFFFFF"
                            fontFamily="JetBrains Mono"
                            textAnchor="middle"
                            style={{ filter: 'drop-shadow(0 0 8px #0028FF)' }}
                          >
                            {bar.label}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}

                <line x1="10" y1="120" x2="890" y2="120" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
                <text x="180" y="138" fontSize="10" fill="#64748B" fontFamily="Inter" textAnchor="middle">APR</text>
                <text x="450" y="138" fontSize="10" fill="#64748B" fontFamily="Inter" textAnchor="middle">MAY</text>
                <text x="730" y="138" fontSize="10" fill="#64748B" fontFamily="Inter" textAnchor="middle">JUN</text>
              </svg>
            </div>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8' }}>
              <span>BARCODE LOLLIPOP // MONO EDITORIAL</span>
              <span style={{ color: '#0028FF', fontWeight: 700 }}>
                {scrubbedDay !== null ? `SCRUBBING ACTIVE // DAY ${scrubbedDay + 1}` : 'ATTENTION TELEMETRY ARCHIVE · 90-DAY DUAL LASER SWEEP'}
              </span>
            </div>
          </div>

          {/* ROW 3: Daily active range + How releases made us feel */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '28px', marginBottom: '28px' }}>
            {/* Daily active range with Floating Buoyant Capsules */}
            <div style={{
              background: '#0D111E',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 6px', color: '#FFFFFF' }}>
                    Daily active range
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: 0 }}>
                    min - max concurrent signals · 1-14 Feb
                  </p>
                </div>
                {hoveredCapsule !== null ? (
                  <div style={{
                    fontSize: '0.68rem',
                    fontFamily: 'JetBrains Mono',
                    color: '#0028FF',
                    background: 'rgba(0, 40, 255, 0.12)',
                    border: '1px solid rgba(0, 40, 255, 0.35)',
                    padding: '3px 10px',
                    borderRadius: '6px'
                  }}>
                    ● THROUGHPUT INSPECTION
                  </div>
                ) : (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.68rem',
                    fontFamily: 'JetBrains Mono',
                    color: '#60A5FA',
                    background: 'rgba(0, 40, 255, 0.1)',
                    border: '1px solid rgba(0, 40, 255, 0.3)',
                    padding: '3px 10px',
                    borderRadius: '6px'
                  }}>
                    <span className="anim-live-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0028FF', display: 'inline-block' }} />
                    <span>PEAK: 85k SIGNALS/S</span>
                  </div>
                )}
              </div>

              <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', position: 'relative' }}>
                {/* Horizontal Baseline Indicator */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: '110px',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(0, 40, 255, 0.3), transparent)',
                  pointerEvents: 'none'
                }} />

                {[
                  { day: '1 FEB', top: 85, height: 40 },
                  { day: '2 FEB', top: 65, height: 50 },
                  { day: '3 FEB', top: 80, height: 60 },
                  { day: '4 FEB', top: 95, height: 45 },
                  { day: '5 FEB', top: 75, height: 35 },
                  { day: '6 FEB', top: 105, height: 25 },
                  { day: '7 FEB', top: 70, height: 55 },
                  { day: '8 FEB', top: 55, height: 70 },
                  { day: '9 FEB', top: 35, height: 85 },
                  { day: '10 FEB', top: 60, height: 50 },
                  { day: '11 FEB', top: 50, height: 75 },
                  { day: '12 FEB', top: 65, height: 40 },
                  { day: '13 FEB', top: 75, height: 60 },
                  { day: '14 FEB', top: 70, height: 45 }
                ].map((range, idx) => {
                  const isHovered = hoveredCapsule === idx;
                  const isPeak = idx === 8;

                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredCapsule(idx)}
                      onMouseLeave={() => setHoveredCapsule(null)}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', position: 'relative', cursor: 'pointer' }}
                    >
                      <div
                        className="anim-capsule-float"
                        style={{
                          animationDelay: `${idx * 0.16}s`,
                          position: 'absolute',
                          top: `${range.top}px`,
                          width: isHovered ? '12px' : isPeak ? '9px' : '8px',
                          height: `${range.height}px`,
                          borderRadius: '999px',
                          background: isHovered
                            ? '#0028FF'
                            : isPeak
                            ? 'linear-gradient(180deg, #60A5FA 0%, #0028FF 100%)'
                            : 'linear-gradient(180deg, #FFFFFF 0%, #64748B 100%)',
                          boxShadow: isHovered || isPeak ? '0 0 16px #0028FF' : '0 0 4px rgba(255,255,255,0.2)',
                          transition: 'width 0.2s ease, background 0.2s ease, box-shadow 0.2s ease'
                        }}
                      >
                        {/* Glowing core bead inside capsule */}
                        <div
                          style={{
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: '#FFFFFF',
                            margin: '3px auto 0',
                            filter: 'drop-shadow(0 0 4px #0028FF)',
                            opacity: isHovered || isPeak ? 1 : 0.6
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8' }}>
                <span>RANGE CAPSULES // MONO DEMO</span>
                <span style={{ color: '#0028FF', fontWeight: 700 }}>
                  {hoveredCapsule !== null ? `CAPSULE ${hoveredCapsule + 1} ACTIVE` : '14-DAY BUOYANT TELEMETRY'}
                </span>
              </div>
            </div>

            {/* How releases made us feel (Radial Petal Sentiment Diagram with Breathing Animation & Orbiting Satellite) */}
            <div style={{
              background: '#0D111E',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 6px', color: '#FFFFFF' }}>
                    How releases made us feel
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: 0 }}>
                    reactions tagged in retro · H1 2026
                  </p>
                </div>
                {hoveredPetal !== null ? (
                  <div style={{
                    fontSize: '0.68rem',
                    fontFamily: 'JetBrains Mono',
                    color: '#0028FF',
                    background: 'rgba(0, 40, 255, 0.12)',
                    border: '1px solid rgba(0, 40, 255, 0.35)',
                    padding: '3px 10px',
                    borderRadius: '6px'
                  }}>
                    ● SENTIMENT PULSE
                  </div>
                ) : (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.68rem',
                    fontFamily: 'JetBrains Mono',
                    color: '#60A5FA',
                    background: 'rgba(0, 40, 255, 0.1)',
                    border: '1px solid rgba(0, 40, 255, 0.3)',
                    padding: '3px 10px',
                    borderRadius: '6px'
                  }}>
                    <span className="anim-live-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0028FF', display: 'inline-block' }} />
                    <span>94% POSITIVE VELOCITY</span>
                  </div>
                )}
              </div>

              <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <svg viewBox="0 0 300 220" style={{ width: '100%', height: '100%' }}>
                  <g transform="translate(150, 110)">
                    {/* Concentric expanding sentiment ripple rings */}
                    <circle cx="0" cy="0" r="8" fill="none" stroke="#0028FF" strokeWidth="1.5">
                      <animate attributeName="r" values="8;38;8" dur="3.2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0.1;0.8" dur="3.2s" repeatCount="indefinite" />
                    </circle>

                    {/* Orbiting Satellite Particle circling around the sentiment petals */}
                    <g style={{ animation: 'orbitalRotate 11s linear infinite', transformOrigin: '0 0' }}>
                      <circle cx="68" cy="0" r="3" fill="#60A5FA" style={{ filter: 'drop-shadow(0 0 8px #0028FF)' }} />
                    </g>

                    {[
                      { angle: 0, label: 'Awe', val: 10, fill: '#E2E8F0' },
                      { angle: 45, label: 'Admiration', val: 5, fill: '#94A3B8' },
                      { angle: 90, label: 'Surprise', val: 12, fill: '#CBD5E1' },
                      { angle: 135, label: 'Sadness', val: 1, fill: '#334155' },
                      { angle: 180, label: 'Fear', val: 4, fill: '#1E293B' },
                      { angle: 225, label: 'Anger', val: 2, fill: '#0F172A' },
                      { angle: 270, label: 'Anticipation', val: 5, fill: '#64748B' },
                      { angle: 315, label: 'Happiness', val: 12, fill: '#0028FF' }
                    ].map((petal, idx) => {
                      const rad = (petal.angle * Math.PI) / 180;
                      const petalDist = 55;
                      const cx = Math.cos(rad) * petalDist;
                      const cy = Math.sin(rad) * petalDist;
                      const isHovered = hoveredPetal === idx;
                      const r = (10 + (petal.val * 1.2)) * (isHovered ? 1.12 : 1);
                      const isHappiness = idx === 7;

                      return (
                        <g
                          key={idx}
                          className="anim-petal-pulse"
                          style={{
                            cursor: 'pointer',
                            animationDelay: `${idx * 0.25}s`,
                            transition: 'transform 0.2s ease'
                          }}
                          onMouseEnter={() => setHoveredPetal(idx)}
                          onMouseLeave={() => setHoveredPetal(null)}
                        >
                          {/* Expanding beacon ring on Happiness petal */}
                          {isHappiness && (
                            <circle
                              cx={cx}
                              cy={cy}
                              r={r}
                              fill="none"
                              stroke="#0028FF"
                              strokeWidth="1.5"
                            >
                              <animate attributeName="r" values={`${r};${r + 10};${r}`} dur="2.2s" repeatCount="indefinite" />
                              <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2.2s" repeatCount="indefinite" />
                            </circle>
                          )}

                          <circle
                            cx={cx}
                            cy={cy}
                            r={r}
                            fill={petal.fill}
                            opacity={isHovered ? 1 : 0.9}
                            style={{
                              filter: isHovered || isHappiness ? 'drop-shadow(0 0 12px #0028FF)' : 'none',
                              stroke: isHovered ? '#0028FF' : isHappiness ? '#60A5FA' : 'none',
                              strokeWidth: isHovered ? 2 : isHappiness ? 1 : 0,
                              transition: 'all 0.2s ease'
                            }}
                          />
                          <text
                            x={cx}
                            y={cy - 2}
                            fontSize={isHovered ? '11' : '10'}
                            fontWeight="800"
                            fill={petal.fill === '#0028FF' ? '#FFFFFF' : '#05070D'}
                            fontFamily="Inter"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                          >
                            {petal.val}
                          </text>
                          <text
                            x={cx}
                            y={cy + 8}
                            fontSize={isHovered ? '7' : '6'}
                            fontWeight={isHovered ? '700' : '400'}
                            fill={petal.fill === '#0028FF' ? '#FFFFFF' : '#05070D'}
                            fontFamily="Inter"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                          >
                            {petal.label}
                          </text>
                        </g>
                      );
                    })}
                    <circle cx="0" cy="0" r="14" fill="#0D111E" style={{ filter: 'drop-shadow(0 0 6px #0028FF)' }} />
                    <circle cx="0" cy="0" r="5" fill="#FFFFFF" style={{ filter: 'drop-shadow(0 0 8px #0028FF)' }}>
                      <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
                    </circle>
                  </g>
                </svg>
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8' }}>
                <span>PETAL ROSE // MONO DEMO</span>
                <span style={{ color: '#0028FF', fontWeight: 700 }}>
                  {hoveredPetal !== null ? `SENTIMENT: ${hoveredPetal + 1}/8` : 'TEAM RETRO BOARD · ORBITING TELEMETRY'}
                </span>
              </div>
            </div>
          </div>

          {/* ROW 4: Attention capacity + Where intelligence comes from */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '28px' }}>
            {/* CARD: Attention capacity by tier — Animated fill bars with hover lift + PRO particle stream */}
            <div style={{
              background: '#0D111E',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Background grid lines */}
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', borderRadius: '20px' }}>
                {[25, 50, 75].map((pct) => (
                  <div key={pct} style={{
                    position: 'absolute',
                    bottom: `${68 + pct * 1.12}px`,
                    left: '32px',
                    right: '32px',
                    height: '1px',
                    background: 'rgba(255, 255, 255, 0.04)'
                  }} />
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 6px', color: '#FFFFFF' }}>
                    Attention capacity by tier
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: 0 }}>
                    Q2 2026 · personal intelligence bandwidth
                  </p>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  fontSize: '0.68rem', fontFamily: 'JetBrains Mono', color: '#60A5FA',
                  background: 'rgba(0, 40, 255, 0.10)',
                  border: '1px solid rgba(0, 40, 255, 0.3)',
                  padding: '3px 10px', borderRadius: '6px'
                }}>
                  <span className="anim-live-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0028FF', display: 'inline-block' }} />
                  <span>LIVE BANDWIDTH</span>
                </div>
              </div>

              <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', position: 'relative', overflow: 'hidden' }}>
                {[
                  { label: 'STARTER', val: '$182K', pct: 50, fill: '#475569', isHero: false },
                  { label: 'PRO', val: '$486K', pct: 100, fill: '#0028FF', isHero: true },
                  { label: 'TEAM', val: '$391K', pct: 78, fill: '#64748B', isHero: false },
                  { label: 'ENT', val: '$274K', pct: 59, fill: '#94A3B8', isHero: false }
                ].map((bar, idx) => {
                  const isHovered = hoveredStack === idx + 20;
                  return (
                    <div
                      key={idx}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                      onMouseEnter={() => setHoveredStack(idx + 20)}
                      onMouseLeave={() => setHoveredStack(null)}
                    >
                      {/* Value label */}
                      <span style={{
                        fontSize: '0.82rem', fontWeight: 800,
                        color: isHovered || bar.isHero ? '#FFFFFF' : '#94A3B8',
                        fontFamily: 'JetBrains Mono',
                        textShadow: isHovered || bar.isHero ? '0 0 10px rgba(0, 40, 255, 0.8)' : 'none',
                        transition: 'all 0.2s ease'
                      }}>
                        {bar.val}
                      </span>

                      {/* Bar column */}
                      <div style={{
                        width: isHovered ? '56px' : bar.isHero ? '52px' : '48px',
                        height: `${bar.pct * 1.1}px`,
                        borderRadius: '12px 12px 4px 4px',
                        background: isHovered
                          ? '#0028FF'
                          : bar.isHero
                          ? 'linear-gradient(180deg, #60A5FA 0%, #0028FF 60%, #001AFF 100%)'
                          : `linear-gradient(180deg, ${bar.fill}CC 0%, ${bar.fill} 100%)`,
                        boxShadow: isHovered || bar.isHero
                          ? '0 0 24px rgba(0, 40, 255, 0.6), inset 0 1px 0 rgba(255,255,255,0.2)'
                          : 'inset 0 1px 0 rgba(255,255,255,0.08)',
                        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        {/* Shimmer scan line going up the bar */}
                        <div style={{
                          position: 'absolute',
                          left: 0, right: 0,
                          height: '2px',
                          background: 'rgba(255, 255, 255, 0.5)',
                          animation: bar.isHero || isHovered ? 'barScanUp 1.8s linear infinite' : undefined,
                          borderRadius: '1px'
                        }} />

                        {/* PRO bar: rising particle stream */}
                        {bar.isHero && [
                          { left: '20%', delay: '0s', dur: '1.4s' },
                          { left: '50%', delay: '0.5s', dur: '1.8s' },
                          { left: '78%', delay: '0.9s', dur: '1.2s' }
                        ].map((p, pi) => (
                          <div
                            key={pi}
                            style={{
                              position: 'absolute',
                              bottom: '-4px',
                              left: p.left,
                              width: '3px',
                              height: '3px',
                              borderRadius: '50%',
                              background: '#FFFFFF',
                              boxShadow: '0 0 6px #60A5FA',
                              animation: `particleRise ${p.dur} ease-out infinite`,
                              animationDelay: p.delay,
                              opacity: 0
                            }}
                          />
                        ))}
                      </div>

                      {/* Tier label */}
                      <span style={{
                        fontSize: '0.62rem',
                        color: isHovered || bar.isHero ? '#0028FF' : '#64748B',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        fontFamily: 'JetBrains Mono',
                        transition: 'color 0.2s ease'
                      }}>
                        {bar.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8' }}>
                <span>CAPACITY TIERS // MONO EDITORIAL</span>
                <span style={{ color: '#0028FF', fontWeight: 700 }}>Q2 2026 · INTELLIGENCE BANDWIDTH</span>
              </div>
            </div>

            {/* CARD: Where intelligence comes from — Animated dot matrix with scan wave + hover source highlight */}
            <div style={{
              background: '#0D111E',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 6px', color: '#FFFFFF' }}>
                    Where intelligence comes from
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: 0 }}>
                    Q2 2026 · every dot = 1% of raw ingested signals
                  </p>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  fontSize: '0.68rem', fontFamily: 'JetBrains Mono',
                  color: hoveredStack !== null && hoveredStack < 20 ? '#0028FF' : '#60A5FA',
                  background: 'rgba(0, 40, 255, 0.10)',
                  border: '1px solid rgba(0, 40, 255, 0.3)',
                  padding: '3px 10px', borderRadius: '6px'
                }}>
                  <span className="anim-live-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0028FF', display: 'inline-block' }} />
                  <span>{hoveredStack !== null && hoveredStack < 20 ? `SOURCE ${hoveredStack + 1} INSPECTED` : '100 SIGNAL PROVENANCE'}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
                {/* Animated dot matrix */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(10, 1fr)',
                  gap: '5px',
                  flexShrink: 0
                }}>
                  {Array.from({ length: 100 }).map((_, idx) => {
                    // Source group assignment
                    let srcIdx = 0;
                    if (idx >= 34 && idx < 61) srcIdx = 1;
                    else if (idx >= 61 && idx < 79) srcIdx = 2;
                    else if (idx >= 79 && idx < 91) srcIdx = 3;
                    else if (idx >= 91) srcIdx = 4;

                    const colors = ['#E2E8F0', '#64748B', '#0028FF', '#334155', '#1E293B'];
                    const baseColor = colors[srcIdx];
                    const isSourceHovered = hoveredStack === srcIdx;
                    const delay = ((idx * 0.04) % 2.4).toFixed(2);

                    return (
                      <span
                        key={idx}
                        onMouseEnter={() => setHoveredStack(srcIdx)}
                        onMouseLeave={() => setHoveredStack(null)}
                        style={{
                          width: '11px',
                          height: '11px',
                          borderRadius: '50%',
                          background: isSourceHovered ? '#0028FF' : baseColor,
                          boxShadow: isSourceHovered ? '0 0 8px #0028FF' : 'none',
                          cursor: 'pointer',
                          animation: srcIdx === 2 ? `peakBeacon 2s ease-in-out infinite` : `dotGlimmer 3s ease-in-out infinite`,
                          animationDelay: `${delay}s`,
                          transition: 'background 0.2s ease, box-shadow 0.2s ease'
                        }}
                      />
                    );
                  })}
                </div>

                {/* Source legend with animated progress bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                  {[
                    { label: 'HackerNews & Feeds', pct: 34, color: '#E2E8F0' },
                    { label: 'arXiv Preprints', pct: 27, color: '#64748B' },
                    { label: 'Mentors & WhatsApp', pct: 18, color: '#0028FF' },
                    { label: 'GitHub MCP Repos', pct: 12, color: '#475569' },
                    { label: 'Security Advisories', pct: 9, color: '#334155' }
                  ].map((src, idx) => {
                    const isHov = hoveredStack === idx;
                    return (
                      <div
                        key={idx}
                        onMouseEnter={() => setHoveredStack(idx)}
                        onMouseLeave={() => setHoveredStack(null)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{
                            width: '7px', height: '7px', borderRadius: '50%',
                            background: isHov ? '#0028FF' : src.color,
                            boxShadow: isHov ? '0 0 8px #0028FF' : 'none',
                            flexShrink: 0,
                            transition: 'all 0.2s ease'
                          }} />
                          <span style={{
                            fontSize: '0.73rem', fontWeight: isHov ? 700 : 600,
                            color: isHov ? '#FFFFFF' : '#CBD5E1',
                            flex: 1,
                            transition: 'color 0.2s ease'
                          }}>{src.label}</span>
                          <span style={{
                            fontSize: '0.72rem', color: isHov ? '#0028FF' : '#94A3B8',
                            fontFamily: 'JetBrains Mono', fontWeight: 700,
                            transition: 'color 0.2s ease'
                          }}>{src.pct}%</span>
                        </div>
                        {/* Animated progress track */}
                        <div style={{
                          height: '3px',
                          background: 'rgba(255,255,255,0.08)',
                          borderRadius: '2px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            height: '100%',
                            width: `${src.pct * 2.94}%`,
                            background: isHov
                              ? 'linear-gradient(90deg, #0028FF, #60A5FA)'
                              : src.color === '#0028FF'
                              ? 'linear-gradient(90deg, #0028FF, #60A5FA)'
                              : src.color,
                            borderRadius: '2px',
                            boxShadow: isHov ? '0 0 6px #0028FF' : 'none',
                            animation: 'progressFill 1.4s ease-out both',
                            animationDelay: `${idx * 0.12}s`,
                            transition: 'background 0.2s ease'
                          }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px', marginTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8' }}>
                <span>DOT MATRIX // 100 PROVENANCE PERCENTILES</span>
                <span style={{ color: '#0028FF', fontWeight: 700 }}>ATTRIBUTION · HOVER TO FILTER</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          HOW IT WORKS: 3-STAGE INTELLIGENCE LIFECYCLE
          ============================================================ */}
      <section style={{
        background: '#04060A',
        color: '#FFFFFF',
        padding: '100px 32px',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle animated background grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(0,40,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,40,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          animation: 'gridDrift 18s linear infinite'
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span style={{
            fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase',
            fontWeight: 800, color: '#0028FF', display: 'block', marginBottom: '12px',
            fontFamily: 'JetBrains Mono'
          }}>
            THE 3-STAGE INTELLIGENCE LIFECYCLE
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 16px' }}>
            From Chaotic Noise to{' '}
            <span style={{ color: '#0028FF', textShadow: '0 0 40px rgba(0,40,255,0.5)' }}>Decisive Focus</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#94A3B8', maxWidth: '600px', margin: '0 auto 64px', lineHeight: 1.65 }}>
            InfoLens replaces endless scrolling feeds with personalized cognitive triage. Here is how your intelligence operating system operates:
          </p>

          {/* Step cards + connectors */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '0', textAlign: 'left', position: 'relative' }}>

            {[
              {
                step: 1,
                title: 'Identity Calibration',
                body: 'Define your active archetype (Student Hacker, AI Researcher, Tech Founder). Set mathematical interest weights and track specific individuals or organizations.',
                cta: 'Dynamic Vector Calibration',
                accent: '#0028FF',
                icon: (
                  <svg viewBox="0 0 60 60" width="60" height="60">
                    {/* Concentric calibration rings */}
                    <circle cx="30" cy="30" r="26" fill="none" stroke="rgba(0,40,255,0.18)" strokeWidth="1" />
                    <circle cx="30" cy="30" r="18" fill="none" stroke="rgba(0,40,255,0.28)" strokeWidth="1" />
                    <circle cx="30" cy="30" r="10" fill="none" stroke="#0028FF" strokeWidth="1.2" />
                    {/* Rotating cursor */}
                    <g style={{ animation: 'orbitalRotate 4s linear infinite', transformOrigin: '30px 30px' }}>
                      <circle cx="30" cy="4" r="3" fill="#0028FF" />
                    </g>
                    {/* Cross-hair */}
                    <line x1="30" y1="20" x2="30" y2="24" stroke="#0028FF" strokeWidth="1.5" />
                    <line x1="30" y1="36" x2="30" y2="40" stroke="#0028FF" strokeWidth="1.5" />
                    <line x1="20" y1="30" x2="24" y2="30" stroke="#0028FF" strokeWidth="1.5" />
                    <line x1="36" y1="30" x2="40" y2="30" stroke="#0028FF" strokeWidth="1.5" />
                    <circle cx="30" cy="30" r="3" fill="#FFFFFF">
                      <animate attributeName="r" values="2.5;4;2.5" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                )
              },
              {
                step: 2,
                title: 'Graph Synthesis & Ingest',
                body: 'Raw signals from Slack, arXiv, GitHub, and email flow into a 10-stage pipeline: deduplication, entity extraction, cluster formation, and Neo4j edge construction.',
                cta: '100% Provenance Preservation',
                accent: '#0028FF',
                icon: (
                  <svg viewBox="0 0 60 60" width="60" height="60">
                    {/* Node graph */}
                    <circle cx="30" cy="30" r="5" fill="#0028FF"><animate attributeName="r" values="4;6;4" dur="2.4s" repeatCount="indefinite" /></circle>
                    {[{a:300, r:20},{a:180, r:20},{a:60, r:20},{a:0, r:20}].map(({a,r},i)=>{
                      const rad = a*Math.PI/180;
                      const nx = 30+Math.cos(rad)*r, ny=30+Math.sin(rad)*r;
                      return <g key={i}>
                        <line x1="30" y1="30" x2={nx} y2={ny} stroke="rgba(0,40,255,0.4)" strokeWidth="1"/>
                        <circle cx={nx} cy={ny} r="3.5" fill="#60A5FA"><animate attributeName="opacity" values="0.5;1;0.5" dur={`${1.4+i*0.3}s`} repeatCount="indefinite"/></circle>
                      </g>;
                    })}
                    {/* Data packet */}
                    <circle r="2" fill="#FFFFFF" style={{filter:'drop-shadow(0 0 4px #0028FF)'}}>
                      <animateMotion dur="2.2s" repeatCount="indefinite" path="M30,30 L50,30 L30,30" />
                    </circle>
                  </svg>
                )
              },
              {
                step: 3,
                title: 'Decisive Attention OS',
                body: 'TimeSpot chronometers track your deadline horizons. Clusters are scored mathematically against your preferences. Non-urgent noise is silently batched for quiet hours.',
                cta: 'Zero Fatigue Digest',
                accent: '#0028FF',
                icon: (
                  <svg viewBox="0 0 60 60" width="60" height="60">
                    {/* Attention bars */}
                    {[{h:40,x:8},{h:28,x:18},{h:48,x:28},{h:20,x:38},{h:36,x:48}].map(({h,x},i)=>(
                      <rect key={i} x={x} y={60-h-6} width="7" height={h} rx="3"
                        fill={i===2?'#0028FF':'#334155'}
                        style={{filter:i===2?'drop-shadow(0 0 6px #0028FF)':'none'}}>
                        <animate attributeName="height" values={`${h};${h*1.15};${h}`} dur={`${1.8+i*0.25}s`} repeatCount="indefinite"/>
                        <animate attributeName="y" values={`${60-h-6};${60-h*1.15-6};${60-h-6}`} dur={`${1.8+i*0.25}s`} repeatCount="indefinite"/>
                      </rect>
                    ))}
                    {/* Focus dot at peak */}
                    <circle cx="31.5" cy="11" r="3" fill="#FFFFFF" style={{filter:'drop-shadow(0 0 6px #0028FF)'}}>
                      <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                )
              }
            ].map((card, idx) => (
              <div key={idx} style={{ position: 'relative', padding: '0 16px' }}>

                {/* Connector line + animated data dot between cards */}
                {idx < 2 && (
                  <div style={{
                    position: 'absolute', top: '52px', right: '-4px', zIndex: 10,
                    display: 'flex', alignItems: 'center'
                  }}>
                    <div style={{ width: '32px', height: '1px', background: 'linear-gradient(90deg, rgba(0,40,255,0.4), rgba(0,40,255,0.8))' }} />
                    <span style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: '#0028FF', boxShadow: '0 0 8px #0028FF',
                      animation: 'peakBeacon 1.4s ease-in-out infinite',
                      animationDelay: `${idx * 0.4}s`
                    }} />
                  </div>
                )}

                <div
                  style={{
                    background: '#0D111E',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '20px',
                    padding: '32px',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border-color 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease',
                    cursor: 'default'
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,40,255,0.55)';
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 60px rgba(0,40,255,0.18)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)';
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                  }}
                >
                  {/* Radial glow in corner */}
                  <div style={{
                    position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px',
                    background: 'radial-gradient(circle, rgba(0,40,255,0.12) 0%, transparent 70%)',
                    pointerEvents: 'none'
                  }} />

                  {/* Step badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                    <div style={{ position: 'relative', width: '44px', height: '44px', flexShrink: 0 }}>
                      {/* Sonar ring behind badge */}
                      <div style={{
                        position: 'absolute', inset: '-6px', borderRadius: '50%',
                        border: '1px solid rgba(0,40,255,0.35)',
                        animation: 'peakBeacon 2.4s ease-in-out infinite',
                        animationDelay: `${idx * 0.5}s`
                      }} />
                      <div style={{
                        width: '44px', height: '44px', borderRadius: '12px',
                        background: 'linear-gradient(135deg, #0028FF 0%, #3B5BFA 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#FFFFFF', fontWeight: 900, fontSize: '1.2rem',
                        boxShadow: '0 0 16px rgba(0,40,255,0.5)',
                        fontFamily: 'JetBrains Mono'
                      }}>
                        {card.step}
                      </div>
                    </div>
                    {/* Mini icon SVG */}
                    <div style={{ opacity: 0.9 }}>{card.icon}</div>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '10px', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: '0.83rem', color: '#94A3B8', lineHeight: 1.65, marginBottom: '20px' }}>
                    {card.body}
                  </p>

                  {/* CTA link with arrow */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    fontSize: '0.72rem', color: '#0028FF', fontWeight: 700,
                    fontFamily: 'JetBrains Mono', letterSpacing: '0.04em',
                    borderBottom: '1px solid rgba(0,40,255,0.3)', paddingBottom: '2px',
                    transition: 'color 0.2s, border-color 0.2s'
                  }}>
                    {card.cta} →
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Conversion Banner */}
          <div style={{
            marginTop: '70px',
            background: 'linear-gradient(135deg, rgba(0,40,255,0.15) 0%, rgba(13,17,30,0.98) 100%)',
            border: '1px solid rgba(0,40,255,0.45)',
            borderRadius: '22px',
            padding: '44px 48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            textAlign: 'left',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Animated scan line */}
            <div style={{
              position: 'absolute', top: 0, left: '-100%', right: 0, height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(0,40,255,0.8), transparent)',
              animation: 'barScanUp 3s linear infinite',
              transform: 'rotate(90deg)',
              transformOrigin: 'top right'
            }} />
            {/* Corner glow */}
            <div style={{
              position: 'absolute', top: '-30px', left: '-30px', width: '200px', height: '200px',
              background: 'radial-gradient(circle, rgba(0,40,255,0.15) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '0.66rem', color: '#0028FF', fontFamily: 'JetBrains Mono', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '8px' }}>
                ● READY TO DEPLOY
              </div>
              <h3 style={{ fontSize: '1.7rem', fontWeight: 900, margin: '0 0 8px', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                Ready to reclaim your cognitive bandwidth?
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#94A3B8', margin: 0 }}>
                Calibrate your custom profile or test the live prototype with 50 pre-indexed records.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', zIndex: 1 }}>
              <button
                onClick={onStartOnboarding}
                style={{
                  background: '#0028FF',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '14px 28px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 0 32px rgba(0,40,255,0.7)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 48px rgba(0,40,255,0.9)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 32px rgba(0,40,255,0.7)'; }}
              >
                <span>Calibrate My Lens</span>
                <ArrowRight size={15} />
              </button>
              <button
                onClick={() => onEnterApp('dashboard')}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: '999px',
                  padding: '14px 24px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s ease, border-color 0.2s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
              >
                Enter Operating System
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================================
          SHOWCASE FOOTER (Unified Obsidian Palette)
          ============================================================ */}
      <footer style={{
        background: '#04060A',
        padding: '36px 32px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        fontSize: '0.78rem',
        color: '#64748B'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#FFFFFF' }}>/InfoLens.</span>
            <span>—</span>
            <span>Personal Information Intelligence Architecture</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span>Neo4j Semantic Topology</span>
            <span>•</span>
            <span>Model Context Protocol</span>
            <span>•</span>
            <span>Offline-Resilient</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
