import React, { useState, useEffect, useRef } from 'react';

interface GlitchTextProps {
  words?: string[];
  staticText?: string;
  interval?: number;
  className?: string;
  style?: React.CSSProperties;
  scrambleOnMount?: boolean;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  words = ["Intelligence", "Topology", "Clarity", "Synthesis", "Bandwidth"],
  staticText,
  interval = 3200,
  style,
  scrambleOnMount = false
}) => {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [displayText, setDisplayText] = useState(staticText || words[0]);
  const [isScrambling, setIsScrambling] = useState(false);
  const timerRef = useRef<number | null>(null);

  const targetText = staticText || words[currentWordIdx];
  const glyphs = "!<>-_\\/[]{}—=+*^?#01░▒▓█";

  const scramble = (target: string) => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    setIsScrambling(true);
    let iteration = 0;
    const maxIterations = target.length * 2.5;

    timerRef.current = window.setInterval(() => {
      setDisplayText(() => {
        return target
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration / 2.5) {
              return target[index];
            }
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join("");
      });

      iteration += 1;
      if (iteration >= maxIterations) {
        if (timerRef.current !== null) window.clearInterval(timerRef.current);
        setDisplayText(target);
        setIsScrambling(false);
      }
    }, 25);
  };

  useEffect(() => {
    if (staticText) {
      if (scrambleOnMount) {
        scramble(staticText);
      } else {
        setDisplayText(staticText);
      }
      return;
    }

    const cycle = window.setInterval(() => {
      setCurrentWordIdx(prev => {
        const next = (prev + 1) % words.length;
        scramble(words[next]);
        return next;
      });
    }, interval);

    return () => {
      window.clearInterval(cycle);
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    };
  }, [words, staticText, interval, scrambleOnMount]);

  return (
    <span
      onMouseEnter={() => scramble(targetText)}
      style={{
        display: 'inline-block',
        position: 'relative',
        cursor: 'crosshair',
        transition: 'all 0.2s ease',
        ...style
      }}
      title="Hover to decrypt neural tokens"
    >
      <span
        style={{
          fontFamily: 'inherit',
          fontWeight: 'inherit',
          letterSpacing: 'inherit',
          textShadow: isScrambling ? '0 0 24px rgba(0, 40, 255, 0.95), 0 0 4px #FFFFFF' : 'none',
          filter: isScrambling ? 'brightness(1.25)' : 'none',
          transition: 'filter 0.15s ease'
        }}
      >
        {displayText}
      </span>
      {isScrambling && (
        <span
          style={{
            position: 'absolute',
            right: '-10px',
            top: '10%',
            bottom: '10%',
            width: '4px',
            background: '#0028FF',
            boxShadow: '0 0 10px #0028FF',
            display: 'inline-block',
            animation: 'pulse 0.4s infinite'
          }}
        />
      )}
    </span>
  );
};
