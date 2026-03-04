'use client'

import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { SectionLabel } from '../shared/SectionLabel'
import { useStore } from '@/lib/store'

/**
 * HeroText — Phase-aware text overlay
 *
 * Consumes the heroPhase from the global store.
 * TEXT_REVEAL → Name and tagline stagger in
 * AMBIENT     → Typewriter loops
 */
export function HeroText() {
    const { heroPhase } = useStore()

    const showLabel = heroPhase === 'TEXT_REVEAL' || heroPhase === 'AMBIENT'
    const showName = heroPhase === 'TEXT_REVEAL' || heroPhase === 'AMBIENT'
    const showTagline = heroPhase === 'AMBIENT'

    return (
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pointer-events-none select-none">

            {/* System module label */}
            <motion.div
                initial={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
                animate={{
                    opacity: showLabel ? 1 : 0,
                    y: showLabel ? 0 : -15,
                    filter: showLabel ? 'blur(0px)' : 'blur(8px)',
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <SectionLabel text="SYSTEM.IDENTITY_MODULE" className="mb-8 mx-auto w-max" />
            </motion.div>

            {/* Main name — staggered word reveal */}
            <div className="overflow-hidden">
                <motion.h1
                    className="font-orbitron font-extrabold text-5xl md:text-7xl lg:text-[8rem] tracking-[0.08em] text-[#e8f4f8] uppercase leading-none"
                    style={{
                        textShadow: showName
                            ? '0 0 30px rgba(0,212,255,0.3), 0 0 60px rgba(0,212,255,0.1)'
                            : 'none',
                    }}
                    initial={{ opacity: 0, y: 80, filter: 'blur(12px)' }}
                    animate={{
                        opacity: showName ? 1 : 0,
                        y: showName ? 0 : 80,
                        filter: showName ? 'blur(0px)' : 'blur(12px)',
                    }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    RAJ
                </motion.h1>
            </div>

            <div className="overflow-hidden mt-2">
                <motion.h1
                    className="font-orbitron font-extrabold text-5xl md:text-7xl lg:text-[8rem] tracking-[0.08em] uppercase leading-none"
                    initial={{ opacity: 0, y: 80, filter: 'blur(12px)' }}
                    animate={{
                        opacity: showName ? 1 : 0,
                        y: showName ? 0 : 80,
                        filter: showName ? 'blur(0px)' : 'blur(12px)',
                    }}
                    transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] via-[#ffffff] to-[#00d4ff] bg-[length:200%_auto] animate-shimmer">
                        KRISH
                    </span>
                </motion.h1>
            </div>

            {/* Tagline capsule with typewriter */}
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{
                    opacity: showTagline ? 1 : 0,
                    y: showTagline ? 0 : 20,
                    scale: showTagline ? 1 : 0.95,
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 font-mono-hud text-[#8bb8cc] text-sm md:text-base tracking-[0.15em]"
            >
                <div className="flex items-center gap-3">
                    {/* Pulsing dot */}
                    <span className="inline-block w-2 h-2 rounded-full bg-[#00d4ff] arc-pulse" />

                    <span className="bg-[rgba(0,212,255,0.05)] border border-[#00d4ff22] backdrop-blur-md px-6 py-3 rounded-full">
                        {showTagline ? (
                            <TypeAnimation
                                sequence={[
                                    'Robotics & AIML Specialist',
                                    2500,
                                    'Engineering Intelligence.',
                                    2500,
                                    'Building the Future.',
                                    2500,
                                    'B.Tech 3rd Year — Top 1%',
                                    2500,
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                                cursor={true}
                            />
                        ) : (
                            <span className="opacity-50">INITIALIZING...</span>
                        )}
                    </span>
                </div>
            </motion.div>

            {/* Bottom subtitle line — only in ambient */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: showTagline ? 0.3 : 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-6 font-mono-hud text-[10px] text-[#00d4ff] tracking-[0.3em]"
            >
                [ JARVIS SYSTEM v7.0 // ALL MODULES ONLINE ]
            </motion.p>
        </div>
    )
}
