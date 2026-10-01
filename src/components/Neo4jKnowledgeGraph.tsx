import React, { useState, useRef, useEffect, useMemo } from 'react';
import type { Cluster, InformationItem, UserProfile } from '../types';
import {
  Search, Info, X, ChevronLeft, ChevronRight, Sparkles, ExternalLink,
  Sliders, ArrowUpRight, CheckCircle2, Shield
} from 'lucide-react';

interface Neo4jKnowledgeGraphProps {
  clusters: Cluster[];
  allItems: InformationItem[];
  userProfile: UserProfile;
  onOpenImportance: (cluster: Cluster) => void;
  onOpenSources: (cluster: Cluster) => void;
}

interface GraphNode {
  id: string;
  label: string;
  type: "tool" | "cluster" | "entity" | "system" | "session";
  category: string;
  meaning: string;
  tags: string[];
  wildQuotes: { text: string; isDark: boolean }[];
  importance: number;
  radius: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  connectsTo: string[];
  clusterRef?: Cluster;
  itemRef?: InformationItem;
}

interface GraphEdge {
  source: string;
  target: string;
  relation: string;
}

export const Neo4jKnowledgeGraph: React.FC<Neo4jKnowledgeGraphProps> = ({
  clusters,
  allItems,
  userProfile,
  onOpenImportance,
  onOpenSources
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("agent-mode");
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [graphSearch, setGraphSearch] = useState<string>("");
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Curated knowledge topology matching Reference Image 1 ("Agent mode" system) + User Clusters
  const { nodes, edges } = useMemo(() => {
    const nodeMap = new Map<string, GraphNode>();
    const edgeList: GraphEdge[] = [];

    const width = 960;
    const height = 640;
    const cx = width / 2;
    const cy = height / 2;

    // 1. Central Hero Node: "Agent mode" (Exact match to Reference Image 1)
    nodeMap.set("agent-mode", {
      id: "agent-mode",
      label: "AGENT MODE",
      type: "tool",
      category: "TOOLS & ENVIRONMENT",
      meaning: "A preset bundling a permission mode with behavioral instructions injected into the system prompt. Can flip mid-session.",
      tags: ["plan mode", "accept-edits", "bypass permissions", "YOLO mode"],
      wildQuotes: [
        { text: "It keeps editing files when I just want a plan.", isDark: false },
        { text: "Switch to plan mode — it'll block writes and stay in research.", isDark: true },
        { text: "What about for the AFK run later?", isDark: false },
        { text: "Bypass mode, but only inside the sandbox.", isDark: true }
      ],
      importance: 98,
      radius: 28,
      x: cx,
      y: cy,
      vx: 0,
      vy: 0,
      connectsTo: ["agent", "permission-mode", "system-prompt", "session", "tool-call", "afk", "sandbox"]
    });

    // 2. Connected Nodes from Reference Image 1
    const refNodes = [
      {
        id: "agent",
        label: "AGENT",
        category: "EXECUTION CORES",
        meaning: "Autonomous LLM reasoning loop executing multi-step goals with tool invocation and error recovery.",
        tags: ["autonomous", "react-loop", "subagent", "orchestration"],
        wildQuotes: [
          { text: "Spawning subagents for parallel research sped up ingest 4x.", isDark: false },
          { text: "Always enforce bounded iteration loops.", isDark: true }
        ],
        x: cx - 140,
        y: cy + 40,
        radius: 22,
        connectsTo: ["agent-mode", "session"]
      },
      {
        id: "permission-mode",
        label: "PERMISSION MODE",
        category: "SAFETY PROTOCOLS",
        meaning: "Gating policy controlling destructive actions: CLI commands, disk writes, and external web calls.",
        tags: ["approval-gate", "read-only", "elevated", "sandbox"],
        wildQuotes: [
          { text: "Never push to git main before asking explicit permission.", isDark: true },
          { text: "Auto-approve read operations; require human gate on mutations.", isDark: false }
        ],
        x: cx - 50,
        y: cy - 160,
        radius: 18,
        connectsTo: ["agent-mode", "sandbox"]
      },
      {
        id: "system-prompt",
        label: "SYSTEM PROMPT",
        category: "BEHAVIORAL SPEC",
        meaning: "Foundational persona constraints, knowledge items, and operational guidelines loaded at session initialization.",
        tags: ["markdown", "few-shot", "epistemic-tokens", "context-budget"],
        wildQuotes: [
          { text: "Keep instructions atomic and declarative.", isDark: false },
          { text: "Dynamic context injection prevents hallucinations.", isDark: true }
        ],
        x: cx + 160,
        y: cy - 120,
        radius: 20,
        connectsTo: ["agent-mode", "session"]
      },
      {
        id: "session",
        label: "SESSION",
        category: "RUNTIME STATE",
        meaning: "Persistent SQLite conversation trajectory containing step history, message queues, and memory snapshots.",
        tags: ["history", "replay", "cache", "jsonl"],
        wildQuotes: [
          { text: "Session state preserved across IDE reboots.", isDark: false },
          { text: "Context compaction triggers when prompt exceeds 80k tokens.", isDark: true }
        ],
        x: cx - 10,
        y: cy + 120,
        radius: 22,
        connectsTo: ["agent-mode", "agent", "tool-call"]
      },
      {
        id: "tool-call",
        label: "TOOL CALL",
        category: "ENVIRONMENT HOOKS",
        meaning: "Standardized JSON Schema function invocations executed via Model Context Protocol or native host APIs.",
        tags: ["mcp-server", "filesystem", "bash", "browser"],
        wildQuotes: [
          { text: "Calling ripgrep directly is 50x faster than reading entire trees.", isDark: false },
          { text: "Always validate return JSON against TypeScript types.", isDark: true }
        ],
        x: cx + 80,
        y: cy + 160,
        radius: 24,
        connectsTo: ["agent-mode", "session"]
      },
      {
        id: "sandbox",
        label: "SANDBOX",
        category: "CONTAINMENT",
        meaning: "Ephemeral isolated process jail restricting filesystem access and unauthorized network egress.",
        tags: ["docker", "chroot", "seccomp", "virtualized"],
        wildQuotes: [
          { text: "Run untrusted build scripts strictly inside the sandbox.", isDark: true },
          { text: "Mounted workspace is read-only outside src/.", isDark: false }
        ],
        x: cx - 110,
        y: cy - 110,
        radius: 18,
        connectsTo: ["agent-mode", "permission-mode"]
      },
      {
        id: "afk",
        label: "AFK",
        category: "AUTONOMOUS MODES",
        meaning: "Unattended autonomous execution queue with strict safety triggers and heartbeat check-ins.",
        tags: ["background-daemon", "cron", "webhook", "heartbeat"],
        wildQuotes: [
          { text: "Let it run overnight on the benchmark evaluation.", isDark: false },
          { text: "Auto-abort if error count exceeds 3 consecutive runs.", isDark: true }
        ],
        x: cx - 180,
        y: cy - 70,
        radius: 16,
        connectsTo: ["agent-mode"]
      }
    ];

    refNodes.forEach(rn => {
      nodeMap.set(rn.id, {
        id: rn.id,
        label: rn.label,
        type: "system",
        category: rn.category,
        meaning: rn.meaning,
        tags: rn.tags,
        wildQuotes: rn.wildQuotes,
        importance: 85,
        radius: rn.radius,
        x: rn.x,
        y: rn.y,
        vx: 0,
        vy: 0,
        connectsTo: rn.connectsTo
      });

      rn.connectsTo.forEach(targetId => {
        edgeList.push({
          source: rn.id,
          target: targetId,
          relation: "CONNECTS_TO"
        });
      });
    });

    // 3. User Clusters from Ingested Intelligence
    clusters.slice(0, 5).forEach((c, idx) => {
      const angle = (idx / 5) * 2 * Math.PI + 0.6;
      const radiusDist = 260;
      const clusterNodeId = `cluster-${c.id}`;

      nodeMap.set(clusterNodeId, {
        id: clusterNodeId,
        label: c.title.length > 20 ? c.title.substring(0, 18) + '...' : c.title,
        type: "cluster",
        category: "INTELLIGENCE CLUSTERS",
        meaning: `Synthesized intelligence cluster with ${c.items.length} corroborating records. Importance score: ${c.importanceScore}/100.`,
        tags: [c.category, c.priority, `${c.items.length} sources`, `${c.importanceScore} pts`],
        wildQuotes: [
          { text: c.summary.length > 80 ? c.summary.substring(0, 78) + '...' : c.summary, isDark: false },
          { text: `Importance score: ${c.importanceScore}/100. Entities: ${c.keyEntities.slice(0, 2).join(', ')}.`, isDark: true }
        ],
        importance: c.importanceScore,
        radius: c.priority === "critical" ? 22 : 18,
        x: cx + Math.cos(angle) * radiusDist,
        y: cy + Math.sin(angle) * radiusDist,
        vx: 0,
        vy: 0,
        connectsTo: ["agent-mode", "session"],
        clusterRef: c
      });

      edgeList.push({
        source: clusterNodeId,
        target: "agent-mode",
        relation: "SYNTHESIZED_BY"
      });
    });

    return { nodes: Array.from(nodeMap.values()), edges: edgeList };
  }, [clusters]);

  const selectedNode = useMemo(() => {
    return nodes.find(n => n.id === selectedNodeId) || nodes[0];
  }, [nodes, selectedNodeId]);

  const nodeMap = useMemo(() => {
    const map = new Map<string, GraphNode>();
    nodes.forEach(n => map.set(n.id, n));
    return map;
  }, [nodes]);

  // Filtered nodes
  const visibleNodes = useMemo(() => {
    if (!graphSearch) return nodes;
    const q = graphSearch.toLowerCase();
    return nodes.filter(n => n.label.toLowerCase().includes(q) || n.meaning.toLowerCase().includes(q));
  }, [nodes, graphSearch]);

  const visibleNodeIds = useMemo(() => new Set(visibleNodes.map(n => n.id)), [visibleNodes]);

  // ============================================================
  // CANVAS RENDER LOOP (Exact match to Reference Image 1)
  // Warm Off-White / Bone Canvas (#F4F4F0) with Pitch Charcoal Nodes
  // ============================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = 960;
    const height = 640;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let animationFrameId: number;
    let t = 0;

    const render = () => {
      t += 0.02;

      // Deep Obsidian Background matching single color theme (#060810)
      ctx.fillStyle = "#060810";
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(pan.x, pan.y);
      ctx.scale(zoom, zoom);

      // Faint atmospheric constellation circles
      ctx.fillStyle = "rgba(0, 40, 255, 0.02)";
      [
        { x: 120, y: 160, r: 60 },
        { x: 260, y: 320, r: 40 },
        { x: 80, y: 440, r: 35 },
        { x: 380, y: 180, r: 50 },
        { x: 740, y: 220, r: 70 },
        { x: 840, y: 420, r: 55 }
      ].forEach(c => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 1. Draw Edges (Delicate Hairline Connectors with moving data packets)
      edges.forEach((edge, idx) => {
        const na = nodeMap.get(edge.source);
        const nb = nodeMap.get(edge.target);
        if (!na || !nb) return;
        if (!visibleNodeIds.has(na.id) && !visibleNodeIds.has(nb.id)) return;

        const isConnected = selectedNode && (edge.source === selectedNode.id || edge.target === selectedNode.id);

        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);

        if (isConnected) {
          ctx.strokeStyle = "#0028FF"; // Electric Cobalt Blue for active connections
          ctx.lineWidth = 1.6;
          ctx.setLineDash([3, 3]);
        } else {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
          ctx.lineWidth = 0.8;
          ctx.setLineDash([2, 4]);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Animated telemetry pulse packets moving along edges
        const pulseProgress = ((t * 0.6 + idx * 0.14) % 1);
        const pulseX = na.x + (nb.x - na.x) * pulseProgress;
        const pulseY = na.y + (nb.y - na.y) * pulseProgress;

        ctx.beginPath();
        ctx.arc(pulseX, pulseY, isConnected ? 2.5 : 1.6, 0, Math.PI * 2);
        ctx.fillStyle = isConnected ? "#0028FF" : "rgba(255, 255, 255, 0.4)";
        ctx.fill();
      });

      // 2. Draw Nodes (Deep Slate, Pure White & Electric Cobalt)
      visibleNodes.forEach(node => {
        const isSelected = selectedNode?.id === node.id;
        const isHovered = hoveredNode?.id === node.id;

        // Subtle organic breathing
        const breathe = Math.sin(t * 1.5 + (node.importance * 0.1)) * 1.2;
        const currentRadius = node.radius + (isSelected ? 3 : 0);

        // Soft Halo Ring for Selected / Hovered
        if (isSelected || isHovered) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, currentRadius + 8 + breathe, 0, Math.PI * 2);
          ctx.strokeStyle = isSelected ? "#0028FF" : "rgba(255, 255, 255, 0.2)";
          ctx.lineWidth = isSelected ? 1.5 : 1;
          ctx.stroke();
        }

        // Main Node Circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);

        // Shading based on type
        if (node.id === "agent-mode" || isSelected) {
          ctx.fillStyle = "#0028FF"; // Electric Cobalt for hero
        } else if (node.type === "cluster") {
          ctx.fillStyle = "#1E293B"; // Dark Slate
        } else {
          ctx.fillStyle = "#0F172A"; // Medium Slate
        }
        ctx.fill();

        // Delicate inner ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isSelected ? "#FFFFFF" : node.type === "cluster" ? "#0028FF" : "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = isSelected ? 2 : 1;
        ctx.stroke();

        // Node Label Text (Uppercase Swiss Sans-Serif)
        ctx.font = isSelected ? "bold 10px Inter, sans-serif" : "9px Inter, sans-serif";
        ctx.fillStyle = isSelected ? "#FFFFFF" : "#94A3B8";
        ctx.textAlign = "center";
        ctx.fillText(node.label, node.x, node.y - currentRadius - 8);
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [visibleNodes, edges, selectedNode, hoveredNode, zoom, pan, nodeMap]);

  // Mouse Handlers for dragging and selection
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clickX = (e.clientX - rect.left - pan.x) / zoom;
    const clickY = (e.clientY - rect.top - pan.y) / zoom;

    const found = visibleNodes.find(n => {
      const dx = n.x - clickX;
      const dy = n.y - clickY;
      return Math.sqrt(dx * dx + dy * dy) <= n.radius + 10;
    });

    if (found) {
      setSelectedNodeId(found.id);
    } else {
      setIsDragging(true);
      dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const moveX = (e.clientX - rect.left - pan.x) / zoom;
    const moveY = (e.clientY - rect.top - pan.y) / zoom;

    if (isDragging) {
      setPan({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y
      });
      return;
    }

    const found = visibleNodes.find(n => {
      const dx = n.x - moveX;
      const dy = n.y - moveY;
      return Math.sqrt(dx * dx + dy * dy) <= n.radius + 8;
    });
    setHoveredNode(found || null);
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };

  const currentIndex = nodes.findIndex(n => n.id === selectedNode.id);
  const handlePrevNode = () => {
    const prev = (currentIndex - 1 + nodes.length) % nodes.length;
    setSelectedNodeId(nodes[prev].id);
  };
  const handleNextNode = () => {
    const next = (currentIndex + 1) % nodes.length;
    setSelectedNodeId(nodes[next].id);
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 380px',
      background: '#060810',
      borderRadius: '24px',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 16px 50px rgba(0, 0, 0, 0.5)',
      minHeight: '700px'
    }}>
      {/* ============================================================
          LEFT CANVAS PANE (Reference Image 1 Canvas Match in Dark Palette)
          ============================================================ */}
      <div style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Top-Left Search Button */}
        <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: '#0D111E',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            cursor: 'pointer'
          }}>
            <Search size={16} />
          </div>

          <input
            type="text"
            placeholder="Search nodes..."
            value={graphSearch}
            onChange={e => setGraphSearch(e.target.value)}
            style={{
              height: '38px',
              padding: '0 16px',
              borderRadius: '999px',
              background: '#0D111E',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              fontSize: '0.8rem',
              color: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              outline: 'none',
              width: graphSearch ? '180px' : '120px',
              transition: 'width 0.2s ease'
            }}
          />
        </div>

        {/* Top-Right Info Button */}
        <div style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 10 }}>
          <div
            title="InfoLens Neo4j Semantic Graph"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#0D111E',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              cursor: 'pointer'
            }}
          >
            <Info size={16} />
          </div>
        </div>

        {/* Graph Canvas */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          style={{
            width: '100%',
            height: '700px',
            cursor: isDragging ? 'grabbing' : hoveredNode ? 'pointer' : 'grab',
            display: 'block'
          }}
        />

        {/* Bottom Status Ticker */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '24px',
          fontSize: '0.72rem',
          color: '#94A3B8',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ color: '#0028FF', fontWeight: 700 }}>✦ LIVE GRAPH ACTIVE</span>
          <span>•</span>
          <span>{nodes.length} KNOWLEDGE NODES</span>
          <span>•</span>
          <span>CLICK ANY NODE TO INSPECT</span>
        </div>
      </div>

      {/* ============================================================
          RIGHT INSPECTOR DRAWER (Unified Dark Obsidian Palette)
          ============================================================ */}
      <div style={{
        background: '#0A0D18',
        borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxHeight: '700px',
        overflowY: 'auto'
      }}>
        <div>
          {/* Drawer Top Header (TOOLS & ENVIRONMENT · 32/68 · (X)) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <span style={{
              fontSize: '0.68rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 800,
              color: '#0028FF'
            }}>
              {selectedNode.category}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FFFFFF', fontFamily: 'JetBrains Mono' }}>
                {currentIndex + 1} <span style={{ color: '#64748B' }}>/ {nodes.length}</span>
              </span>
              <div
                onClick={() => setSelectedNodeId("agent-mode")}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  background: '#121828',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#94A3B8'
                }}
              >
                <X size={14} />
              </div>
            </div>
          </div>

          {/* Large Bold Swiss Title */}
          <h2 style={{
            fontSize: '2.2rem',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            margin: '0 0 10px',
            color: '#FFFFFF'
          }}>
            {selectedNode.label.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
          </h2>

          {/* Subtitle / Tags line */}
          <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginBottom: '20px' }}>
            {selectedNode.tags.join(' · ')}
          </div>

          {/* Definition Paragraph */}
          <p style={{
            fontSize: '0.9rem',
            lineHeight: 1.6,
            color: '#CBD5E1',
            margin: '0 0 28px',
            fontWeight: 400
          }}>
            {selectedNode.meaning}
          </p>

          {/* Section: HEARD IN THE WILD */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{
              fontSize: '0.68rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 800,
              color: '#64748B',
              marginBottom: '14px'
            }}>
              HEARD IN THE WILD
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selectedNode.wildQuotes.map((q, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: q.isDark ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    background: q.isDark ? '#0028FF' : '#121828',
                    color: '#FFFFFF',
                    borderRadius: '14px',
                    padding: '10px 14px',
                    fontSize: '0.8rem',
                    lineHeight: 1.45,
                    border: q.isDark ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: q.isDark ? '0 4px 16px rgba(0, 40, 255, 0.4)' : 'none'
                  }}
                >
                  {q.text}
                </div>
              ))}
            </div>
          </div>

          {/* Section: CONNECTS TO */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{
              fontSize: '0.68rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 800,
              color: '#64748B',
              marginBottom: '12px'
            }}>
              CONNECTS TO
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {selectedNode.connectsTo.map((targetId, idx) => {
                const targetNode = nodeMap.get(targetId);
                const label = targetNode ? targetNode.label.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()) : targetId;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (nodeMap.has(targetId)) {
                        setSelectedNodeId(targetId);
                      }
                    }}
                    style={{
                      background: '#121828',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '999px',
                      padding: '6px 14px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#0028FF';
                      e.currentTarget.style.borderColor = '#0028FF';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#121828';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Drawer Bottom Bar: FULL DEFINITION / PREV / NEXT */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {selectedNode.clusterRef ? (
            <button
              onClick={() => onOpenImportance(selectedNode.clusterRef!)}
              style={{
                background: 'none',
                border: 'none',
                color: '#0028FF',
                fontSize: '0.75rem',
                fontWeight: 800,
                cursor: 'pointer',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              INSPECT IMPORTANCE SCORE ↗
            </button>
          ) : (
            <span style={{
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 800,
              color: '#94A3B8'
            }}>
              FULL DEFINITION
            </span>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handlePrevNode}
              style={{
                background: '#121828',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#FFFFFF',
                cursor: 'pointer',
                letterSpacing: '0.05em'
              }}
            >
              PREV
            </button>
            <button
              onClick={handleNextNode}
              style={{
                background: '#0028FF',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#FFFFFF',
                cursor: 'pointer',
                letterSpacing: '0.05em',
                boxShadow: '0 0 12px rgba(0, 40, 255, 0.5)'
              }}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
