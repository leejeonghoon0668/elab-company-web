/**
 * SiteFooter — business reg. number, legal entity, copyright.
 * Brief PART 3 [6]: 사업자번호(622-71-00630) / 법인 정보 / 저작권
 */
import { EmblemMark } from "./EmblemMark";
import { Hairline } from "./Hairline";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative pt-20 pb-12">
      <div className="container">
        <Hairline className="mb-12" />

        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 md:col-span-5">
            <EmblemMark variant="lockup" iconSize={20} />
            <p className="meta-mute mt-6 leading-[1.85]">
              Independent studio · Jeonju · Republic of Korea.
              <br />
              Working at the seam of intelligence and craft.
            </p>
          </div>

          <div className="col-span-6 md:col-span-2 md:col-start-7">
            <p className="meta-mute mb-3">Index</p>
            <ul className="space-y-2 text-[14px]">
              <li><a href="#about" className="nav-link">About</a></li>
              <li><a href="#capability" className="nav-link">Capability</a></li>
              <li><a href="#projects" className="nav-link">Projects</a></li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <p className="meta-mute mb-3">Legal</p>
            <ul className="space-y-2 text-[14px] text-ink/85">
              <li>법인명 · 이랩컴퍼니</li>
              <li>사업자등록번호 · 622-71-00630</li>
              <li>대표 · Daniel Yoo</li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-3">
            <p className="meta-mute mb-3">Channels</p>
            
            <ul className="space-y-2 text-[14px] text-ink/85">
              <li>
                <a href="mailto:why2077@elabcompany.com" className="nav-link">
                  why2077@elabcompany.com
                </a>
              </li>
              <li>
                <a href="tel:01099690668" className="nav-link">
                  010-9969-0668
                </a>
              </li>
              <li>
                <span className="nav-link opacity-60">elabcompany.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="meta-mute">
            © {year} Elab Company. All rights reserved.
          </p>
          <p className="meta-mute">
            Set in Fraunces, Pretendard, JetBrains Mono. Printed on bone paper.
          </p>
        </div>
      </div>
    </footer>
  );
}
