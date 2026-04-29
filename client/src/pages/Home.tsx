/**
 * Home — Elab Company landing
 * Editorial Studio Press : Bone paper × Deep Ink Navy.
 * Sections: Hero · About · Capability · Projects · Contact · Footer
 */
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Capability } from "@/components/sections/Capability";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Capability />
        <Projects />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
