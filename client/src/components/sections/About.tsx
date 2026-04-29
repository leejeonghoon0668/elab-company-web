/**
 * About — P01 / 04
 * Brief: hero quote (1 line) + body paragraph. No additions, no team, no counters.
 * Layout: 12-col editorial grid. Left rail = section index. Right = body.
 * The mountain mist photograph anchors the right rail as a Sugimoto-like horizon.
 */
import { useReveal } from "@/hooks/useReveal";
import { Hairline } from "../Hairline";
import { SectionIndex } from "../SectionIndex";

const MOUNTAIN_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/309891006088642949/m8Dr543jkVZGpYXwp3dna2/about-mountain-mist-AEB8LLQdzUqjEeQBNUXTfg.webp";

export function About() {
  const lead = useReveal<HTMLParagraphElement>();
  const body = useReveal<HTMLParagraphElement>();
  const fig = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative pt-[10rem] sm:pt-[12rem] pb-[8rem] sm:pb-[10rem]">
      <div className="container">
        <SectionIndex number="01" title="About" fraction="01 / 04" />
        <Hairline className="mt-6 mb-16 sm:mb-20" />

        <div className="grid grid-cols-12 gap-x-6 gap-y-14">
          {/* Left rail — meta column */}
          <aside className="col-span-12 md:col-span-3 order-2 md:order-1">
            <div className="md:sticky md:top-32 space-y-5">
              <p className="meta-mute leading-[1.8]">
                Studio Note
                <br />
                — On posture
              </p>
              <p className="meta-mute leading-[1.8]">
                Reading time
                <br />
                — 38 sec.
              </p>
              <p className="meta-mute leading-[1.8]">
                Filed under
                <br />
                — Philosophy
              </p>
            </div>
          </aside>

          {/* Center — body */}
          <div className="col-span-12 md:col-span-6 order-1 md:order-2">
            <p
              ref={lead}
              className="reveal text-[clamp(1.85rem,4.2vw,3.2rem)] leading-[1.25] tracking-[-0.015em] text-ink"
              style={{ fontFamily: "Pretendard, sans-serif", fontWeight: 500 }}
            >
              <span className="font-display italic font-light">AI</span>가 크리에이티브를 만나면,
              <br />
              보이지 않던 가치가 드러납니다.
            </p>

            <div className="hairline mt-12 mb-12 w-16 opacity-60" />

            <p
              ref={body}
              className="reveal text-[clamp(1.05rem,1.4vw,1.225rem)] leading-[1.85] text-ink/85"
              style={{ transitionDelay: "120ms" }}
            >
              이랩컴퍼니는 AI 기술과 크리에이티브 감각을 결합하여
              아직 해결되지 않은 문제를 풀어가는 팀입니다.
              우리는 기술이 사람의 자리를 대신하는 것이 아니라,
              사람이 하지 못했던 것을 가능하게 만드는 도구라고 믿습니다.
            </p>

            <div className="mt-16 flex items-baseline gap-6">
              <span className="meta-mute">— L2 / Elab Company</span>
              <span className="leader" aria-hidden="true" />
              <span className="meta-mute">2026</span>
            </div>
          </div>

          {/* Right — photographic anchor */}
          <div className="col-span-12 md:col-span-3 order-3">
            <figure ref={fig} className="reveal" style={{ transitionDelay: "240ms" }}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={MOUNTAIN_IMG}
                  alt="A horizon of distant ridges fading into mist"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                {/* tonal overlay to bind into bone palette */}
                <div className="absolute inset-0 bg-[color:var(--bone)]/15 mix-blend-multiply" />
              </div>
              <figcaption className="meta-mute mt-3 leading-[1.7]">
                Plate I.
                <br />
                Distant ridges, before language.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
