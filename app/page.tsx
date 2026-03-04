import { HeroSection } from '@/components/Hero/HeroSection'
import { AboutSection } from '@/components/About/AboutSection'
import { SkillsSection } from '@/components/Skills/SkillsSection'

export default function Home() {
  return (
    <main className="relative bg-[#0a0a0f] text-[#e8f4f8]">
      <HeroSection />
      <AboutSection />
      <SkillsSection />

      {/* Remaining sections — pending */}
      <section id="projects" className="h-40 w-full flex items-center justify-center border-t border-[#00d4ff11]"><span className="font-mono-hud text-xs text-[#00d4ff44]">[ PROJECTS — PENDING ]</span></section>
      <section id="achievements" className="h-40 w-full flex items-center justify-center border-t border-[#00d4ff11]"><span className="font-mono-hud text-xs text-[#00d4ff44]">[ ACHIEVEMENTS — PENDING ]</span></section>
      <section id="contact" className="h-40 w-full flex items-center justify-center border-t border-[#00d4ff11]"><span className="font-mono-hud text-xs text-[#00d4ff44]">[ CONTACT — PENDING ]</span></section>
    </main>
  )
}
