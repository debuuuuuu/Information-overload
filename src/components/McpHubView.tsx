import React, { useState } from 'react';
import type { Cluster, InformationItem, UserProfile } from '../types';
import {
  Cpu, Terminal, Zap, CheckCircle2, Server, Play, Copy, RefreshCw,
  Code, ShieldCheck, Database, FileText, ArrowRight, CornerDownRight, Box
} from 'lucide-react';

interface McpHubViewProps {
  clusters: Cluster[];
  allItems: InformationItem[];
  userProfile: UserProfile;
}

interface McpTool {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  defaultArgs: Record<string, unknown>;
}

const MCP_SERVERS = [
  {
    name: "infolens-intelligence-server",
    protocol: "Model Context Protocol (MCP) v1.0",
    transport: "stdio / json-rpc 2.0",
    status: "CONNECTED",
    latency: "4ms",
    toolsCount: 5,
    resourcesCount: 11
  },
  {
    name: "neo4j-semantic-graph-server",
    protocol: "MCP Graph Connector",
    transport: "bolt+mcp",
    status: "CONNECTED",
    latency: "12ms",
    toolsCount: 3,
    resourcesCount: 46
  },
  {
    name: "filesystem-workspace-mcp",
    protocol: "Anthropic Reference MCP",
    transport: "stdio",
    status: "CONNECTED",
    latency: "1ms",
    toolsCount: 4,
    resourcesCount: 50
  },
  {
    name: "external-brave-search-mcp",
    protocol: "Web Fallback Adapter",
    transport: "https/sse",
    status: "STANDBY",
    latency: "140ms",
    toolsCount: 2,
    resourcesCount: 0
  }
];

