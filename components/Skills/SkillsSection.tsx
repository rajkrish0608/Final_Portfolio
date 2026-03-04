'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { ArcSkillRing } from './ArcSkillRing'
import { skills, skillCategories } from '@/data/skills'
import { ScrollTrigger } from '@/lib/gsap'
import { useStore } from '@/lib/store'

export function SkillsSection() {
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
                    if (self.isActive) setActiveSection('skills')
                },
            })
        }, 500)

        return () => {
            clearTimeout(timer)
            st?.kill()
        }
    }, [setActiveSection])

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="relative w-full min-h-screen py-24 bg-[#0a0a0f] overflow-hidden"
        >
            {/* Background grids/gradients */}
            <div className="absolute inset-0 hex-bg opacity-[0.03]" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c0392b] rounded-full opacity-[0.02] blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center mb-16 md:mb-24"
                >
                    <SectionLabel text="SYSTEM DIAGNOSTICS: SKILLS" className="mb-4" />
                    <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-[#e8f4f8] tracking-tight">
                        Combat <span className="text-[#00d4ff]">Capabilities</span>
                    </h2>
                    <p className="mt-4 font-mono-hud text-xs text-[#8bb8cc] tracking-[0.2em] max-w-lg">
                        ANALYSING PROFICIENCY LEVELS ACROSS AI, ROBOTICS, AND FULL-STACK SYSTEMS.
                    </p>
                </motion.div>

                {/* Categories Grid */}
                <div className="flex flex-col gap-20">
                    {skillCategories.map((category, catIndex) => {
                        const categorySkills = skills.filter((s) => s.category === category.id)

                        return (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: catIndex * 0.2, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {/* Category Header */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div
                                        className="h-[1px] flex-grow opacity-30"
                                        style={{ background: `linear-gradient(to right, transparent, ${category.color})` }}
                                    />
                                    <h3
                                        className="font-orbitron font-semibold text-xl md:text-2xl tracking-widest uppercase"
                                        style={{ color: category.color, textShadow: `0 0 10px ${category.color}44` }}
                                    >
                                        {category.label}
                                    </h3>
                                    <div
                                        className="h-[1px] flex-grow opacity-30"
                                        style={{ background: `linear-gradient(to left, transparent, ${category.color})` }}
                                    />
                                </div>

                                {/* Skills Row */}
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 justify-items-center">
                                    {categorySkills.map((skill, index) => (
                                        <ArcSkillRing
                                            key={skill.id}
                                            skill={skill}
                                            delay={catIndex * 0.2 + index * 0.1}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}
