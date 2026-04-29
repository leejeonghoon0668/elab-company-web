/**
 * EmblemMark — official Elab Company mark.
 * The mark image is the brand's authoritative artwork (E + 3 trailing strokes),
 * pre-tinted to ink color with transparent background. We just place it as <img>.
 *
 * Variants:
 *  - "mark"   : the mark only (square-ish container)
 *  - "lockup" : mark + ELAB COMPANY wordmark (used in header/footer)
 *  - "giant"  : large stand-alone presentation (used in Hero)
 */
import { cn } from "@/lib/utils";
// Import the official mark as a bundled asset so Vite emits a hashed file
// into dist/public/assets. This guarantees the file is served in any
// production environment (Vercel, static CDN) regardless of publicDir or
// rewrite rules.
import markSrc from "@/assets/brand/elab-mark-ink.png";
import markSrc2x from "@/assets/brand/elab-mark-ink@2x.png";

interface EmblemMarkProps {
  variant?: "mark" | "lockup" | "giant";
  className?: string;
  iconSize?: number;          // visual height in px
  ariaLabel?: string;
}

const MARK_SRC = markSrc;
const MARK_SRC_2X = markSrc2x;
// intrinsic aspect of the cropped mark image: 340 / 370 ≈ 0.919
const MARK_ASPECT = 340 / 370;

function MarkImage({ size, ariaLabel = "Elab Company emblem" }: { size: number; ariaLabel?: string }) {
  return (
    <img
      src={MARK_SRC}
      srcSet={`${MARK_SRC} 1x, ${MARK_SRC_2X} 2x`}
      width={Math.round(size * MARK_ASPECT)}
      height={size}
      alt={ariaLabel}
      decoding="async"
      className="block select-none pointer-events-none"
      style={{ width: `${Math.round(size * MARK_ASPECT)}px`, height: `${size}px` }}
    />
  );
}

export function EmblemMark({
  variant = "lockup",
  className,
  iconSize = 22,
  ariaLabel,
}: EmblemMarkProps) {
  if (variant === "giant") {
    return (
      <div
        className={cn("inline-flex items-center justify-center", className)}
        aria-label={ariaLabel ?? "Elab Company"}
      >
        <MarkImage size={iconSize} ariaLabel={ariaLabel ?? "Elab Company"} />
      </div>
    );
  }

  if (variant === "mark") {
    return (
      <span
        className={cn("inline-flex shrink-0", className)}
        aria-label={ariaLabel ?? "Elab Company"}
      >
        <MarkImage size={iconSize} ariaLabel={ariaLabel ?? "Elab Company"} />
      </span>
    );
  }

  // lockup: mark + wordmark
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 select-none text-ink",
        className,
      )}
      aria-label={ariaLabel ?? "Elab Company"}
    >
      <MarkImage size={iconSize} ariaLabel="" />
      <span
        className="font-display tracking-[0.18em] text-[14px] sm:text-[15px] uppercase leading-none"
        style={{ fontWeight: 500 }}
      >
        Elab&nbsp;Company
      </span>
    </span>
  );
}
