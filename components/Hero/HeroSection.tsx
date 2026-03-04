'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { SuitAssembly } from './SuitAssembly'
import { AmbientParticles } from './AmbientParticles'
import { HeroText } from './HeroText'
import { useStore, HeroPhase } from '@/lib/store'
import { gsap, ScrollTrigger } from '@/lib/gsap'

/**
 * MASTER ORCHESTRATOR — HeroSection
 *
 * This component owns the entire hero animation timeline.
 * It listens for the loader to finish, then drives the phase
 * state machine through each stage with precise delays
 * matching the TRD spec:
 *
 * T=0ms       → LOADING       (Loader visible)
 * T=1800ms    → TRANSITION    (Loader iris-wipes out)
 * T=+200ms    → CANVAS_IN     (Canvas fades in, particles spawn)
 * T=+200ms    → ASSEMBLING    (Fragments begin flying in)
 * T=+1000ms   → ASSEMBLED     (Fragments lock, reactor pulses)
 * T=+200ms    → TEXT_REVEAL   (Name + tagline stagger in)
 * T=+600ms    → AMBIENT       (Everything settled, idle state)
 */
export function HeroSection() {
    const containerRef = useRef<HTMLElement>(null)
    const scrollIndicatorRef = useRef<HTMLDivElement>(null)
    const timelineRef = useRef<ReturnType<typeof setTimeout>[]>([])

    const {
        isLoading,
        heroPhase,
        setHeroPhase,
        setSuitAssembled,
        setActiveSection,
    } = useStore()

    // Phase transition scheduler
    const schedulePhase = useCallback(
        (phase: HeroPhase, delayMs: number) => {
            const id = setTimeout(() => setHeroPhase(phase), delayMs)
            timelineRef.current.push(id)
        },
        [setHeroPhase]
    )

    // === MASTER TIMELINE ===
    useEffect(() => {
        if (isLoading) return // wait for loader to finish

        // Clear any previous scheduled phases
        timelineRef.current.forEach(clearTimeout)
        timelineRef.current = []

        // T+0ms: Loader just finished → TRANSITION (iris wipe happening)
        setHeroPhase('TRANSITION')

        // T+200ms: Canvas fades in
        schedulePhase('CANVAS_IN', 200)

        // T+400ms: Fragments begin assembling
        schedulePhase('ASSEMBLING', 400)

        // T+400ms: Also set the legacy isSuitAssembled flag for SuitFragment GSAP anims
        const assembleTimer = setTimeout(() => setSuitAssembled(true), 400)
        timelineRef.current.push(assembleTimer)

        // T+2400ms: Assembly complete — all fragments locked
        schedulePhase('ASSEMBLED', 2400)

        // T+2600ms: Text reveal begins
        schedulePhase('TEXT_REVEAL', 2600)

        // T+3600ms: Everything ambient
        schedulePhase('AMBIENT', 3600)

        return () => {
            timelineRef.current.forEach(clearTimeout)
        }
    }, [isLoading, setHeroPhase, setSuitAssembled, schedulePhase])

    // === SCROLL INDICATOR GSAP ANIMATION ===
    useEffect(() => {
        if (heroPhase !== 'AMBIENT' || !scrollIndicatorRef.current) return

        gsap.fromTo(
            scrollIndicatorRef.current,
            { opacity: 0, y: 20 },
            { opacity: 0.6, y: 0, duration: 1, ease: 'power3.out' }
        )
    }, [heroPhase])

    // === SCROLLTRIGGER — active nav section tracking ===
    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const st = ScrollTrigger.create({
            trigger: el,
            start: 'top center',
            end: 'bottom center',
            onToggle: (self: { isActive: boolean }) => {
                if (self.isActive) setActiveSection('hero')
            },
        })

        return () => st.kill()
    }, [setActiveSection])

    // Should the canvas be visible yet?
    const canvasVisible = heroPhase !== 'LOADING' && heroPhase !== 'TRANSITION'

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden bg-[#0a0a0f]"
        >
            {/* === LAYER 0: Radial gradient backdrop === */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.04)_0%,transparent_70%)] pointer-events-none" />

            {/* === LAYER 1: Background Particles (deepest) === */}
            <motion.div
                className="absolute inset-0 z-[1]"
                initial={{ opacity: 0 }}
                animate={{ opacity: canvasVisible ? 1 : 0 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
            >
                <AmbientParticles />
            </motion.div>

            {/* === LAYER 2: WebGL Canvas (middle) === */}
            <motion.div
                className="absolute inset-0 z-[2]"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{
                    opacity: canvasVisible ? 1 : 0,
                    scale: canvasVisible ? 1 : 1.05,
                }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
                <SuitAssembly />
            </motion.div>

            {/* === LAYER 3: HUD decorative scan lines === */}
            {canvasVisible && (
                <div className="absolute inset-0 z-[3] pointer-events-none">
                    {/* Horizontal scan line */}
                    <motion.div
                        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00d4ff33] to-transparent"
                        initial={{ top: '0%' }}
                        animate={{ top: '100%' }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    />
                    {/* Corner HUD brackets */}
                    <div className="absolute top-8 left-8 w-16 h-16 border-t-[1px] border-l-[1px] border-[#00d4ff33]" />
                    <div className="absolute top-8 right-8 w-16 h-16 border-t-[1px] border-r-[1px] border-[#00d4ff33]" />
                    <div className="absolute bottom-24 left-8 w-16 h-16 border-b-[1px] border-l-[1px] border-[#00d4ff33]" />
                    <div className="absolute bottom-24 right-8 w-16 h-16 border-b-[1px] border-r-[1px] border-[#00d4ff33]" />
                    {/* HUD Status text */}
                    <motion.div
                        className="absolute top-10 right-28 font-mono-hud text-[9px] text-[#00d4ff] tracking-[0.15em] opacity-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        SYS.ONLINE // MARK.VII
                    </motion.div>
                    <motion.div
                        className="absolute bottom-28 left-28 font-mono-hud text-[9px] text-[#00d4ff] tracking-[0.15em] opacity-30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        transition={{ delay: 1.5, duration: 1 }}
                    >
                        COORD: 28.6139°N 77.2090°E
                    </motion.div>
                </div>
            )}

            {/* === LAYER 4: HTML Text Overlay (front) === */}
            <div className="absolute inset-0 z-[4]">
                <HeroText />
            </div>

            {/* === LAYER 5: Scroll Indicator (absolute bottom) === */}
            <div
                ref={scrollIndicatorRef}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-2"
                style={{ opacity: 0 }}
            >
                <span className="font-mono-hud text-[9px] text-[#00d4ff] tracking-[0.25em] opacity-60">
                    SCROLL TO EXPLORE
                </span>
                <div className="w-[1px] h-10 bg-gradient-to-b from-[#00d4ff] to-transparent relative overflow-hidden">
                    <motion.div
                        className="w-full h-4 bg-[#00d4ff]"
                        animate={{ y: [0, 40] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>
            </div>
        </section>
    )
}
