import React, { useState } from 'react';
import type { PipelineStageMetric } from '../types';
import {
  Layers, Database, FileCheck, Brain, Binary, CopyMinus, Network, UserCheck,
  Award, FileText, ArrowRight, Play, CheckCircle2, RotateCw, Eye, Sparkles, Code
} from 'lucide-react';

interface PipelineVisualizerProps {
  metrics: PipelineStageMetric[];
  onRerunPipeline: () => void;
  isSimulating: boolean;
  activeStageIndex: number;
}

export const PipelineVisualizer: React.FC<PipelineVisualizerProps> = ({
  metrics,
  onRerunPipeline,
  isSimulating,
  activeStageIndex
}) => {
  const [selectedStageId, setSelectedStageId] = useState<string>(metrics[4]?.id || "stage-5-deduplication");
  const [inspectModalOpen, setInspectModalOpen] = useState(false);

  const selectedStage = metrics.find(m => m.id === selectedStageId) || metrics[0];

  const getStageIcon = (step: number) => {
    switch (step) {
      case 1: return <Database size={18} />;
      case 2: return <FileCheck size={18} />;
      case 3: return <Brain size={18} />;
      case 4: return <Binary size={18} />;
      case 5: return <CopyMinus size={18} />;
      case 6: return <Network size={18} />;
      case 7: return <UserCheck size={18} />;
      case 8: return <Award size={18} />;
      case 9: return <FileText size={18} />;
      case 10: return <Layers size={18} />;
      default: return <Sparkles size={18} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner & Control Bar */}
      <div className="glass-panel" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-cobalt">Technical Architecture</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>End-to-End Information Processing Pipeline</span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
            Processing Pipeline & Provenance Graph
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-silver)', marginTop: '2px' }}>
            Visualizes how InfoLens ingests 50 raw streams, generates 64-dim embeddings, deduplicates near-copies, groups 11 clusters, and scores personal priority.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={onRerunPipeline}
            disabled={isSimulating}
            className="btn btn-cobalt"
            style={{ minWidth: '170px' }}
          >
            {isSimulating ? (
              <>
                <RotateCw size={15} className="animate-spin" />
                <span>Processing Stream...</span>
              </>
            ) : (
              <>
                <Play size={15} />
                <span>Simulate Ingestion Run</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Pipeline Metric Flow Summary Strip */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        overflowX: 'auto',
        gap: '12px'
      }}>
        {[
          { label: "Raw Items Ingested", value: "50", unit: "streams" },
          { label: "Normalized Schemas", value: "50", unit: "records" },
          { label: "Near-Duplicates Merged", value: "4", unit: "cross-posts" },
          { label: "Unique Vector Embeddings", value: "46", unit: "64-dim unit vecs" },
          { label: "Semantic Topic Clusters", value: "11", unit: "clusters" },
          { label: "High Priority / Important", value: "5", unit: "vital items" },
          { label: "Source Backlinks Preserved", value: "100%", unit: "traceability" }
        ].map((stat, idx, arr) => (
          <React.Fragment key={stat.label}>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: '120px' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                {stat.label}
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '2px' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--cobalt-bright)', fontFamily: 'var(--font-mono)' }}>
                  {stat.value}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-silver)' }}>{stat.unit}</span>
              </div>
            </div>
            {idx < arr.length - 1 && (
              <div style={{ color: 'var(--border-medium)', flexShrink: 0 }}>
                <ArrowRight size={16} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Interactive 10-Stage Pipeline Grid / Nodes */}
      <div>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
          <span>10 Discrete Pipeline Transformation Stages (Click any node to inspect data payloads)</span>
          <span style={{ color: 'var(--cobalt-bright)' }}>Stage {activeStageIndex + 1} of 10 Active</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px'
        }}>
          {metrics.map((stage, idx) => {
            const isSelected = selectedStageId === stage.id;
            const isProcessingThis = isSimulating && activeStageIndex === idx;
            const isCompletedSoFar = !isSimulating || idx <= activeStageIndex;

            return (
              <div
                key={stage.id}
                onClick={() => {
                  setSelectedStageId(stage.id);
                  setInspectModalOpen(true);
                }}
                className="glass-panel"
                style={{
                  padding: '16px',
                  cursor: 'pointer',
                  borderColor: isSelected
                    ? 'var(--cobalt)'
                    : isProcessingThis
                      ? 'var(--cobalt)'
                      : 'var(--border-subtle)',
                  background: isSelected
                    ? 'rgba(0, 40, 255, 0.16)'
                    : isProcessingThis
                      ? 'rgba(0, 40, 255, 0.1)'
                      : 'var(--bg-card)',
                  transform: isSelected ? 'scale(1.02)' : 'none',
                  boxShadow: isSelected ? '0 0 16px var(--cobalt-glow)' : 'var(--shadow-sm)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Active progress bar top border */}
                {isProcessingThis && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'var(--cobalt)',
                    animation: 'shimmer 1.5s infinite linear'
                  }} />
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: isSelected ? 'var(--cobalt)' : 'var(--bg-tertiary)',
                    color: isSelected ? '#ffffff' : 'var(--cobalt-bright)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {getStageIcon(stage.stepNumber)}
                  </div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    0{stage.stepNumber}
                  </span>
                </div>

                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                  {stage.name}
                </h4>

                <p style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-silver)',
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  marginBottom: '10px'
                }}>
                  {stage.keyInsight}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)', fontSize: '0.72rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>
                    {stage.inputCount} in → <strong style={{ color: 'var(--cobalt-bright)' }}>{stage.outputCount} out</strong>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ffffff', fontWeight: 600 }}>
                    <CheckCircle2 size={12} color="var(--cobalt)" />
                    {stage.durationMs}ms
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep Inspection Panel for Selected Stage */}
      {selectedStage && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'var(--cobalt-subtle)',
                border: '1px solid var(--cobalt-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--cobalt-bright)'
              }}>
                {getStageIcon(selectedStage.stepNumber)}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-cobalt">Stage 0{selectedStage.stepNumber}</span>
                  <span style={{ fontSize: '0.75rem', color: '#ffffff', fontWeight: 600 }}>
                    Execution: {selectedStage.durationMs}ms
                  </span>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                  {selectedStage.name}
                </h3>
              </div>
            </div>

            <button
              onClick={() => setInspectModalOpen(true)}
              className="btn btn-secondary btn-sm"
            >
              <Eye size={14} color="var(--cobalt)" />
              Inspect Stage JSON & Payload Data
            </button>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-silver)', lineHeight: 1.6, marginBottom: '20px' }}>
            {selectedStage.description}
          </p>

          {/* Quick Data Sample Card */}
          <div style={{
            background: 'var(--bg-primary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            padding: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                {selectedStage.inspectableData.title}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {selectedStage.inspectableData.description}
              </span>
            </div>

            <pre style={{
              maxHeight: '220px',
              overflowY: 'auto',
              fontSize: '0.78rem',
              color: 'var(--cobalt-bright)',
              fontFamily: 'var(--font-mono)',
              lineHeight: 1.5
            }}>
              {JSON.stringify(selectedStage.inspectableData.data, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Inspect Stage Modal */}
      {inspectModalOpen && (
        <div className="modal-overlay" onClick={() => setInspectModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '800px', maxHeight: '85vh' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Code size={20} color="var(--cobalt)" />
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                    Payload Inspector: {selectedStage.name}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-silver)' }}>
                    {selectedStage.inspectableData.description}
                  </p>
                </div>
              </div>
              <button onClick={() => setInspectModalOpen(false)} className="btn btn-secondary btn-sm" style={{ padding: '6px', borderRadius: '50%' }}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <pre style={{
                background: 'var(--bg-primary)',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8rem',
                color: 'var(--cobalt-bright)',
                fontFamily: 'var(--font-mono)',
                overflowX: 'auto',
                lineHeight: 1.5
              }}>
                {JSON.stringify(selectedStage.inspectableData.data, null, 2)}
              </pre>
            </div>

            <div className="modal-footer">
              <button onClick={() => setInspectModalOpen(false)} className="btn btn-secondary btn-sm">
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
