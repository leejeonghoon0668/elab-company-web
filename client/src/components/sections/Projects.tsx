/**
 * Projects — P03 / 04
 * Live products: Baro, Haru+ (external links, new tab). Cubric: coming soon (no link).
 * Downloads: Baro / Haru+ brochures + company profile (PDF in /public/downloads).
 */
import { useReveal } from "@/hooks/useReveal";
import { Hairline } from "../Hairline";
import { SectionIndex } from "../SectionIndex";

const PROJECTS = [
  {
    no: "01",
    name: "Baro",
    desc: "강의 영상의 번역·자막·대본을 자동으로",
    label: "BARO · LIVE",
    href: "https://baro-v0-leejeonghoon0668s-projects.vercel.app/",
  },
  {
    no: "02",
    name: "Haru+",
    desc: "사장님의 SNS 마케팅을 대신합니다",
    label: "HARU+ · LIVE",
    href: "https://haru-demo.elabcompany.com/",
  },
  {
    no: "03",
    name: "Cubric",
    desc: "준비 중입니다",
    label: "CUBRIC · COMING SOON",
    href: null,
  },
];

const DOWNLOADS = [
  { label: "Baro 제품소개서", file: "/downloads/baro-brochure.pdf" },
  { label: "Haru+ 제품소개서", file: "/downloads/haru-plus-brochure.pdf" },
  { label: "회사소개서", file: "/downloads/elab-company-profile.pdf" },
];

export function Projects() {
  const headline = useReveal<HTMLDivElement>();
  const note = useReveal<HTMLDivElement>();
  const cards = useReveal<HTMLDivElement>();
  const files = useReveal<HTMLDivElement>();

  return (
    <section id="projects" className="relative py-[8rem] sm:py-[10rem]">
      <div className="container">
        <SectionIndex number="03" title="Projects" fraction="03 / 04" />
        <Hairline className="mt-6 mb-20 sm:mb-24" />

        <div className="grid grid-cols-12 gap-x-6 gap-y-12 items-end">
          <div ref={headline} className="reveal col-span-12 md:col-span-8">
            <p className="meta-mute mb-6">— Built, and currently in service</p>
            <h3 className="display-1 text-[clamp(3.2rem,9vw,7.5rem)] text-ink">
              Selected
              <br />
              <span className="italic font-light">Works.</span>
            </h3>
          </div>

          <div ref={note} className="reveal col-span-12 md:col-span-4" style={{ transitionDelay: "180ms" }}>
            <div className="hairline mb-6 w-10 opacity-60" />
            <p className="text-[15px] leading-[1.85] text-ink/80">
              이랩이 만든 제품들은 지금 사용자의 일상에서 작동하고 있습니다.
              각 프로젝트는 독립적으로 움직이며, 다음 가능성을 향해 확장됩니다.
            </p>
            <p className="meta-mute mt-8">
              In service
              <br />
              — 2026
            </p>
          </div>
        </div>

        <div ref={cards} className="reveal mt-20 sm:mt-28 grid grid-cols-12 gap-4">
          {PROJECTS.map((p, i) => {
            const cardClass =
              "group col-span-12 md:col-span-4 aspect-[16/9] sm:aspect-[2/1] border border-[color:var(--rule)] flex flex-col transition-colors duration-500";
            const inner = (
              <>
                <div className="flex items-center justify-between p-5">
                  <span className="meta-mute tabular-nums">{p.no}</span>
                  {p.href ? (
                    <span className="meta-mute transition-transform duration-500 group-hover:translate-x-1">↗</span>
                  ) : (
                    <span className="meta-mute opacity-40">·</span>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-center px-5">
                  <span
                    className={`display-1 text-[clamp(1.8rem,4vw,2.8rem)] leading-none ${p.href ? "text-ink" : "text-ink/60"}`}
                  >
                    {p.name}
                  </span>
                  <span
                    className={`text-[13px] leading-[1.6] mt-3 ${p.href ? "text-ink/70" : "text-ink/50"}`}
                  >
                    {p.desc}
                  </span>
                </div>
                <div className="p-5">
                  <span className="meta-mute opacity-70">{p.label}</span>
                </div>
              </>
            );

            return p.href ? (
              <a
                key={p.no}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardClass} hover:border-[color:var(--ink)]`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {inner}
              </a>
            ) : (
              <div
                key={p.no}
                aria-disabled="true"
                className={`${cardClass} cursor-default select-none`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {inner}
              </div>
            );
          })}
        </div>

        <div ref={files} className="reveal mt-16 sm:mt-20" style={{ transitionDelay: "160ms" }}>
          <p className="meta-mute mb-6">— Downloads</p>
          <div className="grid grid-cols-12 gap-4">
            {DOWNLOADS.map((d) => (
              <a
                key={d.file}
                href={d.file}
                download
                className="group col-span-12 sm:col-span-4 border border-[color:var(--rule)] flex items-center gap-3 px-5 py-4 transition-colors duration-500 hover:border-[color:var(--ink)]"
              >
                <span className="text-ink/80 transition-transform duration-500 group-hover:translate-y-0.5">↓</span>
                <span className="text-[14px] text-ink">{d.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
