/**
 * Contact — P04 / 04
 * Brief: address (Korean main + English secondary), email, phone.
 * Treatment: copy-to-clipboard for email; quiet hover affordances.
 */
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { Hairline } from "../Hairline";
import { SectionIndex } from "../SectionIndex";
import { toast } from "sonner";

const EMAIL = "why2077@elabcompany.com";
const PHONE = "010-9969-0668";
const PHONE_INTL = "+82 10-9969-0668";
const ADDR_KO = "전북특별자치도 전주시 완산구 황강서원 3길 3-10 1층";
const ADDR_EN =
  "1F, 3-10 Hwanggangseowon 3-gil, Wansan-gu, Jeonju-si, Jeollabuk-do, Republic of Korea";

export function Contact() {
  const head = useReveal<HTMLDivElement>();
  const grid = useReveal<HTMLDivElement>();
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      toast("Email copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast("Could not copy. Please try manually.");
    }
  };

  return (
    <section id="contact" className="relative py-[8rem] sm:py-[10rem]">
      <div className="container">
        <SectionIndex number="04" title="Contact" fraction="04 / 04" />
        <Hairline className="mt-6 mb-16 sm:mb-20" />

        <div ref={head} className="reveal max-w-4xl">
          <p className="meta-mute mb-6">— Begin a quiet conversation</p>
          <h3 className="display-2 text-[clamp(2rem,4.4vw,3.4rem)] text-ink">
            귀를 기울이는 일부터 시작합니다.
            <br />
            <span className="italic font-light text-ink/75">
              We listen first, then make.
            </span>
          </h3>
        </div>

        <div
          ref={grid}
          className="reveal mt-20 grid grid-cols-12 gap-x-6 gap-y-14"
        >
          {/* Email */}
          <div className="col-span-12 md:col-span-6">
            <p className="meta-mute mb-4">Mail</p>
            <button
              type="button"
              onClick={onCopy}
              aria-label="Copy email address to clipboard"
              className="group inline-flex items-baseline gap-3 text-left"
            >
              <span className="font-display text-[clamp(1.6rem,3.2vw,2.5rem)] tracking-tight text-ink underline decoration-[color:var(--ink)]/15 underline-offset-[8px] group-hover:decoration-[color:var(--ink)] transition-[text-decoration-color] duration-500">
                {EMAIL}
              </span>
              <span className="meta-mute shrink-0 transition-opacity duration-300">
                {copied ? "Copied" : "[ copy ]"}
              </span>
            </button>
          </div>

          {/* Phone */}
          <div className="col-span-12 md:col-span-6">
            <p className="meta-mute mb-4">Telephone</p>
            <a
              href={`tel:${PHONE.replace(/-/g, "")}`}
              className="font-display text-[clamp(1.6rem,3.2vw,2.5rem)] tracking-tight text-ink nav-link"
            >
              {PHONE}
            </a>
            <p className="meta-mute mt-3">{PHONE_INTL}</p>
          </div>

          {/* Address */}
          <div className="col-span-12 md:col-span-8">
            <p className="meta-mute mb-4">Address — Studio</p>
            <p className="display-3 text-[clamp(1.25rem,1.8vw,1.5rem)] leading-[1.7] text-ink">
              {ADDR_KO}
            </p>
            <p className="mt-3 text-[14px] leading-[1.7] text-ink/65">
              {ADDR_EN}
            </p>
          </div>

          <div className="col-span-12 md:col-span-4">
            <p className="meta-mute mb-4">Hours</p>
            <p className="text-[15px] leading-[1.85] text-ink/80">
              Mon — Fri · 10:00 – 18:00 (KST)
            </p>
            <p className="meta-mute mt-6">By appointment, preferably.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
