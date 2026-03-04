import { HeroSection } from '@/components/Hero/HeroSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary text-[#e8f4f8] relative">
      <HeroSection />

      {/* Placeholder for scroll length testing */}
      <section id="about" className="h-screen w-full flex items-center justify-center border-t border-[#00d4ff22]">
        <h2 className="font-orbitron text-2xl text-[#8bb8cc]">[ ABOUT SECTION PENDING ]</h2>
      </section>
    </main>
  )
}