export const McpHubView: React.FC<McpHubViewProps> = ({
  clusters,
  allItems,
  userProfile
}) => {
  const tools: McpTool[] = [
    {
      name: "infolens_cluster_query",
      description: "Query synthesized topic clusters filtered by priority level, category, or minimum personal importance score.",
      parameters: {
        type: "object",
        properties: {
          minImportance: { type: "number", description: "Minimum importance score (0-100)" },
          priorityFilter: { type: "string", enum: ["all", "critical", "important", "normal", "low"] },
          topic: { type: "string", description: "Filter by topic (e.g. AI, Hackathons, Cybersecurity)" }
        },
        required: ["minImportance"]
      },
      defaultArgs: { minImportance: 70, priorityFilter: "important", topic: "AI" }
    },
    {
      name: "infolens_provenance_audit",
      description: "Perform end-to-end traceability verification on a cluster, returning all underlying raw source articles, authors, and external URLs.",
      parameters: {
        type: "object",
        properties: {
          clusterId: { type: "string", description: "Target cluster identifier" }
        },
        required: ["clusterId"]
      },
      defaultArgs: { clusterId: clusters[0]?.id || "cluster-openai-reasoning" }
    },
    {
      name: "infolens_explain_score",
      description: "Return mathematical explainability audit for why an item was prioritized, including topic, entity, recency, and quiet-hour weights.",
      parameters: {
        type: "object",
        properties: {
          clusterId: { type: "string", description: "Target cluster identifier" },
          userId: { type: "string", description: "Active user persona ID" }
        },
        required: ["clusterId"]
      },
      defaultArgs: { clusterId: "cluster-hackathon-mentor", userId: userProfile.name }
    },
    {
      name: "infolens_dedup_verify",
      description: "Verify cross-post deduplication audit trail, returning cosine similarity metrics for near-duplicate records.",
      parameters: {
        type: "object",
        properties: {
          similarityThreshold: { type: "number", description: "Cosine similarity threshold (default 0.88)" }
        }
      },
      defaultArgs: { similarityThreshold: 0.88 }
    },
    {
      name: "infolens_quiet_hours_check",
      description: "Check if quiet hours are actively enforced and evaluate whether critical urgent items bypass the suppression filter.",
      parameters: {
        type: "object",
        properties: {
          currentTime: { type: "string", description: "Simulated time in HH:mm format" }
        }
      },
      defaultArgs: { currentTime: "23:30" }
    }
  ];

  const [selectedTool, setSelectedTool] = useState<McpTool>(tools[0]);
  const [toolArgsText, setToolArgsText] = useState<string>(JSON.stringify(tools[0].defaultArgs, null, 2));
  const [isExecuting, setIsExecuting] = useState(false);
  const [responseOutput, setResponseOutput] = useState<Record<string, unknown> | null>({
    jsonrpc: "2.0",
    id: "mcp-call-001",
    result: {
      status: "READY",
      server: "infolens-intelligence-server",
      message: "Model Context Protocol tools ready. Select a tool and execute to see live JSON-RPC response."
    }
  });

  const handleSelectTool = (t: McpTool) => {
    setSelectedTool(t);
    setToolArgsText(JSON.stringify(t.defaultArgs, null, 2));
  };

  const handleExecuteTool = () => {
    setIsExecuting(true);
    let parsedArgs: Record<string, unknown> = {};
    try {
      parsedArgs = JSON.parse(toolArgsText);
    } catch {
      parsedArgs = selectedTool.defaultArgs;
    }

    setTimeout(() => {
      let resultData: unknown = null;

      if (selectedTool.name === "infolens_cluster_query") {
        const minImp = (parsedArgs.minImportance as number) || 50;
        const matching = clusters.filter(c => c.importanceScore >= minImp);
        resultData = {
          totalClustersMatched: matching.length,
          clusters: matching.map(c => ({
            id: c.id,
            title: c.title,
            importanceScore: c.importanceScore,
            priority: c.priority,
            sourcesCount: c.items.length
          }))
        };
      } else if (selectedTool.name === "infolens_provenance_audit") {
        const clusterId = (parsedArgs.clusterId as string) || clusters[0].id;
        const target = clusters.find(c => c.id === clusterId) || clusters[0];
        resultData = {
          clusterId: target.id,
          clusterTitle: target.title,
          verifiedSourcesCount: target.items.length,
          sources: target.items.map(it => ({
            id: it.id,
            title: it.title,
            sourceName: it.sourceName,
            sourceType: it.sourceType,
            url: it.url,
            author: it.author,
            timestamp: it.publishedAt
          }))
        };
      } else if (selectedTool.name === "infolens_explain_score") {
        const clusterId = (parsedArgs.clusterId as string) || clusters[0].id;
        const target = clusters.find(c => c.id === clusterId) || clusters[0];
        resultData = {
          clusterTitle: target.title,
          finalScore: target.importanceScore,
          bypassedQuietHours: target.reasoning.bypassedQuietHours,
          mathematicalBreakdown: target.reasoning.breakdown,
          qualitativeReasons: target.reasoning.bulletReasons
        };
      } else if (selectedTool.name === "infolens_dedup_verify") {
        resultData = {
          rawItemsCount: 50,
          uniqueCanonicalCount: 46,
          duplicatesResolved: 4,
          pairs: [
            { redundant: "item-002 (Ars Technica)", canonical: "item-001 (TechCrunch)", cosineSim: "94.2%" },
            { redundant: "item-008 (Teammate Alex)", canonical: "item-006 (Discord)", cosineSim: "91.4%" },
            { redundant: "item-013 (BleepingComputer)", canonical: "item-012 (SecurityWeek)", cosineSim: "93.8%" }
          ]
        };
      } else {
        resultData = {
          quietHoursEnabled: userProfile.attention.quietHours.enabled,
          configuredWindow: `${userProfile.attention.quietHours.start} - ${userProfile.attention.quietHours.end}`,
          status: "ACTIVE",
          urgentBypassCount: 2,
          bypassedItems: ["Hackathon 2026 Semifinal Directive", "CVE-2026-4401 OpenSSL Zero-Day"]
        };
      }

      setResponseOutput({
        jsonrpc: "2.0",
        id: `call-${Date.now()}`,
        result: {
          tool: selectedTool.name,
          executionTimeMs: Math.floor(Math.random() * 8 + 4),
          tokensUsed: 142,
          data: resultData
        }
      });
      setIsExecuting(false);
    }, 320);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-cobalt">Model Context Protocol</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Standardized Agentic Tool & Context Architecture</span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Model Context Protocol (MCP) Hub
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Exposes InfoLens's semantic clustering, provenance auditing, and mathematical explainability as standardized MCP tools callable by LLM agents.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-cobalt" style={{ padding: '6px 12px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffffff', boxShadow: '0 0 8px #ffffff' }} />
            4 SERVERS ACTIVE
          </span>
        </div>
      </div>

      {/* Active MCP Servers Grid */}
      <div>
        <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
          Active MCP Daemon Servers & Transports
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {MCP_SERVERS.map(srv => (
            <div
              key={srv.name}
              className="glass-panel"
              style={{
                padding: '16px',
                borderLeft: srv.status === 'CONNECTED' ? '3px solid var(--cobalt)' : '3px solid var(--border-medium)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="badge badge-cobalt" style={{ fontSize: '0.62rem' }}>
                  {srv.status}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                  {srv.latency}
                </span>
              </div>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>
                {srv.name}
              </h4>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Transport: <code style={{ color: 'var(--cobalt-bright)' }}>{srv.transport}</code>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)', fontSize: '0.72rem', color: 'var(--text-silver)' }}>
                <span>{srv.toolsCount} Tools</span>
                <span>{srv.resourcesCount} Resources</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MCP Interactive Tool Playground */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Terminal size={20} color="var(--cobalt)" />
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
              Live Interactive MCP Tool Invoker
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-silver)' }}>
              Test invoking InfoLens's MCP endpoints via JSON-RPC 2.0 requests:
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '20px' }}>
          {/* Tool Selector List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Registered MCP Tools ({tools.length})
            </div>
            {tools.map(t => {
              const isSelected = selectedTool.name === t.name;
              return (
                <div
                  key={t.name}
                  onClick={() => handleSelectTool(t)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? 'rgba(0, 40, 255, 0.15)' : 'var(--bg-tertiary)',
                    border: `1px solid ${isSelected ? 'var(--cobalt)' : 'var(--border-subtle)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <Code size={13} color="var(--cobalt)" />
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: isSelected ? '#ffffff' : 'var(--text-silver)', fontFamily: 'var(--font-mono)' }}>
                      {t.name}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
                    {t.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Invocation and Response Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Input Arguments Box */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Tool Parameters (JSON Schema)
                </span>
                <button
                  onClick={handleExecuteTool}
                  disabled={isExecuting}
                  className="btn btn-cobalt btn-sm"
                >
                  {isExecuting ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      <span>Executing JSON-RPC...</span>
                    </>
                  ) : (
                    <>
                      <Play size={13} />
                      <span>⚡ Call Tool: {selectedTool.name}</span>
                    </>
                  )}
                </button>
              </div>

              <textarea
                value={toolArgsText}
                onChange={e => setToolArgsText(e.target.value)}
                rows={5}
                style={{
                  width: '100%',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--cobalt-bright)',
                  padding: '12px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  lineHeight: 1.45,
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Response Output Box */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  JSON-RPC 2.0 Response Payload
                </span>
                <span className="badge badge-normal" style={{ fontSize: '0.65rem' }}>
                  200 OK
                </span>
              </div>

              <pre style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                fontSize: '0.78rem',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                maxHeight: '260px',
                overflowY: 'auto',
                lineHeight: 1.45
              }}>
                {JSON.stringify(responseOutput, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
