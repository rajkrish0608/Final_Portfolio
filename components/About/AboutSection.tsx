'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { HologramAvatar } from './HologramAvatar'
import { StatCounters } from './StatCounters'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { ScrollTrigger } from '@/lib/gsap'
import { useStore } from '@/lib/store'
import { useEffect } from 'react'

const ABOUT_PARAGRAPHS = [
    "I'm a B.Tech 3rd Year student specialising in Robotics and Artificial Intelligence — building systems that think, move, and adapt.",
    "From Brain-Computer Interfaces to autonomous drones, I engineer end-to-end solutions across the full hardware-software stack with the precision of a seasoned architect.",
    "I code like a senior. I think like a researcher. I execute like a startup founder.",
]

export function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const inView = useInView(sectionRef, { once: true, margin: '-100px' })
    const { setActiveSection } = useStore()

    // ScrollTrigger — update active nav section
    useEffect(() => {
        const el = sectionRef.current
        if (!el) return

        let st: { kill: () => void } | undefined

        // Wait a tick for the DOM to settle
        const timer = setTimeout(() => {
            st = ScrollTrigger.create({
                trigger: el,
                start: 'top 60%',
                end: 'bottom 40%',
                onToggle: (self: { isActive: boolean }) => {
                    if (self.isActive) setActiveSection('about')
                },
            })
        }, 500)

        return () => {
            clearTimeout(timer)
            st?.kill()
        }
    }, [setActiveSection])

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    }

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative w-full min-h-screen flex items-center py-24 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-[#0a0a0f]" />
            <div className="absolute inset-0 hex-bg opacity-[0.04]" />
            {/* Subtle left glow */}
            <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00d4ff] rounded-full opacity-[0.03] blur-[100px]" />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-16"
                >
                    <SectionLabel text="SYSTEM MODULE: IDENTITY" className="mb-4" />
                    <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-[#e8f4f8] tracking-tight">
                        About{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#ffffff]">
                            the Engineer
                        </span>
                    </h2>
                </motion.div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* LEFT — Hologram Avatar */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    >
                        <HologramAvatar />
                    </motion.div>

                    {/* RIGHT — Text content */}
                    <motion.div
                        ref={contentRef}
                        variants={containerVariants}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                    >
                        {/* Typewriter tagline */}
                        <motion.div variants={itemVariants} className="mb-6">
                            <p className="font-mono-hud text-xs text-[#00d4ff] tracking-[0.25em] mb-3 opacity-70">
                                [ IDENTITY.TAGLINE ]
                            </p>
                            <div className="font-orbitron text-xl md:text-2xl text-[#e8f4f8] font-semibold leading-snug">
                                <TypeAnimation
                                    sequence={[
                                        'Engineering Intelligence.',
                                        3000,
                                        'Building Autonomous Systems.',
                                        3000,
                                        'Bridging Mind & Machine.',
                                        3000,
                                    ]}
                                    wrapper="span"
                                    speed={50}
                                    repeat={Infinity}
                                    cursor
                                />
                            </div>
                        </motion.div>

                        {/* Bio paragraphs */}
                        {ABOUT_PARAGRAPHS.map((para, i) => (
                            <motion.p
                                key={i}
                                variants={itemVariants}
                                className="font-rajdhani text-[#8bb8cc] text-lg leading-relaxed mb-4 border-l-2 border-[#00d4ff22] pl-4 hover:border-[#00d4ff66] transition-colors duration-300"
                            >
                                {para}
                            </motion.p>
                        ))}

                        {/* Specialisation tags */}
                        <motion.div variants={itemVariants} className="mt-6 flex flex-wrap gap-2">
                            {[
                                { label: '🧠 Brain-Computer Interface', color: '#00d4ff' },
                                { label: '🤖 Autonomous Robotics', color: '#c0392b' },
                                { label: '⚡ Edge AI / Embedded ML', color: '#ffd700' },
                                { label: '🌐 Full-Stack Systems', color: '#00ff88' },
                            ].map((tag) => (
                                <span
                                    key={tag.label}
                                    className="font-mono-hud text-[10px] tracking-wider px-3 py-1.5 rounded-full border"
                                    style={{
                                        color: tag.color,
                                        borderColor: tag.color + '44',
                                        backgroundColor: tag.color + '0d',
                                    }}
                                >
                                    {tag.label}
                                </span>
                            ))}
                        </motion.div>

                        {/* CTA buttons */}
                        <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
                            <a
                                href="#projects"
                                onClick={(e) => {
                                    e.preventDefault()
                                    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                                }}
                                className="font-mono-hud text-xs tracking-[0.2em] px-6 py-3 bg-[#00d4ff] text-[#0a0a0f] font-semibold rounded hover:bg-[#00aaff] hover:shadow-[0_0_20px_#00d4ff66] transition-all duration-300"
                                data-cursor="hover"
                            >
                                VIEW MISSIONS →
                            </a>
                            <a
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault()
                                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                                }}
                                className="font-mono-hud text-xs tracking-[0.2em] px-6 py-3 border border-[#00d4ff44] text-[#00d4ff] rounded hover:border-[#00d4ff] hover:bg-[#00d4ff11] transition-all duration-300"
                                data-cursor="hover"
                            >
                                OPEN COMMS
                            </a>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Stat Counters */}
                <StatCounters />
            </div>
        </section>
    )
}
