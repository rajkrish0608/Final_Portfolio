import { SectionLabel } from '@/components/shared/SectionLabel'

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary text-[#e8f4f8] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 hex-bg opacity-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.05)_0%,transparent_70%)]" />

      <div className="z-10 text-center flex flex-col items-center">
        <SectionLabel text="SYSTEM.CORE" className="mb-6" />
        <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-[#e8f4f8] tracking-widest mb-4 filter drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]">
          RAJ <span className="text-[#00d4ff]">KRISH</span>
        </h1>
        <p className="font-mono-hud text-sm text-[#8bb8cc] tracking-[0.2em] max-w-lg mx-auto leading-relaxed border border-[#00d4ff33] bg-[#00d4ff11] py-2 px-4 rounded backdrop-blur-sm">
          [ WAITING FOR 3D HERO MODULE ]
        </p>
      </div>
    </main>
  )
}
