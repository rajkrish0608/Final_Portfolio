'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { achievements } from '@/data/achievements'
import { useStore } from '@/lib/store'
import { ScrollTrigger } from '@/lib/gsap'

export function MissionTimeline() {
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
                    if (self.isActive) setActiveSection('achievements')
                },
            })
        }, 500)
        return () => { clearTimeout(timer); st?.kill() }
    }, [setActiveSection])

    return (
        <section
            id="achievements"
            ref={sectionRef}
            className="relative w-full py-24 bg-[#0a0a0f] overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute inset-0 hex-bg opacity-[0.03]" />
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[#a31018] rounded-full opacity-[0.02] blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-16 md:mb-24"
                >
                    <SectionLabel text="COMBAT RECORD: ACHIEVEMENTS" className="mb-4" />
                    <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-[#e8f4f8] tracking-tight">
                        Mission <span className="text-[#c0392b]">Successes</span>
                    </h2>
                    <p className="mt-4 font-mono-hud text-xs text-[#8bb8cc] tracking-[0.2em] max-w-lg">
                        CHRONOLOGICAL LOG OF DEPLOYED INNOVATIONS AND COMPETITIVE VICTORIES.
                    </p>
                </motion.div>

                {/* Timeline Line */}
                <div className="relative">
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#c0392b44] via-[#00d4ff44] to-transparent hidden md:block" />

                    {/* Achievement Cards */}
                    <div className="space-y-12 md:space-y-24">
                        {achievements.map((achievement, index) => {
                            const isLeft = index % 2 === 0
                            return (
                                <div key={achievement.id} className="relative flex flex-col md:flex-row items-center justify-between">
                                    {/* Timeline Node Point (Desktop) */}
                                    <div className="absolute left-1/2 -translate-x-1/2 top-0 hidden md:block">
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={inView ? { scale: 1, opacity: 1 } : {}}
                                            transition={{ delay: index * 0.15, duration: 0.5, type: 'spring' }}
                                            className="w-4 h-4 rounded-full bg-[#0a0a0f] border-2 z-20"
                                            style={{ borderColor: achievement.color }}
                                        >
                                            <div className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: achievement.color }} />
                                        </motion.div>
                                    </div>

                                    {/* Card Container */}
                                    <div className={`w-full md:w-[45%] ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}`}>
                                        <motion.div
                                            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                                            animate={inView ? { opacity: 1, x: 0 } : {}}
                                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                            className="glass-card p-6 md:p-8 rounded-xl border-l-4 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.4)] group"
                                            style={{ borderLeftColor: achievement.color }}
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="font-mono-hud text-[10px] tracking-widest text-[#8bb8cc]">
                                                    {achievement.date}
                                                </span>
                                                <span className="text-2xl">{achievement.badge}</span>
                                            </div>
                                            <h3 className="font-orbitron font-bold text-xl text-[#e8f4f8] mb-2 group-hover:text-[#00d4ff] transition-colors duration-300">
                                                {achievement.title}
                                            </h3>
                                            <p className="font-mono-hud text-[10px] tracking-[0.15em] text-[#00d4ff] uppercase mb-4 opacity-70">
                                                {achievement.institution} {achievement.rank && `// ${achievement.rank}`}
                                            </p>
                                            <p className="font-rajdhani text-[#8bb8cc] text-sm leading-relaxed">
                                                {achievement.description}
                                            </p>

                                            {/* HUD Decorations */}
                                            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#ffffff11]" />
                                            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#ffffff11]" />
                                        </motion.div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
