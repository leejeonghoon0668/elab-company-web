/**
 * Capability — P02 / 04
 * Brief: 5 keywords. No body copy beyond what is essential.
 * Layout: numbered editorial list. Each row hairline-separated.
 * Right rail holds a small generated diagram for tactile texture.
 */
import { useReveal } from "@/hooks/useReveal";
import { Hairline } from "../Hairline";
import { SectionIndex } from "../SectionIndex";

const KEYWORDS = [
  {
    en: "AI System Design",
    ko: "구조와 흐름을 설계하다",
    note: "Architecture · Pipelines · Multi-agent flows",
  },
  {
    en: "Creative Performance",
    ko: "감각을 결과로 옮기다",
    note: "Production · Output · Measurable craft",
  },
  {
    en: "Creative Automation",
    ko: "반복을 도구로 위임하다",
    note: "Workflow · Templating · Quality at scale",
  },
  {
    en: "Brand Strategy",
    ko: "이름을 가진 태도를 만들다",
    note: "Anchor · Voice · Architecture",
  },
  {
    en: "Creative Performance Intelligence",
    ko: "데이터로 감각을 검증하다",
    note: "Signals · Feedback · Iteration",
  },
];

const DIAGRAM_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/309891006088642949/m8Dr543jkVZGpYXwp3dna2/capability-abstract-5BCnwaNMYza7DzMLRvmyv3.webp";

export function Capability() {
  const list = useReveal<HTMLOListElement>();

  return (
    <section id="capability" className="relative py-[8rem] sm:py-[10rem]">
      <div className="container">
        <SectionIndex number="02" title="Capability" fraction="02 / 04" />
        <Hairline className="mt-6 mb-16 sm:mb-20" />

        <div className="grid grid-cols-12 gap-x-6 gap-y-12 items-start">
          <div className="col-span-12 md:col-span-3">
            <p className="meta-mute leading-[1.8]">
              Formula
              <br />
              — Five disciplines
            </p>
            <div className="hairline mt-6 mb-6 w-10 opacity-60" />
            <p className="text-[15px] leading-[1.8] text-ink/80">
              우리는 다섯 개의 동사로 일합니다.
              각각은 독립적이지만, 서로의 결과 위에서 다음을 시작합니다.
            </p>
          </div>

          <ol
            ref={list}
            className="col-span-12 md:col-span-6 reveal stagger"
          >
            {KEYWORDS.map((k, i) => (
              <li
                key={k.en}
                className="grid grid-cols-12 items-baseline gap-x-4 py-7 sm:py-8 border-t border-[color:var(--rule)] last:border-b"
              >
                <span className="meta-mute col-span-2 sm:col-span-1 tabular-nums">
                  0{i + 1}
                </span>
                <div className="col-span-10 sm:col-span-11">
                  <h3 className="display-3 text-[clamp(1.5rem,2.6vw,2.05rem)] text-ink">
                    {k.en}
                  </h3>
                  <p className="mt-2 text-[15px] sm:text-[16px] text-ink/75 leading-[1.7]">
                    {k.ko}
                    <span className="ml-3 meta-mute opacity-70">— {k.note}</span>
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <aside className="col-span-12 md:col-span-3">
            <figure className="md:sticky md:top-32">
              <div className="aspect-square overflow-hidden">
                <img
                  src={DIAGRAM_IMG}
                  alt="Five-node connection diagram on bone paper"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <figcaption className="meta-mute mt-3 leading-[1.7]">
                Diagram II.
                <br />
                Five nodes, fully connected.
              </figcaption>
            </figure>
          </aside>
        </div>
      </div>
    </section>
  );
}
