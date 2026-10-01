import React, { useState, useMemo, useEffect } from 'react';
import type {
  UserProfile, Cluster, InformationItem, PipelineStageMetric, ConsumptionStyle
} from './types';
import { DEFAULT_USER_PROFILE, RAW_DEMO_ITEMS } from './data/mockData';
import {
  generateEmbedding, deduplicateItems, buildClusters, generatePipelineMetrics
} from './engine/pipelineEngine';

import { Navbar } from './components/Navbar';
import { DemoTourBar } from './components/DemoTourBar';
import { DashboardView } from './components/DashboardView';
import { PipelineVisualizer } from './components/PipelineVisualizer';
import { AttentionCenterView } from './components/AttentionCenterView';
import { PreferencesView } from './components/PreferencesView';
import { ImportanceModal } from './components/ImportanceModal';
import { SourcesModal } from './components/SourcesModal';
import { FeedbackModal } from './components/FeedbackModal';
import { AskInfoLensModal } from './components/AskInfoLensModal';
import { OnboardingModal } from './components/OnboardingModal';
import { AuthOnboardingFlow } from './components/AuthOnboardingFlow';
import { Neo4jKnowledgeGraph } from './components/Neo4jKnowledgeGraph';
import { McpHubView } from './components/McpHubView';
import { ShowcaseView } from './components/ShowcaseView';
import { ClusterDetailView } from './components/ClusterDetailView';
import confetti from 'canvas-confetti';

