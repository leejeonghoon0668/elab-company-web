/**
 * Hairline — single-pixel ink rule that draws itself left→right on entry.
 * Brief PART 5: dotted lines (Harken) replaced by crisp continuous lines.
 */
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

interface HairlineProps {
  className?: string;
  animated?: boolean;
}

export function Hairline({ className, animated = true }: HairlineProps) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={animated ? ref : undefined}
      role="separator"
      aria-hidden="true"
      className={cn("hairline", animated && "reveal-rule", className)}
    />
  );
}
