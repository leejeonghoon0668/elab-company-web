/**
 * Hero — single-screen logo presentation.
 * Centerpiece is the official Elab Company mark at giant scale, in ink color.
 * The mark breathes via a subtle opacity loop. No headline copy.
 */
import { useEffect, useRef, useState } from "react";
import { EmblemMark } from "../EmblemMark";

export function Hero() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = (window.innerHeight || 1) * 0.9;
      const raw = max > 0 ? window.scrollY / max : 0;
      const p = Math.min(1, Math.max(0, Number.isFinite(raw) ? raw : 0));
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
      style={{ opacity: Number.isFinite(progress) ? 1 - progress * 0.4 : 1 }}
    >
      {/* Top meta band */}
      <div className="container pt-[6rem] sm:pt-[7rem] flex flex-wrap items-baseline justify-between gap-y-2">
        <span className="meta-mute">Est. 2025 — Jeonju, Korea</span>
        <span className="meta-mute hidden sm:inline">L2 / Holding · Independent</span>
        <span className="meta-mute">Issue 01 · 2026</span>
      </div>

      {/* Centerpiece — the official mark at giant scale */}
      <div className="flex-1 flex items-center justify-center relative px-4">
        <HeroEmblem />
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

function HeroEmblem() {
  // Mark height adapts to the available viewport while staying within the column.
  // The "breath" is a slow, near-imperceptible opacity loop on the mark itself.
  const [size, setSize] = useState(320);
  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight;
      if (Number.isFinite(vh) && vh > 0) {
        setSize(Math.round(Math.min(380, vh * 0.46)));
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      <div
        className="hero-breath text-ink"
        style={{ height: "min(46vh, 380px)" }}
      >
        {/* iconSize is the mark's pixel height; lockup variant would add a wordmark */}
        <EmblemMark
          variant="giant"
          iconSize={size}
          ariaLabel="Elab Company"
        />
      </div>

      {/* Wordmark caption underneath, set in spaced display caps */}
      <p className="mt-10 font-display tracking-[0.42em] text-[12px] text-ink/55 uppercase">
        E&nbsp;·&nbsp;L&nbsp;·&nbsp;A&nbsp;·&nbsp;B
      </p>
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