export function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeTab, setActiveTab] = useState<string>("showcase");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_USER_PROFILE);

  // Modals & Drawers
  const [importanceCluster, setImportanceCluster] = useState<Cluster | null>(null);
  const [sourcesCluster, setSourcesCluster] = useState<Cluster | null>(null);
  const [feedbackCluster, setFeedbackCluster] = useState<Cluster | null>(null);
  const [activeCluster, setActiveCluster] = useState<Cluster | null>(null);
  const [askModalOpen, setAskModalOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(true);

  // Architecture Audit HUD (retractable)
  const [tourBarOpen, setTourBarOpen] = useState(false);
  const [tourStep, setTourStep] = useState(1);

  // Pipeline Simulation
  const [isSimulatingPipeline, setIsSimulatingPipeline] = useState(false);
  const [activeStageIndex, setActiveStageIndex] = useState(9);

  // Apply theme attribute
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Generate embeddings for raw items once
  const itemsWithEmbeddings: InformationItem[] = useMemo(() => {
    return RAW_DEMO_ITEMS.map(item => ({
      ...item,
      embedding: generateEmbedding(item)
    }));
  }, []);

  // Deduplicate items
  const { uniqueItems, duplicatesRemoved } = useMemo(() => {
    return deduplicateItems(itemsWithEmbeddings);
  }, [itemsWithEmbeddings]);

  // Compute clusters based on current user profile
  const clusters = useMemo(() => {
    return buildClusters(uniqueItems, userProfile);
  }, [uniqueItems, userProfile]);

  // Compute pipeline metrics
  const pipelineMetrics = useMemo(() => {
    return generatePipelineMetrics(itemsWithEmbeddings, uniqueItems, duplicatesRemoved, clusters);
  }, [itemsWithEmbeddings, uniqueItems, duplicatesRemoved, clusters]);

  // Run pipeline live simulation
  const handleRerunPipeline = () => {
    setIsSimulatingPipeline(true);
    setActiveStageIndex(0);
    setActiveTab("pipeline");

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < 10) {
        setActiveStageIndex(current);
      } else {
        clearInterval(interval);
        setIsSimulatingPipeline(false);
        setActiveStageIndex(9);
        try {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
        } catch {
          // fallback
        }
      }
    }, 280);
  };

  // Feedback Submission
  const handleFeedbackSubmit = (clusterId: string, useful: boolean, reason?: string) => {
    const updatedHistory = {
      ...userProfile.feedbackHistory,
      [clusterId]: {
        useful,
        reason,
        timestamp: new Date().toISOString()
      }
    };
    setUserProfile({
      ...userProfile,
      feedbackHistory: updatedHistory
    });
  };

  const handleQuickUsefulFeedback = (clusterId: string) => {
    handleFeedbackSubmit(clusterId, true);
    try {
      confetti({ particleCount: 30, spread: 45, origin: { y: 0.9 } });
    } catch {
      // fallback
    }
  };

  // Tour Step Executor for the 17 Demo Scenario Steps
  const handleExecuteTourStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        setOnboardingOpen(true);
        break;
      case 2:
        setOnboardingOpen(false);
        setActiveTab("dashboard");
        break;
      case 3:
        setOnboardingOpen(false);
        setActiveTab("pipeline");
        break;
      case 4:
        handleRerunPipeline();
        break;
      case 5:
        setActiveTab("pipeline");
        break;
      case 6:
        setActiveTab("pipeline");
        break;
      case 7:
        setActiveTab("dashboard");
        break;
      case 8:
        setActiveTab("dashboard");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 9:
        if (clusters.length > 0) {
          setImportanceCluster(clusters[0]);
        }
        break;
      case 10:
        if (!importanceCluster && clusters.length > 0) {
          setImportanceCluster(clusters[0]);
        }
        break;
      case 11:
        setImportanceCluster(null);
        if (clusters.length > 0) {
          setSourcesCluster(clusters[0]);
        }
        break;
      case 12:
        if (!sourcesCluster && clusters.length > 0) {
          setSourcesCluster(clusters[0]);
        }
        break;
      case 13:
        setSourcesCluster(null);
        setActiveTab("preferences");
        setUserProfile(prev => ({
          ...prev,
          interests: {
            ...prev.interests,
            "AI": 20
          }
        }));
        break;
      case 14:
        setActiveTab("preferences");
        setUserProfile(prev => ({
          ...prev,
          interests: {
            ...prev.interests,
            "AI": 20
          }
        }));
        break;
      case 15:
        setActiveTab("dashboard");
        break;
      case 16:
        setAskModalOpen(true);
        break;
      case 17:
        setAskModalOpen(true);
        try {
          confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
        } catch {
          // fallback
        }
        break;
      default:
        break;
    }
  };

  // If on Showcase tab, render the landing showcase experience (Voyid & Editorial Analytics)
  if (activeTab === "showcase") {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ShowcaseView
          onStartOnboarding={() => setOnboardingOpen(true)}
          onEnterApp={(tab) => {
            setActiveTab(tab || "dashboard");
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          clusters={clusters}
          userProfile={userProfile}
        />

        {onboardingOpen && (
          <AuthOnboardingFlow
            userProfile={userProfile}
            onCancel={() => setOnboardingOpen(false)}
            onComplete={updated => {
              setUserProfile(updated);
              setOnboardingOpen(false);
              setActiveTab("dashboard");
              window.scrollTo({ top: 0, behavior: 'smooth' });
              try {
                confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
              } catch {
                // fallback
              }
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        userProfile={userProfile}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAskModal={() => setAskModalOpen(true)}
        onOpenOnboarding={() => setOnboardingOpen(true)}
        tourBarOpen={tourBarOpen}
        onToggleTourBar={() => setTourBarOpen(!tourBarOpen)}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />

      {/* 17-Step Guided Judge Tour Bar */}
      <DemoTourBar
        currentStep={tourStep}
        onSetStep={setTourStep}
        onExecuteStepAction={handleExecuteTourStep}
        isOpen={tourBarOpen}
        onClose={() => setTourBarOpen(false)}
      />

      {/* Main App Container */}
      <main style={{ flex: 1, padding: '24px 32px', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
        {activeTab === "dashboard" && (
          <DashboardView
            clusters={clusters}
            userProfile={userProfile}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenImportance={c => setImportanceCluster(c)}
            onOpenSources={c => setSourcesCluster(c)}
            onOpenFeedback={c => setFeedbackCluster(c)}
            onQuickUsefulFeedback={handleQuickUsefulFeedback}
            onNavigateToTab={setActiveTab}
            onConsumptionStyleChange={style => setUserProfile({ ...userProfile, consumptionStyle: style })}
            onOpenClusterDetail={c => {
              setActiveCluster(c);
              setActiveTab("cluster");
            }}
          />
        )}

        {activeTab === "cluster" && activeCluster && (
          <ClusterDetailView
            cluster={activeCluster}
            userProfile={userProfile}
            onBack={() => {
              setActiveCluster(null);
              setActiveTab("dashboard");
            }}
            onOpenSourceUrl={(url) => window.open(url, "_blank")}
          />
        )}

        {activeTab === "graph" && (
          <Neo4jKnowledgeGraph
            clusters={clusters}
            allItems={uniqueItems}
            userProfile={userProfile}
            onOpenImportance={c => setImportanceCluster(c)}
            onOpenSources={c => setSourcesCluster(c)}
          />
        )}

        {activeTab === "mcp" && (
          <McpHubView
            clusters={clusters}
            allItems={uniqueItems}
            userProfile={userProfile}
          />
        )}

        {activeTab === "pipeline" && (
          <PipelineVisualizer
            metrics={pipelineMetrics}
            onRerunPipeline={handleRerunPipeline}
            isSimulating={isSimulatingPipeline}
            activeStageIndex={activeStageIndex}
          />
        )}

        {activeTab === "attention" && (
          <AttentionCenterView
            clusters={clusters}
            userProfile={userProfile}
            onOpenImportance={c => setImportanceCluster(c)}
            onOpenSources={c => setSourcesCluster(c)}
          />
        )}

        {activeTab === "preferences" && (
          <PreferencesView
            userProfile={userProfile}
            onSaveAndRecalculate={updated => setUserProfile(updated)}
          />
        )}
      </main>

      {/* Modals & Dialogs */}
      <ImportanceModal
        cluster={importanceCluster}
        onClose={() => setImportanceCluster(null)}
        onOpenPreferences={() => {
          setImportanceCluster(null);
          setActiveTab("preferences");
        }}
      />

      <SourcesModal
        cluster={sourcesCluster}
        onClose={() => setSourcesCluster(null)}
      />

      <FeedbackModal
        cluster={feedbackCluster}
        onClose={() => setFeedbackCluster(null)}
        onSubmitFeedback={handleFeedbackSubmit}
      />

      <AskInfoLensModal
        isOpen={askModalOpen}
        onClose={() => setAskModalOpen(false)}
        clusters={clusters}
        userProfile={userProfile}
        allItems={uniqueItems}
        onOpenSources={c => setSourcesCluster(c)}
        onOpenImportance={c => setImportanceCluster(c)}
      />

      {onboardingOpen && (
        <AuthOnboardingFlow
          userProfile={userProfile}
          onCancel={() => setOnboardingOpen(false)}
          onComplete={updated => {
            setUserProfile(updated);
            setOnboardingOpen(false);
            try {
              confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
            } catch {
              // fallback
            }
          }}
        />
      )}

      {/* Footer */}
      <footer style={{
        padding: '20px 32px',
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-secondary)',
        fontSize: '0.78rem',
        color: 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>InfoLens</span>
          <span>•</span>
          <span>Personal Information Intelligence Operating System</span>
          <span>•</span>
          <span className="badge badge-normal" style={{ fontSize: '0.62rem' }}>Offline-Resilient Prototype</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>50 Items Indexed</span>
          <span>•</span>
          <span>11 Semantic Clusters</span>
          <span>•</span>
          <span>100% Provenance Preserved</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
