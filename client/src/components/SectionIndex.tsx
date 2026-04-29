/**
 * SectionIndex — editorial index marker (P1·P2…) with optional fraction.
 * Mirrors Harken's index pattern: `P1 · Philosophy ……………… 1/4`
 * Replaces dotted leaders with crisp hairlines per brief PART 5.
 */
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

interface SectionIndexProps {
  number: string;          // e.g. "01"
  title: string;           // e.g. "About"
  fraction: string;        // e.g. "1/5"
  className?: string;
}

export function SectionIndex({ number, title, fraction, className }: SectionIndexProps) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={cn("reveal", className)}>
      <div className="flex items-baseline gap-3 sm:gap-4">
        <span className="meta-mute select-none">
          <span className="opacity-60">P</span>
          {number}
        </span>
        <span className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-medium tracking-tight leading-none">
          {title}
        </span>
        <span className="leader" aria-hidden="true" />
        <span className="meta-mute tabular-nums">{fraction}</span>
      </div>
    </div>
  );
}
