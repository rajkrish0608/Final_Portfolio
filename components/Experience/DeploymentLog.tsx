'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { experiences } from '@/data/experience'
import { useStore } from '@/lib/store'
import { ScrollTrigger } from '@/lib/gsap'

export function DeploymentLog() {
    const sectionRef = useRef<HTMLElement>(null)
    const inView = useInView(sectionRef, { once: true, margin: '-100px' })
    const { setActiveSection } = useStore()

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return
        let st: { kill: () => void } | undefined
        const timer = setTimeout(() => {
            st = ScrollTrigger.create({
                trigger: el,
                start: 'top 50%',
                end: 'bottom 50%',
                onToggle: (self: { isActive: boolean }) => {
                    if (self.isActive) setActiveSection('experience')
                },
            })
        }, 500)
        return () => { clearTimeout(timer); st?.kill() }
    }, [setActiveSection])

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="relative w-full py-24 bg-[#0a0a0f] overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 hex-bg opacity-[0.03]" />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-16"
                >
                    <SectionLabel text="DEPLOYMENT HISTORY: EXPERIENCE" className="mb-4" />
                    <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-[#e8f4f8] tracking-tight">
                        Operational <span className="text-[#ffd700]">Logs</span>
                    </h2>
                    <p className="mt-4 font-mono-hud text-xs text-[#8bb8cc] tracking-[0.2em] max-w-lg">
                        TIMELINE OF PROFESSIONAL DEPLOYMENTS AND TECHNICAL CONTRIBUTIONS.
                    </p>
                </motion.div>

                {/* Deployment Log Cards */}
                <div className="space-y-8">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="relative glass-card rounded-lg overflow-hidden border border-[#ffffff08] hover:border-[#ffffff18] transition-all duration-500 group"
                        >
                            {/* Top Accent Bar */}
                            <div
                                className="absolute top-0 left-0 right-0 h-[3px]"
                                style={{ background: `linear-gradient(90deg, transparent, ${exp.color}, transparent)` }}
                            />

                            <div className="p-6 md:p-10">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                                    {/* Left: Job Info */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span
                                                className="font-mono-hud text-[10px] tracking-widest uppercase px-2 py-0.5 rounded border"
                                                style={{ color: exp.color, borderColor: `${exp.color}44`, backgroundColor: `${exp.color}11` }}
                                            >
                                                {exp.type === 'internship' ? 'MOD: INTERN' : `MOD: ${exp.type.toUpperCase()}`}
                                            </span>
                                            <span className="font-mono-hud text-[10px] text-[#00d4ff] tracking-widest opacity-60">
                                                {exp.period}
                                            </span>
                                        </div>
                                        <h3 className="font-orbitron font-bold text-2xl text-[#e8f4f8] tracking-wide group-hover:text-[#00d4ff] transition-colors duration-300">
                                            {exp.title}
                                        </h3>
                                        <p className="font-rajdhani text-lg font-semibold text-[#8bb8cc]">
                                            {exp.company} {'//'} <span className="text-sm font-normal opacity-60 uppercase tracking-widest">{exp.location}</span>
                                        </p>
                                    </div>

                                    {/* Right: Tech Stack Chips */}
                                    <div className="flex flex-wrap gap-2 md:max-w-[30%] justify-start md:justify-end">
                                        {exp.techStack.map(tech => (
                                            <span
                                                key={tech}
                                                className="font-mono-hud text-[9px] tracking-widest text-[#e8f4f8] bg-[#00d4ff08] border border-[#00d4ff22] px-2 py-1 rounded hover:bg-[#00d4ff18] hover:border-[#00d4ff44] transition-all duration-200"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Content: Mission Details */}
                                <div className="space-y-4">
                                    <p className="font-mono-hud text-[9px] text-[#00d4ff] tracking-[0.3em] uppercase opacity-60">
                                        [ MISSION OBJECTIVES ]
                                    </p>
                                    <ul className="space-y-4 border-l border-[#ffffff11] pl-6 md:pl-10">
                                        {exp.description.map((detail, i) => (
                                            <li key={i} className="relative">
                                                <div className="absolute -left-[29px] md:offset-[-45px] top-2.5 w-1.5 h-1.5 rounded-full bg-[#00d4ff44]" />
                                                <p className="font-rajdhani text-base text-[#8bb8cc] leading-relaxed">
                                                    {detail}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* HUD Background Decorations */}
                            <div className="absolute top-4 right-4 text-[40px] opacity-[0.03] font-orbitron font-black select-none pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-700">
                                0{index + 1}
                            </div>
                            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#ffffff11]" />
                            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#ffffff11]" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
