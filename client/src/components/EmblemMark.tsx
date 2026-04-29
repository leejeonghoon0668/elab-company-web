/**
 * EmblemMark — Elab Company logotype
 * Motif: capital E formed by three vertical strokes, anchored by a horizontal serif.
 * Variants: 'mark' (icon only) | 'lockup' (icon + ELAB COMPANY wordmark)
 */
import { cn } from "@/lib/utils";

interface EmblemMarkProps {
  variant?: "mark" | "lockup";
  className?: string;
  iconSize?: number;
}

export function EmblemMark({
  variant = "lockup",
  className,
  iconSize = 22,
}: EmblemMarkProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width={iconSize}
        height={iconSize * 1.15}
        viewBox="0 0 22 26"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Three vertical strokes */}
        <line x1="3" y1="2" x2="3" y2="24" stroke="currentColor" strokeWidth="1.3" />
        <line x1="11" y1="2" x2="11" y2="24" stroke="currentColor" strokeWidth="1.3" />
        <line x1="19" y1="2" x2="19" y2="24" stroke="currentColor" strokeWidth="1.3" />
        {/* Anchor serif */}
        <line x1="0" y1="25.4" x2="22" y2="25.4" stroke="currentColor" strokeWidth="1" />
      </svg>
      {variant === "lockup" && (
        <span className="font-display text-[15px] tracking-[0.18em] uppercase leading-none">
          Elab&nbsp;Company
        </span>
      )}
    </span>
  );
}
