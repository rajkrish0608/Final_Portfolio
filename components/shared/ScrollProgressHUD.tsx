'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from '@/lib/gsap'
import Lenis from 'lenis'

export function ScrollProgressHUD() {
    const { scrollYProgress } = useScroll()
    const lenisRef = useRef<Lenis | null>(null)

    // Smooth the scroll progress for the visual bar
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    // Map progress to percentage number (0-100)
    const percentage = useTransform(scrollYProgress, [0, 1], [0, 100])
    const roundedPercentage = useTransform(percentage, (v) => Math.round(v))

    // Lenis ↔ GSAP Sync
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            touchMultiplier: 2,
        })

        lenisRef.current = lenis

        lenis.on('scroll', ScrollTrigger.update)

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })

        gsap.ticker.lagSmoothing(0)

        return () => {
            gsap.ticker.remove((time) => lenis.raf(time * 1000))
            lenis.destroy()
        }
    }, [])

    return (
        <>
            {/* ── Right-edge HUD Bar ── */}
            <div className="fixed right-0 top-0 bottom-0 w-8 z-50 pointer-events-none hidden md:flex flex-col items-center py-20 opacity-60">

                {/* Top bracket */}
                <div className="w-2 h-2 border-t-2 border-r-2 border-[#00d4ff] mb-2 mr-2" />

                {/* The Track */}
                <div className="relative w-[1px] h-full bg-[#00d4ff22] mr-2">
                    {/* The Fill */}
                    <motion.div
                        className="absolute top-0 left-0 w-full bg-[#00d4ff]"
                        style={{
                            scaleY,
                            originY: 0,
                            boxShadow: '0 0 10px #00d4ff'
                        }}
                    />

                    {/* Gliding Number Indicator */}
                    <motion.div
                        className="absolute right-4 translate-x-full text-right font-mono-hud text-[9px] text-[#00d4ff] tracking-widest whitespace-nowrap"
                        style={{
                            top: useTransform(scaleY, [0, 1], ['0%', '100%']),
                            y: '-50%' // Center it on the line
                        }}
                    >
                        {/* 0-100 Number */}
                        <motion.span>{roundedPercentage}</motion.span>
                        <span className="opacity-50 ml-0.5">%</span>

                        {/* Pointer line connecting number to bar */}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 w-3 h-[1px] bg-[#00d4ff] opacity-50 mr-1" />
                    </motion.div>
                </div>

                {/* Bottom bracket */}
                <div className="w-2 h-2 border-b-2 border-r-2 border-[#00d4ff] mt-2 mr-2" />
            </div>
        </>
    )
}
