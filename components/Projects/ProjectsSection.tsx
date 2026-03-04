'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { ProjectCard3D } from './ProjectCard3D'
import { ProjectModal } from './ProjectModal'
import { projects, Project } from '@/data/projects'
import { ScrollTrigger } from '@/lib/gsap'
import { useStore } from '@/lib/store'

export function ProjectsSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const [activeProject, setActiveProject] = useState<Project | null>(null)
    const { setActiveSection } = useStore()

    // Active nav tracking
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
                    if (self.isActive) setActiveSection('projects')
                },
            })
        }, 500)
        return () => { clearTimeout(timer); st?.kill() }
    }, [setActiveSection])

    // Separate featured from regular
    const featured = projects.filter((p) => p.featured)
    const rest = projects.filter((p) => !p.featured)

    return (
        <>
            <section
                id="projects"
                ref={sectionRef}
                className="relative w-full min-h-screen py-24 bg-[#0a0a0f] overflow-hidden"
            >
                {/* Background */}
                <div className="absolute inset-0 hex-bg opacity-[0.03]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#ffd700] rounded-full opacity-[0.02] blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center text-center mb-16 md:mb-20"
                    >
                        <SectionLabel text="MISSION ARCHIVES: PROJECTS" className="mb-4" />
                        <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-[#e8f4f8] tracking-tight">
                            Deployed <span className="text-[#ffd700]">Missions</span>
                        </h2>
                        <p className="mt-4 font-mono-hud text-xs text-[#8bb8cc] tracking-[0.2em] max-w-lg">
                            CLASSIFIED OPERATIONS. CLICK ANY FILE TO DECRYPT.
                        </p>
                    </motion.div>

                    {/* Featured project — full-width banner card */}
                    {featured.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="mb-12"
                        >
                            <p className="font-mono-hud text-[9px] text-[#00d4ff] tracking-[0.3em] mb-4 opacity-60">
                                [ PRIMARY MISSION ]
                            </p>
                            <div className="group cursor-pointer" onClick={() => setActiveProject(featured[0])}>
                                <div
                                    className="relative rounded-2xl overflow-hidden border bg-[#0d0d1a] p-8 md:p-12 transition-all duration-500 hover:shadow-[0_0_60px_rgba(0,212,255,0.12)]"
                                    style={{ borderColor: featured[0].color + '33' }}
                                >
                                    {/* Top stripe */}
                                    <div
                                        className="absolute top-0 left-0 right-0 h-[2px]"
                                        style={{ background: `linear-gradient(to right, transparent, ${featured[0].color}, transparent)` }}
                                    />
                                    {/* Background glow blob */}
                                    <div
                                        className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 rounded-full blur-[100px] opacity-10"
                                        style={{ backgroundColor: featured[0].color }}
                                    />

                                    <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                                        <div className="flex-grow">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="text-4xl">🧠</span>
                                                <span
                                                    className="font-mono-hud text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border"
                                                    style={{ color: featured[0].color, borderColor: featured[0].color + '44', backgroundColor: featured[0].color + '11' }}
                                                >
                                                    {featured[0].domain}
                                                </span>
                                                <span className="font-mono-hud text-[9px] text-[#ffd700] border border-[#ffd70044] px-2 py-0.5 rounded-full bg-[#ffd70011]">
                                                    FEATURED
                                                </span>
                                                <span className="font-mono-hud text-[9px] text-[#00d4ff44] ml-auto">
                                                    {featured[0].year}
                                                </span>
                                            </div>
                                            <h3
                                                className="font-orbitron font-bold text-2xl md:text-4xl text-[#e8f4f8] mb-4 tracking-wide"
                                                style={{ textShadow: `0 0 20px ${featured[0].color}44` }}
                                            >
                                                {featured[0].title}
                                            </h3>
                                            <p className="font-rajdhani text-[#8bb8cc] text-base leading-relaxed max-w-2xl mb-6">
                                                {featured[0].description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {featured[0].tags.map((tag) => (
                                                    <span key={tag} className="font-mono-hud text-[9px] text-[#8bb8cc] bg-[#00d4ff0a] border border-[#00d4ff18] px-2 py-0.5 rounded">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <div className="flex-shrink-0">
                                            <div
                                                className="font-mono-hud text-xs tracking-widest px-8 py-4 rounded-lg border transition-all duration-300 group-hover:brightness-110"
                                                style={{ color: featured[0].color, borderColor: featured[0].color + '66', backgroundColor: featured[0].color + '11' }}
                                            >
                                                DECRYPT FILE →
                                            </div>
                                        </div>
                                    </div>

                                    {/* HUD corners */}
                                    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#00d4ff22]" />
                                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#00d4ff22]" />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Secondary projects grid */}
                    <p className="font-mono-hud text-[9px] text-[#00d4ff] tracking-[0.3em] mb-6 opacity-60">
                        [ SECONDARY MISSIONS ]
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 group">
                        {rest.map((project, i) => (
                            <ProjectCard3D
                                key={project.id}
                                project={project}
                                index={i + 1}
                                onOpen={setActiveProject}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Global modal (portal-like, outside section flow) */}
            <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
        </>
    )
}
