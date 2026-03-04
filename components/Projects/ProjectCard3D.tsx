'use client'

import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Project } from '@/data/projects'

const DOMAIN_ICONS: Record<Project['domain'], string> = {
    ai: '🧠',
    robotics: '🤖',
    iot: '📡',
    web: '🌐',
    quantum: '⚛️',
}

interface ProjectCard3DProps {
    project: Project
    index: number
    onOpen: (project: Project) => void
}

export function ProjectCard3D({ project, index, onOpen }: ProjectCard3DProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [tilt, setTilt] = useState({ x: 0, y: 0 })
    const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
    const [hovered, setHovered] = useState(false)

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const cx = rect.width / 2
        const cy = rect.height / 2
        const tiltX = ((y - cy) / cy) * -12  // max ±12°
        const tiltY = ((x - cx) / cx) * 12
        setTilt({ x: tiltX, y: tiltY })
        // Glow position as percentage
        setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 })
    }, [])

    const handleMouseLeave = useCallback(() => {
        setTilt({ x: 0, y: 0 })
        setHovered(false)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="perspective-[1000px] cursor-pointer"
            onClick={() => onOpen(project)}
        >
            <motion.div
                ref={cardRef}
                animate={{
                    rotateX: tilt.x,
                    rotateY: tilt.y,
                    scale: hovered ? 1.04 : 1,
                    z: hovered ? 20 : 0,
                }}
                transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={handleMouseLeave}
                className="relative rounded-xl overflow-hidden border border-[#00d4ff18] bg-[#0d0d1a] h-full"
                style={{
                    transformStyle: 'preserve-3d',
                    boxShadow: hovered
                        ? `0 0 40px ${project.color}22, 0 20px 60px rgba(0,0,0,0.6)`
                        : '0 4px 30px rgba(0,0,0,0.4)',
                }}
            >
                {/* ── Dynamic glow highlight under cursor ── */}
                <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
                    style={{
                        opacity: hovered ? 1 : 0,
                        background: `radial-gradient(circle 200px at ${glowPos.x}% ${glowPos.y}%, ${project.color}18, transparent)`,
                    }}
                />

                {/* ── Colour accent stripe at top ── */}
                <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(to right, transparent, ${project.color}, transparent)` }}
                />

                {/* ── Featured badge ── */}
                {project.featured && (
                    <div className="absolute top-4 right-4 z-20 font-mono-hud text-[9px] tracking-widest text-[#ffd700] border border-[#ffd70044] px-2 py-0.5 rounded-full bg-[#ffd70011]">
                        FEATURED
                    </div>
                )}

                {/* ── Card content ── */}
                <div className="p-6 flex flex-col h-full min-h-[280px]">
                    {/* Domain icon + year */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">{DOMAIN_ICONS[project.domain]}</span>
                            <span
                                className="font-mono-hud text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full border"
                                style={{
                                    color: project.color,
                                    borderColor: project.color + '44',
                                    backgroundColor: project.color + '11',
                                }}
                            >
                                {project.domain}
                            </span>
                        </div>
                        <span className="font-mono-hud text-[9px] text-[#00d4ff44] tracking-wider">
                            {project.year}
                        </span>
                    </div>

                    {/* Title */}
                    <h3
                        className="font-orbitron font-bold text-xl text-[#e8f4f8] tracking-wide mb-3 group-hover:text-[#00d4ff] transition-colors"
                        style={{ textShadow: hovered ? `0 0 15px ${project.color}66` : 'none' }}
                    >
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="font-rajdhani text-[#8bb8cc] text-sm leading-relaxed flex-grow mb-5">
                        {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 4).map((tag) => (
                            <span
                                key={tag}
                                className="font-mono-hud text-[8px] tracking-wider text-[#8bb8cc] bg-[#00d4ff0a] border border-[#00d4ff18] px-2 py-0.5 rounded"
                            >
                                {tag}
                            </span>
                        ))}
                        {project.tags.length > 4 && (
                            <span className="font-mono-hud text-[8px] tracking-wider text-[#00d4ff66] px-1">
                                +{project.tags.length - 4}
                            </span>
                        )}
                    </div>

                    {/* Open indicator */}
                    <div className="mt-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div
                            className="w-full h-[1px] flex-grow"
                            style={{ background: `linear-gradient(to right, ${project.color}44, transparent)` }}
                        />
                        <span
                            className="font-mono-hud text-[9px] tracking-widest"
                            style={{ color: project.color }}
                        >
                            OPEN FILE →
                        </span>
                    </div>
                </div>

                {/* ── HUD corners ── */}
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-[#00d4ff33]" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[#00d4ff33]" />
            </motion.div>
        </motion.div>
    )
}
