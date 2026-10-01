import React, { useEffect, useRef, useState } from 'react';

interface AnimatedAsciiCanvasProps {
  width?: number;
  height?: number;
  density?: 'fine' | 'medium';
  interactive?: boolean;
}

export const AnimatedAsciiCanvas: React.FC<AnimatedAsciiCanvasProps> = ({
  width = 640,
  height = 340,
  density = 'fine',
  interactive = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activePreset, setActivePreset] = useState<'matrix' | 'waves' | 'hands'>('waves');
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -100, y: -100, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const chars = " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
    const charLen = chars.length;

    const fontSize = density === 'fine' ? 10 : 13;
    const charWidth = fontSize * 0.6;
    const charHeight = fontSize;

    const cols = Math.floor(width / charWidth);
    const rows = Math.floor(height / charHeight);

    let animationId: number;
    let t = 0;

    const render = () => {
      t += 0.035;
      ctx.fillStyle = '#05070D';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      ctx.textBaseline = 'top';

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * charWidth;
          const y = r * charHeight;

          // Compute distance to cursor for ripple
          const dx = x - mx;
          const dy = y - my;
          const distToMouse = Math.sqrt(dx * dx + dy * dy);
          const mouseFactor = distToMouse < 90 ? (1 - distToMouse / 90) * 1.8 : 0;

          let val = 0;

          if (activePreset === 'waves') {
            // Harmonic wave formula
            const w1 = Math.sin(c * 0.08 + t * 1.5) * 0.5 + 0.5;
            const w2 = Math.cos(r * 0.12 - t * 0.8) * 0.5 + 0.5;
            const w3 = Math.sin((c + r) * 0.06 + t) * 0.5 + 0.5;
            val = (w1 * 0.4 + w2 * 0.3 + w3 * 0.3) + mouseFactor;
          } else if (activePreset === 'matrix') {
            // Digital rainfall
            const stream = (Math.sin(c * 3.7 + t * 3 + r * 0.2) + 1) / 2;
            val = Math.pow(stream, 3) * 1.2 + mouseFactor;
          } else {
            // Cybernetic double-node attraction
            const d1 = Math.hypot(c - cols * 0.35, r - rows * 0.5);
            const d2 = Math.hypot(c - cols * 0.65, r - rows * 0.5);
            const ring1 = Math.sin(d1 * 0.3 - t * 2);
            const ring2 = Math.sin(d2 * 0.3 + t * 2);
            val = Math.max(0, (ring1 + ring2) * 0.5) + mouseFactor;
          }

          val = Math.max(0, Math.min(1, val));
          const charIndex = Math.floor(val * (charLen - 1));
          const char = chars[charIndex];

          // Dynamic Color Shading (Electric Royal Cobalt Blue + Monochrome White)
          if (mouseFactor > 0.4 || val > 0.78) {
            ctx.fillStyle = '#0028FF'; // Electric Cobalt for energetic peaks
          } else if (val > 0.55) {
            ctx.fillStyle = '#FFFFFF'; // Bright white
          } else if (val > 0.3) {
            ctx.fillStyle = '#64748B'; // Slate silver
          } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'; // Dim ambient
          }

          ctx.fillText(char, x, y);
        }
      }

      // Overlay cybernetic telemetry banner at bottom
      ctx.fillStyle = 'rgba(5, 7, 13, 0.85)';
      ctx.fillRect(0, height - 26, width, 26);
      ctx.fillStyle = '#0028FF';
      ctx.font = "bold 9px 'JetBrains Mono', monospace";
      ctx.fillText(`✦ ASCII MATRIX RUNTIME // LAT. 27°59'N · LON. 86°55'E // PRESET: ${activePreset.toUpperCase()}`, 14, height - 18);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [width, height, density, activePreset]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
    mouseRef.current.x = -100;
    mouseRef.current.y = -100;
  };

  return (
    <div style={{
      position: 'relative',
      borderRadius: '20px',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      boxShadow: '0 12px 36px rgba(0, 40, 255, 0.25)',
      background: '#05070D'
    }}>
      {/* Preset Controls */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        display: 'flex',
        gap: '6px',
        zIndex: 10
      }}>
        {(['waves', 'matrix', 'hands'] as const).map(p => (
          <button
            key={p}
            onClick={() => setActivePreset(p)}
            style={{
              background: activePreset === p ? '#0028FF' : 'rgba(0, 0, 0, 0.65)',
              color: activePreset === p ? '#FFFFFF' : '#94A3B8',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '999px',
              padding: '3px 10px',
              fontSize: '0.68rem',
              fontWeight: 700,
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            {p}
          </button>
        ))}
      </div>

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          cursor: 'crosshair'
        }}
      />
    </div>
  );
};
