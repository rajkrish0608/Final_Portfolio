'use client'

import { useEffect, useRef } from 'react'
import { SuitAssembly } from './SuitAssembly'
import { AmbientParticles } from './AmbientParticles'
import { HeroText } from './HeroText'
import { useStore } from '@/lib/store'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function HeroSection() {
    const containerRef = useRef<HTMLElement>(null)
    const { isLoading, setSuitAssembled, setActiveSection } = useStore()

    useEffect(() => {
        // When the loader finishes, wait 400ms then trigger the suit assembly
        if (!isLoading) {
            const timer = setTimeout(() => {
                setSuitAssembled(true)
            }, 400)
            return () => clearTimeout(timer)
        }
    }, [isLoading, setSuitAssembled])

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        // ScrollTrigger to highlight 'hero' in nav when visible
        const st = ScrollTrigger.create({
            trigger: el,
            start: 'top center',
            end: 'bottom center',
            onToggle: (self: globalThis.ScrollTrigger) => {
                if (self.isActive) setActiveSection('hero')
            },
        })

        return () => st.kill()
    }, [setActiveSection])

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden bg-[#0a0a0f]"
        >
            {/* 1. Background Particles (Deepest Layer) */}
            <AmbientParticles />

            {/* 2. WebGL Canvas (Middle Layer) */}
            <SuitAssembly />

            {/* 3. HTML Overlay (Front Layer) */}
            <HeroText />

            {/* 4. Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
                <span className="font-mono-hud text-[10px] text-[#00d4ff] tracking-[0.2em]">SCROLL</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#00d4ff] to-transparent overflow-hidden">
                    <div className="w-full h-1/2 bg-[#fff] animate-[scanLine_2s_linear_infinite]" />
                </div>
            </div>
        </section>
    )
}
