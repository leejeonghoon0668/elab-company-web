/**
 * Hero — logo-only, abstract SVG line breath loop.
 * Brief: no headline text in Hero. Visual loop on canvas/SVG. Scroll cue at bottom.
 * The mark itself is a giant centered E + 3-stroke motif, breathing slowly (8s loop).
 */
import { useEffect, useRef, useState } from "react";

export function Hero() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = window.innerHeight * 0.9;
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col"
      style={{
        opacity: 1 - progress * 0.4,
      }}
    >
      {/* Top meta band */}
      <div className="container pt-[6rem] sm:pt-[7rem] flex flex-wrap items-baseline justify-between gap-y-2">
        <span className="meta-mute">Est. 2025 — Jeonju, Korea</span>
        <span className="meta-mute hidden sm:inline">L2 / Holding · Independent</span>
        <span className="meta-mute">Issue 01 · 2026</span>
      </div>

      {/* Centerpiece — abstract loop */}
      <div className="flex-1 flex items-center justify-center relative px-4">
        <HeroLoop />
      </div>

      {/* Bottom band — scroll cue */}
      <div className="container pb-8">
        <div className="hairline mb-6" />
        <div className="flex flex-wrap items-center justify-between gap-y-3">
          <span className="meta-mute hidden sm:inline">
            AI · Creative · Strategy
          </span>
          <ScrollCue />
          <span className="meta-mute">····· Scroll to read</span>
        </div>
      </div>
    </section>
  );
}

function HeroLoop() {
  return (
    <div className="relative w-full max-w-[520px] mx-auto flex items-center justify-center" style={{ height: "min(60vh, 540px)" }}>
      {/* Faint horizontal hairline crossing center */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-[color:var(--ink)]/20" />

      {/* Faint vertical hairline */}
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[color:var(--ink)]/8" />

      {/* The four breathing strokes (visual proxy for the 'E' motif at giant scale) */}
      <svg
        viewBox="0 0 600 720"
        preserveAspectRatio="xMidYMid meet"
        className="relative w-full h-full overflow-visible"
        aria-label="Elab Company emblem"
      >
        <defs>
          <linearGradient
            id="ink-fade"
            gradientUnits="userSpaceOnUse"
            x1="0" y1="60" x2="0" y2="660"
          >
            <stop offset="0%" stopColor="#0F1B2D" stopOpacity="0" />
            <stop offset="18%" stopColor="#0F1B2D" stopOpacity="1" />
            <stop offset="82%" stopColor="#0F1B2D" stopOpacity="1" />
            <stop offset="100%" stopColor="#0F1B2D" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Three core vertical strokes, breathing via opacity */}
        <line
          className="hero-line hero-line-1"
          x1="232" y1="110" x2="232" y2="610"
          stroke="url(#ink-fade)" strokeWidth="1.4" strokeLinecap="butt"
        />
        <line
          className="hero-line hero-line-2"
          x1="300" y1="70" x2="300" y2="650"
          stroke="url(#ink-fade)" strokeWidth="1.4" strokeLinecap="butt"
        />
        <line
          className="hero-line hero-line-3"
          x1="368" y1="110" x2="368" y2="610"
          stroke="url(#ink-fade)" strokeWidth="1.4" strokeLinecap="butt"
        />

        {/* Anchoring serif (the E base) */}
        <line x1="170" y1="624" x2="430" y2="624"
              stroke="#0F1B2D" strokeWidth="1.2" opacity="0.85" />

        {/* Tiny crosshair tick — printer's registration mark */}
        <g stroke="#0F1B2D" strokeWidth="0.8" opacity="0.55">
          <line x1="500" y1="80" x2="520" y2="80" />
          <line x1="510" y1="70" x2="510" y2="90" />
        </g>
        <g stroke="#0F1B2D" strokeWidth="0.8" opacity="0.55">
          <line x1="80" y1="640" x2="100" y2="640" />
          <line x1="90" y1="630" x2="90" y2="650" />
        </g>

        {/* Whisper text — anchored at bottom */}
        <text
          x="50%" y="690" textAnchor="middle"
          fill="#0F1B2D" opacity="0.55"
          fontFamily="JetBrains Mono, monospace"
          fontSize="11" letterSpacing="3.5"
        >
          E · L · A · B
        </text>
      </svg>
    </div>
  );
}

function ScrollCue() {
  return (
    <a
      href="#about"
      aria-label="Scroll to About"
      className="group inline-flex items-center gap-2 meta nav-link"
    >
      <span>Begin</span>
      <svg width="44" height="10" viewBox="0 0 44 10" aria-hidden="true">
        <line x1="0" y1="5" x2="38" y2="5" stroke="currentColor" strokeWidth="1" />
        <polyline points="34,1 40,5 34,9" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    </a>
  );
}
