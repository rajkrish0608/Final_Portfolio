import { HeroSection } from '@/components/Hero/HeroSection'
import { AboutSection } from '@/components/About/AboutSection'
import { SkillsSection } from '@/components/Skills/SkillsSection'
import { ProjectsSection } from '@/components/Projects/ProjectsSection'
import { MissionTimeline } from '@/components/Achievements/MissionTimeline'
import { DeploymentLog } from '@/components/Experience/DeploymentLog'
import { ContactSection } from '@/components/Contact/ContactSection'

export default function Home() {
  return (
    <main className="relative bg-[#0a0a0f] text-[#e8f4f8]">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <MissionTimeline />
      <DeploymentLog />
      <ContactSection />
    </main>
  )
}
