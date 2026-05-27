import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type HorizontalScrollerProps = {
  children: ReactNode;
};

export function HorizontalScroller({ children }: HorizontalScrollerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const horizontalRef = useRef(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const isHorizontalMode = () =>
      desktopQuery.matches && !reduceQuery.matches;

    const killHorizontal = () => {
      if (tweenRef.current) {
        tweenRef.current.scrollTrigger?.kill();
        tweenRef.current.kill();
        tweenRef.current = null;
      }
      const track = trackRef.current;
      if (track) {
        gsap.set(track, { clearProps: "transform" });
      }
    };

    const setupHorizontal = () => {
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      if (!wrapper || !track) return;

      const panelCount = track.children.length;
      if (panelCount < 2) return;

      killHorizontal();

      tweenRef.current = gsap.to(track, {
        x: () => -(panelCount - 1) * window.innerWidth,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          scrub: true,
          end: () => `+=${(panelCount - 1) * window.innerWidth}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    };

    const applyLayout = () => {
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      if (!wrapper || !track) return;

      const next = isHorizontalMode();
      horizontalRef.current = next;
      killHorizontal();

      if (next) {
        wrapper.classList.add("overflow-hidden", "w-full");
        track.classList.remove("flex-col");
        track.classList.add("flex-row");
        setupHorizontal();
      } else {
        wrapper.classList.remove("overflow-hidden", "w-full");
        track.classList.remove("flex-row");
        track.classList.add("flex-col");
        gsap.set(track, { clearProps: "transform" });
      }

      ScrollTrigger.refresh();
    };

    applyLayout();

    const onBreakpointChange = () => applyLayout();

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (horizontalRef.current) {
          applyLayout();
        } else {
          ScrollTrigger.refresh();
        }
      }, 150);
    };

    desktopQuery.addEventListener("change", onBreakpointChange);
    reduceQuery.addEventListener("change", onBreakpointChange);
    window.addEventListener("resize", onResize);

    return () => {
      desktopQuery.removeEventListener("change", onBreakpointChange);
      reduceQuery.removeEventListener("change", onBreakpointChange);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      killHorizontal();
    };
  }, [children]);

  return (
    <div ref={wrapperRef}>
      <div ref={trackRef} className="flex flex-col">
        {children}
      </div>
    </div>
  );
}
