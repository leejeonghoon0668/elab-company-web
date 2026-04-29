/**
 * Projects — P03 / 04
 * Brief: COMING SOON only. No Haru+, no past references, no client logos.
 * Treatment: a single editorial spread that respects the empty state with dignity.
 */
import { useReveal } from "@/hooks/useReveal";
import { Hairline } from "../Hairline";
import { SectionIndex } from "../SectionIndex";

export function Projects() {
  const headline = useReveal<HTMLDivElement>();
  const note = useReveal<HTMLDivElement>();

  return (
    <section id="projects" className="relative py-[8rem] sm:py-[10rem]">
      <div className="container">
        <SectionIndex number="03" title="Projects" fraction="03 / 04" />
        <Hairline className="mt-6 mb-20 sm:mb-24" />

        <div className="grid grid-cols-12 gap-x-6 gap-y-12 items-end">
          <div ref={headline} className="reveal col-span-12 md:col-span-8">
            <p className="meta-mute mb-6">— On the bench, not yet on the wall</p>
            <h3 className="display-1 text-[clamp(3.2rem,9vw,7.5rem)] text-ink">
              Coming
              <br />
              <span className="italic font-light">Soon.</span>
            </h3>
          </div>

          <div ref={note} className="reveal col-span-12 md:col-span-4" style={{ transitionDelay: "180ms" }}>
            <div className="hairline mb-6 w-10 opacity-60" />
            <p className="text-[15px] leading-[1.85] text-ink/80">
              현재 진행 중인 프로젝트들은 아직 공개 단계에 이르지 않았습니다.
              때가 되면, 작품이 스스로 말하도록 자리를 비워두겠습니다.
            </p>
            <p className="meta-mute mt-8">
              Catalog opens
              <br />
              — Q3, 2026 (planned)
            </p>
          </div>
        </div>

        {/* Empty placeholder grid — preserves the editorial cadence */}
        <div className="mt-20 sm:mt-28 grid grid-cols-12 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="col-span-12 sm:col-span-6 lg:col-span-3 aspect-[4/5] border border-[color:var(--rule)] flex flex-col"
            >
              <div className="flex items-center justify-between p-4">
                <span className="meta-mute tabular-nums">0{i + 1}</span>
                <span className="meta-mute opacity-50">—</span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <span className="meta-mute opacity-50 select-none">
                  · · ·
                </span>
              </div>
              <div className="p-4">
                <span className="meta-mute opacity-60">Untitled · TBA</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
