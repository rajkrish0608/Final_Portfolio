'use client'

import { useRef, useEffect } from 'react'
import { useInView } from 'framer-motion'
import { CountUp } from 'countup.js'
import { stats } from '@/data/achievements'

export function StatCounters() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    useEffect(() => {
        if (!inView) return

        stats.forEach((stat, i) => {
            const el = document.getElementById(`stat-${i}`)
            if (!el) return

            const counter = new CountUp(el, stat.value, {
                duration: 2,
                startVal: 0,
                suffix: stat.suffix,
                useEasing: true,
                easingFn: (t, b, c, d) => {
                    // Custom cubic ease out
                    t /= d
                    t--
                    return c * (t * t * t + 1) + b
                },
            })

            // Slight stagger per stat card
            setTimeout(() => counter.start(), i * 120)
        })
    }, [inView])

    return (
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {stats.map((stat, i) => (
                <div
                    key={stat.label}
                    className="glass-card rounded-lg p-4 flex flex-col items-center justify-center text-center group hover:border-[#00d4ff44] transition-all duration-300 relative overflow-hidden"
                >
                    {/* Corner brackets */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#00d4ff44]" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#00d4ff44]" />

                    {/* Glow bg on hover */}
                    <div className="absolute inset-0 bg-[#00d4ff] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300" />

                    <div className="font-orbitron font-bold text-3xl md:text-4xl text-[#00d4ff] tracking-tight leading-none">
                        <span id={`stat-${i}`}>0</span>
                    </div>
                    <div className="mt-2 font-mono-hud text-[9px] text-[#8bb8cc] tracking-[0.2em] uppercase">
                        {stat.label}
                    </div>
                </div>
            ))}
        </div>
    )
}
