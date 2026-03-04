'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { RepulsorForm } from './RepulsorForm'
import { ScrollTrigger } from '@/lib/gsap'
import { useStore } from '@/lib/store'

const SOCIAL_LINKS = [
    {
        label: 'GitHub',
        href: 'https://github.com/rajkrish0608',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
        ),
        color: '#e8f4f8',
    },
    {
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/rajkrish0608',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        color: '#0077B5',
    },
    {
        label: 'Email',
        href: 'mailto:rajkrish0608@gmail.com',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
        ),
        color: '#00d4ff',
    },
]

export function ContactSection() {
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
                    if (self.isActive) setActiveSection('contact')
                },
            })
        }, 500)
        return () => { clearTimeout(timer); st?.kill() }
    }, [setActiveSection])

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative w-full py-24 md:py-32 bg-[#0a0a0f] overflow-hidden"
        >
            {/* Background: Radar sweep SVG */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-[700px] h-[700px] opacity-[0.04]">
                    {/* Concentric circles */}
                    {[1, 2, 3, 4].map(i => (
                        <div
                            key={i}
                            className="absolute inset-0 rounded-full border border-[#00d4ff]"
                            style={{ margin: `${i * 12}%` }}
                        />
                    ))}
                    {/* Radar sweep */}
                    <motion.div
                        className="absolute inset-0 origin-center"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    >
                        <div
                            className="absolute top-1/2 left-1/2 w-1/2 h-[1px] origin-left"
                            style={{
                                background: 'linear-gradient(to right, #00d4ff, transparent)',
                                transform: 'translateY(-0.5px)',
                            }}
                        />
                    </motion.div>
                    {/* Cross hairs */}
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full h-[1px] bg-[#00d4ff]" />
                    </div>
                    <div className="absolute inset-0 flex justify-center">
                        <div className="h-full w-[1px] bg-[#00d4ff]" />
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 hex-bg opacity-[0.03]" />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center mb-16"
                >
                    <SectionLabel text="OPEN COMMS CHANNEL: CONTACT" className="mb-4" />
                    <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-[#e8f4f8] tracking-tight">
                        Open <span className="text-[#00d4ff]">Channel</span>
                    </h2>
                    <p className="mt-4 font-mono-hud text-xs text-[#8bb8cc] tracking-[0.2em] max-w-md">
                        TRANSMIT A SIGNAL AND I WILL RESPOND WITHIN 24 SOLAR HOURS.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

                    {/* Left: Form */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="glass-card p-8 md:p-10 rounded-2xl border border-[#00d4ff18] relative">
                            {/* Corner decorations */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00d4ff44] rounded-tl-2xl" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00d4ff44] rounded-tr-2xl" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00d4ff44] rounded-bl-2xl" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00d4ff44] rounded-br-2xl" />

                            <p className="font-mono-hud text-[9px] text-[#00d4ff] tracking-[0.3em] mb-8 opacity-60">
                                [ SECURE COMMS CHANNEL // ENCRYPTED ]
                            </p>
                            <RepulsorForm />
                        </div>
                    </motion.div>

                    {/* Right: Social links + Meta info */}
                    <motion.div
                        className="flex flex-col gap-8"
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Social Links */}
                        <div>
                            <p className="font-mono-hud text-[9px] text-[#00d4ff] tracking-[0.25em] mb-6 opacity-60">
                                [ SIGNAL FREQUENCIES ]
                            </p>
                            <div className="space-y-3">
                                {SOCIAL_LINKS.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 rounded-xl border border-[#ffffff0a] glass-card hover:border-[#00d4ff33] group transition-all duration-300"
                                        data-cursor="hover"
                                    >
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                                            style={{
                                                color: link.color,
                                                backgroundColor: link.color + '18',
                                                boxShadow: `0 0 0 0 ${link.color}`,
                                            }}
                                        >
                                            {link.icon}
                                        </div>
                                        <div>
                                            <div className="font-mono-hud text-xs text-[#e8f4f8] tracking-widest font-semibold group-hover:text-[#00d4ff] transition-colors">
                                                {link.label}
                                            </div>
                                            <div className="font-rajdhani text-sm text-[#8bb8cc] mt-0.5 opacity-70">
                                                {link.label === 'Email' ? 'rajkrish0608@gmail.com' : `/${link.label === 'GitHub' ? 'rajkrish0608' : 'in/rajkrish0608'}`}
                                            </div>
                                        </div>
                                        <div className="ml-auto text-[#00d4ff44] group-hover:text-[#00d4ff] transition-colors text-lg">
                                            →
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Location */}
                        <div className="glass-card p-6 rounded-xl border border-[#ffffff0a]">
                            <p className="font-mono-hud text-[9px] text-[#00d4ff] tracking-[0.25em] mb-4 opacity-60">
                                [ OPERATIONAL BASE ]
                            </p>
                            <div className="font-rajdhani text-[#8bb8cc] text-sm space-y-1 leading-relaxed">
                                <p className="text-[#e8f4f8] font-semibold text-base">Raj Krish</p>
                                <p>B.Tech 3rd Year — Robotics & AIML</p>
                                <p>India 🇮🇳 // Open to Remote Globally</p>
                            </div>
                        </div>

                        {/* Response time */}
                        <div className="glass-card p-6 rounded-xl border border-[#00d4ff18] text-center">
                            <div className="relative w-12 h-12 mx-auto mb-4">
                                <div className="absolute inset-0 rounded-full border-2 border-[#00d4ff44]" />
                                <motion.div
                                    className="absolute inset-0 rounded-full border-2 border-[#00d4ff]"
                                    style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)' }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center font-mono-hud text-[9px] text-[#00d4ff] font-bold">
                                    24H
                                </div>
                            </div>
                            <p className="font-mono-hud text-[9px] text-[#8bb8cc] tracking-[0.2em] opacity-70">
                                AVG RESPONSE TIME
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Footer stripe */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-20 pt-8 border-t border-[#00d4ff11] flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <p className="font-mono-hud text-[9px] text-[#8bb8cc] tracking-[0.2em] opacity-50">
                        © 2024 RAJ KRISH — ALL SYSTEMS OPERATIONAL
                    </p>
                    <p className="font-mono-hud text-[9px] text-[#00d4ff] tracking-[0.2em] opacity-30">
                        MARK VII // BUILT WITH NEXT.JS + THREE.JS + GSAP
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
