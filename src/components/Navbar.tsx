import React from 'react';
import type { UserProfile } from '../types';
import {
  Compass, Search, Moon, Sun, Bell, Sliders, Layers, Sparkles, User, Database,
  Network, Cpu
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  userProfile: UserProfile;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenAskModal: () => void;
  onOpenOnboarding: () => void;
  tourBarOpen: boolean;
  onToggleTourBar: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  userProfile,
  searchQuery,
  onSearchChange,
  onOpenAskModal,
  onOpenOnboarding,
  tourBarOpen,
  onToggleTourBar,
  theme,
  onToggleTheme
}) => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'var(--bg-secondary)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-medium)',
      padding: '0 24px',
      height: '66px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px'
    }}>
      {/* Brand & Logo (Image 1 & 2 aesthetic: Syne/Cinzel font + Electric Cobalt Blue Star) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div
          onClick={() => onSelectTab("dashboard")}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'var(--cobalt)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 0 16px var(--cobalt-glow)'
          }}>
            <Sparkles size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="font-display" style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                INFOLENS
              </span>
              <span className="badge badge-cobalt" style={{ fontSize: '0.62rem', padding: '2px 6px' }}>
                OS
              </span>
            </div>
            <div className="font-serif" style={{ fontSize: '0.6rem', color: 'var(--text-silver)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Architectural Intelligence
            </div>
          </div>
        </div>

        {/* Global Nav Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '12px' }}>
          <button
            onClick={() => onSelectTab("showcase")}
            className="btn btn-sm"
            style={{
              background: 'transparent',
              color: 'var(--cobalt)',
              border: '1px solid var(--cobalt-border)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              fontSize: '0.76rem',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <Compass size={13} />
            <span>← Showcase</span>
          </button>

          {[
            { id: "dashboard", label: "01 // Feed", icon: <Layers size={13} /> },
            { id: "graph", label: "02 // Graph", icon: <Network size={13} /> },
            { id: "mcp", label: "03 // MCP Hub", icon: <Cpu size={13} /> },
            { id: "pipeline", label: "04 // Pipeline", icon: <Database size={13} /> },
            { id: "attention", label: "05 // Attention", icon: <Bell size={13} /> },
            { id: "preferences", label: "06 // Settings", icon: <Sliders size={13} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className="btn btn-sm"
              style={{
                background: activeTab === tab.id ? 'var(--cobalt-subtle)' : 'transparent',
                color: activeTab === tab.id ? 'var(--cobalt)' : 'var(--text-silver)',
                border: activeTab === tab.id ? '1px solid var(--cobalt)' : '1px solid transparent',
                borderRadius: 'var(--radius-md)',
                fontWeight: activeTab === tab.id ? 800 : 500,
                fontSize: '0.78rem'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Center Search Input */}
      <div style={{ flex: 1, maxWidth: '300px', position: 'relative' }}>
        <Search
          size={14}
          color="var(--text-muted)"
          style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
        />
        <input
          type="text"
          placeholder="Filter clusters, entities, topics..."
          className="input-text"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          style={{
            paddingLeft: '34px',
            height: '36px',
            fontSize: '0.8rem',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)'
          }}
        />
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Ask InfoLens Conversational Trigger */}
        <button
          onClick={onOpenAskModal}
          className="btn btn-cobalt btn-sm"
          style={{
            fontWeight: 700
          }}
        >
          <Sparkles size={14} />
          <span>Ask InfoLens</span>
        </button>

        {/* Architecture Audit HUD Trigger */}
        <button
          onClick={onToggleTourBar}
          className="btn btn-outline btn-sm"
          style={{
            borderColor: tourBarOpen ? 'var(--cobalt)' : 'var(--border-subtle)',
            color: tourBarOpen ? '#ffffff' : 'var(--text-silver)',
            background: tourBarOpen ? 'var(--cobalt-subtle)' : 'transparent'
          }}
          title="Toggle Architecture Audit HUD (17 Checkpoints)"
        >
          <Compass size={14} color="var(--cobalt)" />
          <span>Audit HUD</span>
        </button>

        {/* User Account & Preference Calibration Pill */}
        <button
          onClick={onOpenOnboarding}
          className="btn btn-secondary btn-sm"
          style={{ padding: '6px 12px', border: '1px solid var(--border-medium)', background: 'var(--bg-tertiary)' }}
          title="Calibrate Account & Preferences"
        >
          <User size={14} color="var(--cobalt)" />
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ffffff' }}>
            {userProfile.name}
          </span>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
            ({userProfile.userType})
          </span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="btn btn-secondary btn-sm"
          style={{ padding: '8px', borderRadius: '50%' }}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={15} color="var(--text-silver)" /> : <Moon size={15} color="var(--cobalt)" />}
        </button>
      </div>
    </header>
  );
};
