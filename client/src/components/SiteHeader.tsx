/**
 * SiteHeader — fixed top header with logo lockup, anchor nav, and locale meta.
 * Editorial Studio Press : whitespace-forward, hairline divider, restrained typography.
 */
import { useEffect, useState } from "react";
import { EmblemMark } from "./EmblemMark";

const NAV = [
  { label: "About",      href: "#about",      hint: "01" },
  { label: "Capability", href: "#capability", hint: "02" },
  { label: "Projects",   href: "#projects",   hint: "03" },
  { label: "Contact",    href: "#contact",    hint: "04" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50",
        "transition-[backdrop-filter,background-color,border-color] duration-500",
        scrolled
          ? "bg-[color:var(--bone)]/85 backdrop-blur-md border-b border-[color:var(--rule)]"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div className="container flex items-center justify-between h-16 sm:h-[72px]">
        <a href="#top" className="text-ink no-underline" aria-label="Elab Company — Home">
          <EmblemMark variant="lockup" iconSize={26} />
        </a>

        <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link group flex items-baseline gap-1.5 text-[14px] tracking-wide text-ink"
            >
              <span className="meta-mute opacity-50 group-hover:opacity-80 transition-opacity">
                {item.hint}
              </span>
              <span className="font-display">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <span className="meta-mute">EN · KR</span>
          <span className="meta-mute opacity-50">/</span>
          <span className="meta-mute">v.01</span>
        </div>

        <a
          href="#contact"
          className="md:hidden meta nav-link"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
