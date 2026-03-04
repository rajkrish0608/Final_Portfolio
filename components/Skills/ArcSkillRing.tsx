'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Skill } from '@/data/skills'

interface ArcSkillRingProps {
    skill: Skill
    delay?: number
}

export function ArcSkillRing({ skill, delay = 0 }: ArcSkillRingProps) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-50px' })

    const radius = 40
    const circumference = 2 * Math.PI * radius
    // Calculate dash offset based on skill level (0-100)
    const targetOffset = circumference - (skill.level / 100) * circumference

    return (
        <div
            ref={ref}
            className="relative flex flex-col items-center justify-center p-4 group"
        >
            {/* Tooltip on Hover */}
            <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 w-48 text-center pointer-events-none">
                <div className="bg-[#0a0a0f] border border-[#00d4ff44] text-[#8bb8cc] text-[10px] font-mono-hud p-2 rounded backdrop-blur-md">
                    {skill.detail}
                </div>
                {/* Triangle pointer */}
                <div className="w-2 h-2 border-r border-b border-[#00d4ff44] bg-[#0a0a0f] rotate-45 mx-auto -mt-[5px]" />
            </div>

            <div className="relative w-28 h-28 flex items-center justify-center">
                {/* Background track */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-[#00d4ff11]"
                    />
                </svg>

                {/* Animated fill indicator */}
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                    <motion.circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        fill="transparent"
                        stroke={skill.color}
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={inView ? { strokeDashoffset: targetOffset } : {}}
                        transition={{
                            duration: 2,
                            delay: delay,
                            ease: [0.16, 1, 0.3, 1], // Custom custom cubic bezier
                        }}
                        style={{
                            filter: `drop-shadow(0 0 6px ${skill.color}88)`,
                        }}
                    />
                </svg>

                {/* Level text inside ring */}
                <div className="absolute flex flex-col items-center justify-center">
                    <motion.span
                        className="font-orbitron font-bold text-lg text-[#e8f4f8]"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: delay + 0.5 }}
                    >
                        {skill.level}%
                    </motion.span>
                </div>
            </div>

            {/* Skill Name */}
            <motion.div
                className="mt-4 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: delay + 0.2 }}
            >
                <h4 className="font-mono-hud text-xs tracking-widest text-[#e8f4f8] uppercase mb-1">
                    {skill.name}
                </h4>
                <div
                    className="h-[2px] w-8 mx-auto rounded"
                    style={{ backgroundColor: skill.color, boxShadow: `0 0 8px ${skill.color}` }}
                />
            </motion.div>
        </div>
    )
}
