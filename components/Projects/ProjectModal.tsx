'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Project } from '@/data/projects'

interface ProjectModalProps {
    project: Project | null
    onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null)

    // Scroll lock when modal is open
    useEffect(() => {
        if (project) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [project])

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [onClose])

    return (
        <AnimatePresence mode="wait">
            {project && (
                <>
                    {/* ── Backdrop ── */}
                    <motion.div
                        ref={overlayRef}
                        key="backdrop"
                        className="fixed inset-0 z-[200] bg-[#0a0a0fcc] backdrop-blur-md cursor-pointer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                    />

                    {/* ── Modal panel ── */}
                    <motion.div
                        key="modal"
                        className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <motion.div
                            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0d0d1a] border rounded-2xl pointer-events-auto"
                            style={{ borderColor: project.color + '44' }}
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Colour accent bar */}
                            <div
                                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                                style={{ background: `linear-gradient(to right, transparent, ${project.color}, transparent)` }}
                            />

                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-5 right-5 font-mono-hud text-[10px] tracking-widest text-[#8bb8cc] hover:text-[#e8f4f8] border border-[#00d4ff22] hover:border-[#00d4ff55] px-3 py-1.5 rounded-full transition-all duration-200 z-10"
                            >
                                [ ESC ]
                            </button>

                            <div className="p-8 pt-10">
                                {/* Domain + year header */}
                                <div className="flex items-center gap-3 mb-4">
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
                                    <span className="font-mono-hud text-[9px] text-[#00d4ff44] tracking-wider">
                                        {project.year}
                                    </span>
                                    {project.featured && (
                                        <span className="font-mono-hud text-[9px] text-[#ffd700] border border-[#ffd70044] px-2 py-0.5 rounded-full bg-[#ffd70011]">
                                            FEATURED
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h2
                                    className="font-orbitron font-bold text-3xl text-[#e8f4f8] tracking-wide mb-6"
                                    style={{ textShadow: `0 0 20px ${project.color}44` }}
                                >
                                    {project.title}
                                </h2>

                                {/* Long description */}
                                <p className="font-rajdhani text-[#8bb8cc] text-base leading-loose mb-8 border-l-2 pl-5"
                                    style={{ borderColor: project.color + '66' }}>
                                    {project.longDescription}
                                </p>

                                {/* Tech stack tags */}
                                <div className="mb-8">
                                    <p className="font-mono-hud text-[9px] text-[#00d4ff] tracking-[0.2em] mb-3 opacity-60">
                                        [ TECH STACK ]
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="font-mono-hud text-[10px] tracking-wider text-[#e8f4f8] border border-[#00d4ff22] bg-[#00d4ff0a] px-3 py-1 rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Links */}
                                <div className="flex gap-4">
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-mono-hud text-xs tracking-widest px-5 py-2.5 border border-[#00d4ff44] text-[#00d4ff] rounded hover:bg-[#00d4ff11] hover:border-[#00d4ff] transition-all duration-200"
                                        >
                                            VIEW SOURCE →
                                        </a>
                                    )}
                                    {project.demoUrl && (
                                        <a
                                            href={project.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-mono-hud text-xs tracking-widest px-5 py-2.5 text-[#0a0a0f] font-semibold rounded transition-all duration-200"
                                            style={{ backgroundColor: project.color, boxShadow: `0 0 20px ${project.color}55` }}
                                        >
                                            LIVE DEMO →
                                        </a>
                                    )}
                                    {!project.githubUrl && !project.demoUrl && (
                                        <span className="font-mono-hud text-[10px] text-[#00d4ff44] tracking-widest">
                                            [ CLASSIFIED — LINKS REDACTED ]
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* HUD corner brackets */}
                            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#00d4ff22] rounded-bl-2xl" />
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#00d4ff22] rounded-br-2xl" />
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
