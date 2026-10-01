import React, { useEffect, useRef } from 'react';

interface AsciiBackgroundHeroProps {
  interactive?: boolean;
  opacity?: number;
}

export const AsciiBackgroundHero: React.FC<AsciiBackgroundHeroProps> = ({
  interactive = true,
  opacity = 0.65
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean; targetX: number; targetY: number }>({
    x: -999,
    y: -999,
    targetX: -999,
    targetY: -999,
    active: false
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || 750;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Calm, elegant ASCII glyph ramp - delicate and non-glitchy
    const glyphRamp = [" ", "·", ".", ":", "-", "+", "~", "*", "•", "◈"];

    // Project schematic ASCII badges placed softly in the canvas perimeter
    const architecturalNodes = [
      { text: "[MCP INGESTION // 01]", colFactor: 0.10, rowFactor: 0.18, beacon: true },
      { text: "[SEMANTIC GRAPH // v2026]", colFactor: 0.80, rowFactor: 0.20, beacon: true },
      { text: "[KNOWLEDGE CLUSTERS]", colFactor: 0.08, rowFactor: 0.74, beacon: false },
      { text: "[PROVENANCE: 100%]", colFactor: 0.84, rowFactor: 0.76, beacon: false },
      { text: "──► ( COGNITIVE TOPOLOGY )", colFactor: 0.74, rowFactor: 0.48, beacon: true },
      { text: "[NOISE REJECTION: 88%]", colFactor: 0.06, rowFactor: 0.46, beacon: false }
    ];

    let t = 0;

    const render = () => {
      t += 0.012; // Smooth cinematic pace

      // Smooth cursor lerp
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.1;
      m.y += (m.targetY - m.y) * 0.1;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);

      const fontSize = 11;
      const charWidth = fontSize * 0.65;
      const charHeight = fontSize * 1.35;

      ctx.font = `${fontSize}px 'JetBrains Mono', 'Fira Code', monospace`;
      ctx.textBaseline = 'top';

      const cols = Math.floor(w / charWidth);
      const rows = Math.floor(h / charHeight);

      const centerX = cols / 2;
      const centerY = rows * 0.44;

      // Draw subtle wave grid and animated ASCII conduits
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * charWidth;
          const y = r * charHeight;

          // Normalized distance from center (to keep center area clean for text!)
          const dxCenter = (c - centerX) / (cols * 0.44);
          const dyCenter = (r - centerY) / (rows * 0.42);
          const centerDistSq = dxCenter * dxCenter + dyCenter * dyCenter;

          // If inside text focal area, strongly fade out to protect readability
          const centerMask = Math.min(1, Math.max(0, (centerDistSq - 0.32) * 2.2));

          // Smooth harmonic wave calculation
          const wave1 = Math.sin(c * 0.045 + t * 0.9) * 0.5 + 0.5;
          const wave2 = Math.cos(r * 0.065 - t * 0.7) * 0.5 + 0.5;
          const wave3 = Math.sin((c * 0.02 + r * 0.035) + t * 0.4) * 0.5 + 0.5;
          const waveIntensity = (wave1 * 0.45 + wave2 * 0.35 + wave3 * 0.2);

          // Distance to cursor
          const dxMouse = x - m.x;
          const dyMouse = y - m.y;
          const mouseDist = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          const mouseRadius = 200;
          const mouseGlow = mouseDist < mouseRadius ? Math.pow(1 - mouseDist / mouseRadius, 2) : 0;
          
          // Hydrodynamic ripple wave from cursor
          const mouseRipple = mouseDist < mouseRadius * 1.5 
            ? Math.sin(mouseDist * 0.05 - t * 3.5) * Math.exp(-mouseDist / 120) * 0.35
            : 0;

          // Overall brightness
          const finalIntensity = (waveIntensity + mouseRipple) * centerMask + mouseGlow * 0.65;

          // Horizontal data conduit packet animation on certain rows
          const isConduitRow = r === Math.floor(rows * 0.12) || r === Math.floor(rows * 0.86);
          const packetPos = (t * 18 + (r % 2 === 0 ? 0 : 25)) % cols;
          const isPacket = isConduitRow && Math.abs(c - packetPos) < 2.5;

          if (isPacket && centerMask > 0.4) {
            ctx.fillStyle = '#0028FF';
            ctx.fillText('►', x, y);
          } else if (finalIntensity > 0.30) {
            const charIndex = Math.min(
              glyphRamp.length - 1,
              Math.floor((finalIntensity - 0.30) / 0.70 * (glyphRamp.length - 1))
            );
            const glyph = glyphRamp[charIndex];

            if (glyph && glyph !== " ") {
              if (mouseGlow > 0.2) {
                ctx.fillStyle = `rgba(0, 40, 255, ${Math.min(0.85, 0.35 + mouseGlow * 0.6)})`;
              } else if (finalIntensity > 0.72) {
                ctx.fillStyle = `rgba(203, 213, 225, ${(finalIntensity * 0.28).toFixed(3)})`;
              } else {
                ctx.fillStyle = `rgba(0, 40, 255, ${(finalIntensity * 0.18).toFixed(3)})`;
              }
              ctx.fillText(glyph, x, y);
            }
          }
        }
      }

      // Render architectural project nodes around margins
      architecturalNodes.forEach(node => {
        const targetC = Math.floor(cols * node.colFactor);
        const targetR = Math.floor(rows * node.rowFactor);
        const x = targetC * charWidth;
        const y = targetR * charHeight;

        if (node.beacon) {
          const beaconPulse = Math.sin(t * 3 + node.colFactor * 10) * 0.5 + 0.5;
          ctx.fillStyle = `rgba(0, 40, 255, ${0.4 + beaconPulse * 0.6})`;
          ctx.fillText('● ', x - 12, y);
        }

        ctx.fillStyle = 'rgba(148, 163, 184, 0.42)';
        ctx.fillText(node.text, x, y);
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -999;
      mouseRef.current.targetY = -999;
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [interactive]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
        opacity: opacity,
        maskImage: 'radial-gradient(ellipse at 50% 50%, black 65%, rgba(0,0,0,0.3) 85%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 65%, rgba(0,0,0,0.3) 85%, transparent 100%)'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </div>
  );
};
