import React, { useState, useEffect } from 'react';
import {
  Compass, ChevronRight, ChevronLeft, Play, Pause, X, Sparkles,
  Maximize2, Minimize2, CheckCircle2, ShieldCheck, Terminal
} from 'lucide-react';

interface DemoTourBarProps {
  currentStep: number;
  onSetStep: (step: number) => void;
  onExecuteStepAction: (step: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export interface TourStepInfo {
  step: number;
  title: string;
  instruction: string;
  actionButtonLabel: string;
}

export const TOUR_STEPS: TourStepInfo[] = [
  {
    step: 1,
    title: "1. User Identity & Persona Calibration",
    instruction: "View or configure user profile (Alex Rivera, Student persona with AI 100, Hackathons 95, Cyber 85).",
    actionButtonLabel: "Launch Onboarding Flow"
  },
  {
    step: 2,
    title: "2. 50 Raw Items Ingested",
    instruction: "Inspect the multi-source stream: 50 raw items collected across News/RSS, Simulated Messages, Articles, and Research.",
    actionButtonLabel: "View Ingested Count"
  },
  {
    step: 3,
    title: "3. Open Processing View",
    instruction: "Switch to the technical processing dashboard to observe end-to-end transformation.",
    actionButtonLabel: "Open Processing View"
  },
  {
    step: 4,
    title: "4. Pipeline Processing",
    instruction: "Watch the 10-stage pipeline ingest, normalize schemas, generate 64-dim embeddings, and deduplicate.",
    actionButtonLabel: "Run Pipeline Simulation"
  },
  {
    step: 5,
    title: "5. 50 Items → 11 Clusters",
    instruction: "Observe semantic clustering: 50 raw items deduplicated into 46 unique records and clustered into 11 topic groups.",
    actionButtonLabel: "Inspect 11 Clusters"
  },
  {
    step: 6,
    title: "6. 11 Clusters → 5 Important",
    instruction: "Observe how Personalization scores elevate 5 clusters into High Priority (≥70) while batching low-priority into Digest.",
    actionButtonLabel: "Inspect High-Priority"
  },
  {
    step: 7,
    title: "7. Return to Dashboard",
    instruction: "Navigate back to the personalized dashboard to inspect your intelligence space.",
    actionButtonLabel: "View Dashboard"
  },
  {
    step: 8,
    title: "8. AI Event at the Top",
    instruction: "Notice OpenAI reasoning models and AI advances ranked at the top of your feed due to AI weight 100.",
    actionButtonLabel: "Highlight Top AI Cluster"
  },
  {
    step: 9,
    title: "9. 'Why am I seeing this?'",
    instruction: "Click the explainability trigger on the top cluster to understand why InfoLens elevated it.",
    actionButtonLabel: "Click 'Why am I seeing this?'"
  },
  {
    step: 10,
    title: "10. Importance Calculation",
    instruction: "Examine the mathematical breakdown: Topic (+35) + Entity (+20) + Recency (+10) + Corroboration (+10) = 95/100.",
    actionButtonLabel: "Inspect Scoring Formula"
  },
  {
    step: 11,
    title: "11. 'View Original Sources'",
    instruction: "Click 'View Sources' to audit the provenance and verify information integrity.",
    actionButtonLabel: "Click 'View Sources'"
  },
  {
    step: 12,
    title: "12. Inspect Sources",
    instruction: "Review articles, timestamps, authors, and normalized JSON schemas to verify full traceability.",
    actionButtonLabel: "Inspect Source Records"
  },
  {
    step: 13,
    title: "13. Change AI Weight: 100 → 20",
    instruction: "Open User Preferences and lower your AI interest weight from 100 down to 20.",
    actionButtonLabel: "Set AI Weight to 20"
  },
  {
    step: 14,
    title: "14. Recalculate Information Space",
    instruction: "Trigger '⚡ Recalculate My Information Space' to run the personalization matrix over the new weights.",
    actionButtonLabel: "Trigger Recalculate"
  },
  {
    step: 15,
    title: "15. Dashboard Visibly Changes!",
    instruction: "Watch the dashboard dynamically adapt: AI drops down, while Hackathon 2026 and Cybersecurity take #1 and #2 spots!",
    actionButtonLabel: "Observe Re-ranked Feed"
  },
  {
    step: 16,
    title: "16. Ask 'What should I know today?'",
    instruction: "Open Ask InfoLens and inquire about today's priority signals and deadlines.",
    actionButtonLabel: "Ask 'What should I know?'"
  },
  {
    step: 17,
    title: "17. Personalized Answer with Citations",
    instruction: "InfoLens synthesizes a concise personalized answer with clickable citation links to source documents!",
    actionButtonLabel: "Complete Verification"
  }
];

export const DemoTourBar: React.FC<DemoTourBarProps> = ({
  currentStep,
  onSetStep,
  onExecuteStepAction,
  isOpen,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (currentStep < 17) {
          const next = currentStep + 1;
          onSetStep(next);
          onExecuteStepAction(next);
        } else {
          setIsPlaying(false);
        }
      }, 4200);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, onSetStep, onExecuteStepAction]);

  if (!isOpen) return null;

  const currentInfo = TOUR_STEPS.find(s => s.step === currentStep) || TOUR_STEPS[0];

  // Minimized floating HUD pill in the bottom right corner
  if (isMinimized) {
    return (
      <div
        onClick={() => setIsMinimized(false)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1100,
          background: 'rgba(5, 7, 13, 0.95)',
          border: '1px solid var(--cobalt)',
          borderRadius: 'var(--radius-full)',
          padding: '8px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8), 0 0 20px var(--cobalt-glow)',
          backdropFilter: 'blur(12px)'
        }}
      >
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--cobalt)', boxShadow: '0 0 8px var(--cobalt)' }} />
        <span className="font-serif" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.08em' }}>
          ARCHITECTURAL AUDIT HUD // STEP {currentStep}/17
        </span>
        <Maximize2 size={13} color="var(--text-silver)" />
      </div>
    );
  }

  // Expanded Floating Architectural HUD (Bottom Fixed or Collapsible)
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 48px)',
      maxWidth: '1180px',
      zIndex: 1100,
      background: 'rgba(8, 12, 22, 0.96)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid var(--cobalt-border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: '0 16px 48px rgba(0, 0, 0, 0.8), 0 0 28px var(--cobalt-subtle)',
      overflow: 'hidden'
    }}>
      {/* Top subtle checkerboard accent stripe */}
      <div className="checkerboard-ribbon-subtle" />

      <div style={{
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Left Information */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'var(--cobalt)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Terminal size={16} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-cobalt" style={{ fontSize: '0.62rem' }}>
                ARCHITECTURE AUDIT HUD
              </span>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffffff' }}>
                Step {currentStep} of 17: {currentInfo.title}
              </span>
            </div>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-silver)', marginTop: '2px', maxWidth: '620px' }}>
              {currentInfo.instruction}
            </p>
          </div>
        </div>

        {/* Right Controls strictly in Electric Cobalt & Monochrome */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => onExecuteStepAction(currentStep)}
            className="btn btn-cobalt btn-xs"
            style={{ fontWeight: 700, padding: '6px 14px' }}
          >
            <Sparkles size={12} />
            {currentInfo.actionButtonLabel}
          </button>

          <button
            onClick={() => {
              if (currentStep > 1) {
                const prev = currentStep - 1;
                onSetStep(prev);
                onExecuteStepAction(prev);
              }
            }}
            disabled={currentStep <= 1}
            className="btn btn-secondary btn-xs"
            style={{ padding: '6px 10px' }}
          >
            <ChevronLeft size={13} />
            Prev
          </button>

          <button
            onClick={() => {
              if (currentStep < 17) {
                const next = currentStep + 1;
                onSetStep(next);
                onExecuteStepAction(next);
              }
            }}
            disabled={currentStep >= 17}
            className="btn btn-cobalt btn-xs"
            style={{ padding: '6px 12px' }}
          >
            Next
            <ChevronRight size={13} />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="btn btn-outline btn-xs"
            style={{ padding: '6px 10px', color: isPlaying ? 'var(--cobalt-bright)' : 'var(--text-silver)' }}
            title={isPlaying ? "Pause auto walkthrough" : "Start auto walkthrough"}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span>{isPlaying ? 'Pause' : 'Auto'}</span>
          </button>

          <button
            onClick={() => setIsMinimized(true)}
            className="btn btn-outline btn-xs"
            style={{ padding: '6px' }}
            title="Minimize HUD to bottom pill"
          >
            <Minimize2 size={13} />
          </button>

          <button
            onClick={onClose}
            className="btn btn-outline btn-xs"
            style={{ padding: '6px', borderRadius: '50%' }}
            title="Dismiss HUD"
          >
            <X size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
