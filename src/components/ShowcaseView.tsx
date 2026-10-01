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

              {/* Radial Fan Spoke Graphic with Live Streaming Photons, Sonar Waves & Hover Spotlight */}
              <div style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <svg viewBox="0 0 400 240" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                  {/* Central Sonar Expanding Radar Rings */}
                  <circle cx="100" cy="180" r="5" fill="none" stroke="#0028FF" strokeWidth="1.5">
                    <animate attributeName="r" values="5;46" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.9;0" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="100" cy="180" r="5" fill="none" stroke="#60A5FA" strokeWidth="1">
                    <animate attributeName="r" values="5;46" begin="1.2s" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.75;0" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="100" cy="180" r="5" fill="#FFFFFF" style={{ filter: 'drop-shadow(0 0 10px #0028FF)' }}>
                    <animate attributeName="r" values="5;6.5;5" dur="1.8s" repeatCount="indefinite" />
                  </circle>

                  {[
                    { angle: -65, label: 'Feed', size: 10, dots: 7, desc: 'Real-time Signal Stream // 94k MAU' },
                    { angle: -52, label: 'Graph', size: 12, dots: 8, desc: 'Neo4j Topologies // 128k MAU' },
                    { angle: -40, label: 'MCP', size: 8, dots: 6, desc: 'Model Context Protocol // 52k MAU' },
                    { angle: -28, label: 'Digest', size: 14, dots: 9, desc: 'Cognitive Synthesis // 142k MAU' },
                    { angle: -16, label: 'Rules', size: 7, dots: 5, desc: 'Attention Routing // 44k MAU' },
                    { angle: -4, label: 'Audit', size: 11, dots: 8, desc: 'Verifiable Provenance // 88k MAU' },
                    { angle: 8, label: 'Quiet', size: 9, dots: 6, desc: 'Entropy Throttling // 68k MAU' },
                    { angle: 20, label: 'Ask', size: 13, dots: 9, desc: 'Natural Language Search // 134k MAU' },
                    { angle: 32, label: 'Sync', size: 8, dots: 5, desc: 'State Conduits // 58k MAU' },
                    { angle: 44, label: 'Tokens', size: 6, dots: 4, desc: 'Embedding Vectors // 36k MAU' },
                    { angle: 56, label: 'Safety', size: 10, dots: 7, desc: 'Entropy Quarantine // 76k MAU' },
                    { angle: 68, label: 'Search', size: 11, dots: 8, desc: 'Similarity Index // 92k MAU' }
                  ].map((spoke, idx) => {
                    const rad = (spoke.angle * Math.PI) / 180;
                    const length = 160;
                    const endX = 100 + Math.cos(rad) * length;
                    const endY = 180 + Math.sin(rad) * length;
                    const isHovered = hoveredSpoke === idx;
                    const isAnyHovered = hoveredSpoke !== null;
                    const opacity = isHovered ? 1 : isAnyHovered ? 0.3 : 1;
                    const speed = 1.6 + (idx % 4) * 0.35;

                    return (
                      <g
                        key={idx}
                        style={{ cursor: 'pointer', transition: 'all 0.25s ease', opacity }}
                        onMouseEnter={() => setHoveredSpoke(idx)}
                        onMouseLeave={() => setHoveredSpoke(null)}
                      >
                        {/* Spoke Line */}
                        <line
                          x1="100"
                          y1="180"
                          x2={endX}
                          y2={endY}
                          className="anim-spoke-line"
                          stroke={isHovered ? '#0028FF' : idx === 1 || idx === 3 ? 'rgba(0, 40, 255, 0.45)' : 'rgba(255, 255, 255, 0.24)'}
                          strokeWidth={isHovered ? '2.5' : '1.2'}
                          style={{
                            filter: isHovered ? 'drop-shadow(0 0 10px #0028FF)' : 'none',
                            transition: 'stroke 0.2s ease, stroke-width 0.2s ease'
                          }}
                        />

                        {/* Streaming Photon Packet Zooming Outward */}
                        <circle
                          r={isHovered ? 3.5 : 2.5}
                          fill={isHovered ? '#FFFFFF' : '#60A5FA'}
                          style={{ filter: 'drop-shadow(0 0 8px #0028FF)' }}
                        >
                          <animate
                            attributeName="cx"
                            values={`100;${endX}`}
                            dur={`${speed}s`}
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="cy"
                            values={`180;${endY}`}
                            dur={`${speed}s`}
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            values="0;1;1;0"
                            keyTimes="0;0.12;0.88;1"
                            dur={`${speed}s`}
                            repeatCount="indefinite"
                          />
                        </circle>

                        {/* Intermediate Dots on Spoke with subtle wave shimmer */}
                        {Array.from({ length: spoke.dots }).map((_, dIdx) => {
                          const dist = 30 + (dIdx / spoke.dots) * (length - 40);
                          const dotX = 100 + Math.cos(rad) * dist;
                          const dotY = 180 + Math.sin(rad) * dist;
                          return (
                            <circle
                              key={dIdx}
                              cx={dotX}
                              cy={dotY}
                              r={isHovered ? '2.5' : '1.8'}
                              fill={isHovered ? '#93C5FD' : '#475569'}
                              style={{ transition: 'fill 0.2s ease' }}
                            >
                              <animate
                                attributeName="opacity"
                                values="0.4;1;0.4"
                                dur={`${2 + (dIdx % 3) * 0.5}s`}
                                repeatCount="indefinite"
                              />
                            </circle>
                          );
                        })}

                        {/* Node Outer Halo Ring */}
                        <circle
                          cx={endX}
                          cy={endY}
                          r={isHovered ? spoke.size / 2 + 5 : spoke.size / 2 + 2}
                          fill="none"
                          stroke={isHovered ? '#0028FF' : '#60A5FA'}
                          strokeWidth="1"
                        >
                          <animate
                            attributeName="r"
                            values={`${spoke.size / 2 + 1};${spoke.size / 2 + 6};${spoke.size / 2 + 1}`}
                            dur="2.4s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            values="0.25;0.8;0.25"
                            dur="2.4s"
                            repeatCount="indefinite"
                          />
                        </circle>

                        {/* Destination Node Circle */}
                        <circle
                          cx={endX}
                          cy={endY}
                          r={isHovered ? spoke.size / 2 + 3 : spoke.size / 2}
                          fill={isHovered ? '#0028FF' : idx === 1 || idx === 3 ? '#0028FF' : '#FFFFFF'}
                          style={{
                            filter: isHovered ? 'drop-shadow(0 0 14px #0028FF)' : 'drop-shadow(0 0 6px rgba(0, 40, 255, 0.5))',
                            transition: 'all 0.2s ease'
                          }}
                        />

                        {/* Node Label */}
                        <text
                          x={endX + (Math.cos(rad) * 18)}
                          y={endY + (Math.sin(rad) * 18)}
                          fontSize={isHovered ? '10' : '9'}
                          fontWeight={isHovered ? '800' : '600'}
                          fill={isHovered ? '#FFFFFF' : '#94A3B8'}
                          fontFamily="Inter"
                          textAnchor="middle"
                          alignmentBaseline="middle"
                          style={{ transition: 'all 0.2s ease' }}
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

              {/* Vertical Dot Matrix Stack Graphic with Living Ascending Wave & Peak Beacons */}
              <div style={{ height: '240px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', paddingBottom: '16px' }}>
                {[
                  { label: 'Latency', count: 3, num: 6, fix: 'Sub-50ms Edge Cache' },
                  { label: 'Token drift', count: 5, num: 10, fix: 'Vector Normalization' },
                  { label: 'Duplicate', count: 7, num: 14, fix: 'MinHash Deduplication' },
                  { label: 'RSS 404', count: 9, num: 18, fix: 'Self-Healing Fallbacks' },
                  { label: 'Hallucination', count: 11, num: 22, fix: 'Grounded Citation Checks' },
                  { label: 'MCP timeout', count: 14, num: 28, fix: 'Async Circuit Breaker' },
                  { label: 'Schema break', count: 18, num: 36, fix: 'Resilient Extraction' },
                  { label: 'Spam burst', count: 22, num: 44, fix: 'Entropy Filter' },
                  { label: 'Noise flood', count: 27, num: 54, fix: 'Semantic Clustering' }
                ].map((stack, idx) => {
                  const isHovered = hoveredStack === idx;
                  const isPeak = idx === 8;

                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredStack(idx)}
                      onMouseLeave={() => setHoveredStack(null)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '3px',
                        cursor: 'pointer',
                        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    >
                      <span style={{
                        fontSize: '0.68rem',
                        color: isHovered || isPeak ? '#60A5FA' : '#CBD5E1',
                        fontWeight: 800,
                        marginBottom: '4px',
                        animation: isPeak ? 'peakBeacon 2s ease-in-out infinite' : undefined,
                        textShadow: isHovered || isPeak ? '0 0 10px rgba(0, 40, 255, 0.9)' : 'none',
                        transition: 'color 0.2s ease'
                      }}>
                        {stack.num}
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '3px' }}>
                        {Array.from({ length: stack.count }).map((_, dIdx) => {
                          const isTop = dIdx === stack.count - 1;
                          const delay = ((idx * 0.18 + dIdx * 0.09) % 2.6).toFixed(2);

                          return (
                            <span
                              key={dIdx}
                              style={{
                                width: isHovered ? '6.5px' : '5px',
                                height: isHovered ? '6.5px' : '5px',
                                borderRadius: '50%',
                                background: isHovered
                                  ? '#0028FF'
                                  : isTop
                                  ? (isPeak ? '#0028FF' : '#FFFFFF')
                                  : '#334155',
                                boxShadow: isHovered || (isPeak && isTop) ? '0 0 10px #0028FF' : undefined,
                                animation: !isHovered && !isTop
                                  ? `dotAscend 2.6s ease-in-out infinite`
                                  : isTop && isPeak
                                  ? `peakBeacon 1.8s ease-in-out infinite`
                                  : undefined,
                                animationDelay: `${delay}s`,
                                transition: 'all 0.2s ease'
                              }}
                            />
                          );
                        })}
                      </div>
                      <span style={{
                        fontSize: '0.64rem',
                        color: isHovered ? '#FFFFFF' : '#64748B',
                        fontWeight: isHovered ? 700 : 400,
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                        marginTop: '8px',
                        height: '52px',
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

              <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 300 220" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
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
                      const petalDist = 38;
                      const cx = Math.cos(rad) * petalDist;
                      const cy = Math.sin(rad) * petalDist;
                      const isHovered = hoveredPetal === idx;
                      const r = (16 + (petal.val * 1.5)) * (isHovered ? 1.15 : 1);
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
            {/* Attention capacity by tier */}
            <div style={{
              background: '#0D111E',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 6px', color: '#FFFFFF' }}>
                  Attention capacity by tier
                </h3>
                <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: 0 }}>
                  Q2 2026 · personal intelligence bandwidth
                </p>
              </div>

              <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', paddingBottom: '16px' }}>
                {[
                  { label: 'STARTER', val: '$182K', height: '80px', fill: '#334155' },
                  { label: 'PRO (HACKER)', val: '$486K', height: '160px', fill: '#0028FF', isHero: true },
                  { label: 'TEAM', val: '$391K', height: '125px', fill: '#64748B' },
                  { label: 'ENT', val: '$274K', height: '95px', fill: '#94A3B8' }
                ].map((bar, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'JetBrains Mono' }}>
                      {bar.val}
                    </span>
                    <div style={{
                      width: '48px',
                      height: bar.height,
                      borderRadius: '16px 16px 4px 4px',
                      background: bar.fill
                    }} />
                    <span style={{ fontSize: '0.65rem', color: '#94A3B8', fontWeight: 700, letterSpacing: '0.05em' }}>
                      {bar.label}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8' }}>
                <span>SHUBBY BARS // MONO DEMO</span>
                <span>ALLOCATION</span>
              </div>
            </div>

            {/* Where intelligence comes from (10x10 Dot Matrix) */}
            <div style={{
              background: '#0D111E',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 6px', color: '#FFFFFF' }}>
                  Where intelligence comes from
                </h3>
                <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: 0 }}>
                  Q2 2026 · every dot = 1% of raw ingested signals
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '28px' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(10, 1fr)',
                  gap: '6px',
                  width: '180px'
                }}>
                  {Array.from({ length: 100 }).map((_, idx) => {
                    let dotColor = '#FFFFFF';
                    if (idx >= 34 && idx < 61) dotColor = '#64748B';
                    else if (idx >= 61 && idx < 79) dotColor = '#0028FF';
                    else if (idx >= 79 && idx < 91) dotColor = '#334155';
                    else if (idx >= 91) dotColor = '#1E293B';

                    return (
                      <span
                        key={idx}
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: dotColor
                        }}
                      />
                    );
                  })}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { label: 'HackerNews & Feeds', pct: '34%', color: '#FFFFFF' },
                    { label: 'arXiv Preprints', pct: '27%', color: '#64748B' },
                    { label: 'Direct Mentors & WhatsApp', pct: '18%', color: '#0028FF' },
                    { label: 'GitHub MCP Repos', pct: '12%', color: '#334155' },
                    { label: 'Security Advisories', pct: '9%', color: '#1E293B' }
                  ].map((src, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: src.color }} />
                      <span style={{ fontSize: '0.76rem', color: '#FFFFFF', fontWeight: 600 }}>{src.label}</span>
                      <span style={{ fontSize: '0.76rem', color: '#94A3B8', fontFamily: 'JetBrains Mono', marginLeft: 'auto' }}>{src.pct}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px', marginTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8' }}>
                <span>DOT MATRIX // 100 PROVENANCE PERCENTILES</span>
                <span>ATTRIBUTION</span>
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
        padding: '90px 32px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{
            fontSize: '0.72rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 800,
            color: '#0028FF',
            display: 'block',
            marginBottom: '10px'
          }}>
            THE 3-STAGE INTELLIGENCE LIFECYCLE
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 16px' }}>
            From Chaotic Noise to Decisive Focus
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#94A3B8', maxWidth: '640px', margin: '0 auto 50px', lineHeight: 1.6 }}>
            InfoLens replaces endless scrolling feeds with personalized cognitive triage. Here is how your intelligence operating system operates:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', textAlign: 'left' }}>
            {/* Step 1 */}
            <div style={{
              background: '#0D111E',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '32px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#0028FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 900,
                fontSize: '1.1rem',
                marginBottom: '18px'
              }}>
                1
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px', color: '#FFFFFF' }}>
                Identity Calibration
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '18px' }}>
                Define your active archetype (Student Hacker, AI Researcher, Tech Founder). Set mathematical interest weights and track specific individuals or organizations.
              </p>
              <div style={{ fontSize: '0.72rem', color: '#0028FF', fontWeight: 700 }}>
                Dynamic Vector Calibration →
              </div>
            </div>

            {/* Step 2 */}
            <div style={{
              background: '#0D111E',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '32px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#0028FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 900,
                fontSize: '1.1rem',
                marginBottom: '18px'
              }}>
                2
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px', color: '#FFFFFF' }}>
                Graph Synthesis & Ingest
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '18px' }}>
                Raw signals from Slack, arXiv, GitHub, and email flow into a 10-stage pipeline: deduplication, entity extraction, cluster formation, and Neo4j edge construction.
              </p>
              <div style={{ fontSize: '0.72rem', color: '#0028FF', fontWeight: 700 }}>
                100% Provenance Preservation →
              </div>
            </div>

            {/* Step 3 */}
            <div style={{
              background: '#0D111E',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '32px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#0028FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 900,
                fontSize: '1.1rem',
                marginBottom: '18px'
              }}>
                3
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px', color: '#FFFFFF' }}>
                Decisive Attention OS
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '18px' }}>
                TimeSpot chronometers track your deadline horizons. Clusters are scored mathematically against your preferences. Non-urgent noise is silently batched for quiet hours.
              </p>
              <div style={{ fontSize: '0.72rem', color: '#0028FF', fontWeight: 700 }}>
                Zero Fatigue Digest →
              </div>
            </div>
          </div>

          {/* Bottom Conversion Banner */}
          <div style={{
            marginTop: '70px',
            background: 'linear-gradient(135deg, rgba(0, 40, 255, 0.18) 0%, rgba(13, 17, 30, 0.95) 100%)',
            border: '1px solid #0028FF',
            borderRadius: '22px',
            padding: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            textAlign: 'left'
          }}>
            <div>
              <h3 style={{ fontSize: '1.7rem', fontWeight: 900, margin: '0 0 8px', color: '#FFFFFF' }}>
                Ready to reclaim your cognitive bandwidth?
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#CBD5E1', margin: 0 }}>
                Calibrate your custom profile or test the live prototype with 50 pre-indexed records.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <button
                onClick={onStartOnboarding}
                style={{
                  background: '#0028FF',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '13px 26px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 0 24px rgba(0, 40, 255, 0.65)'
                }}
              >
                <span>Calibrate My Lens</span>
                <ArrowRight size={15} />
              </button>
              <button
                onClick={() => onEnterApp('dashboard')}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '999px',
                  padding: '13px 22px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
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
