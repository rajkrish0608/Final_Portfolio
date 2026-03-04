'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TECH_BADGES = [
    { label: 'Python', color: '#3776AB', angle: 0 },
    { label: 'TensorFlow', color: '#FF6F00', angle: 40 },
    { label: 'ROS2', color: '#c0392b', angle: 80 },
    { label: 'PyTorch', color: '#EE4C2C', angle: 120 },
    { label: 'ESP32', color: '#00ff88', angle: 160 },
    { label: 'Next.js', color: '#e8f4f8', angle: 200 },
    { label: 'Three.js', color: '#049EF4', angle: 240 },
    { label: 'OpenCV', color: '#ffd700', angle: 280 },
    { label: 'C++', color: '#00599C', angle: 320 },
]

export function HologramAvatar() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-100px' })

    // Use a smaller orbit for mobile
    const isMobileRef = useRef(typeof window !== 'undefined' && window.innerWidth < 768)

    return (
        <div ref={ref} className="relative flex items-center justify-center w-full h-[360px] md:h-[480px] lg:h-[560px]">

            {/* ── Outer orbit ring ── */}
            <motion.div
                className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full border border-[#00d4ff22]"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />

            {/* ── Tech badges orbiting ── */}
            {TECH_BADGES.map((badge, i) => {
                const radius = isMobileRef.current ? 120 : 185
                const angleRad = (badge.angle * Math.PI) / 180
                const x = Math.cos(angleRad) * radius
                const y = Math.sin(angleRad) * radius
                return (
                    <motion.div
                        key={badge.label}
                        className="absolute font-mono-hud text-[9px] tracking-widest px-2 py-1 rounded-full border"
                        style={{
                            left: `calc(50% + ${x}px)`,
                            top: `calc(50% + ${y}px)`,
                            transform: 'translate(-50%, -50%)',
                            color: badge.color,
                            borderColor: badge.color + '44',
                            backgroundColor: badge.color + '11',
                            boxShadow: `0 0 8px ${badge.color}33`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: i * 0.08, duration: 0.5, type: 'spring', stiffness: 200 }}
                    >
                        {badge.label}
                    </motion.div>
                )
            })}

            {/* ── Inner ring (counter-rotating) ── */}
            <motion.div
                className="absolute w-[200px] h-[200px] md:w-[240px] md:h-[240px] rounded-full border-2 border-dashed border-[#00d4ff33]"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />

            {/* ── Hexagonal silhouette ── */}
            <motion.div
                className="relative w-[150px] h-[150px] md:w-[180px] md:h-[180px] flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            >
                {/* Glow backing disc */}
                <div className="absolute inset-0 rounded-full bg-[#00d4ff] opacity-[0.04] blur-2xl" />

                {/* Hexagonal border SVG */}
                <svg viewBox="0 0 100 100" className="absolute w-full h-full">
                    <motion.polygon
                        points="50,5 93,27 93,73 50,95 7,73 7,27"
                        fill="none"
                        stroke="#00d4ff"
                        strokeWidth="1.5"
                        strokeDasharray="200"
                        initial={{ strokeDashoffset: 200 }}
                        animate={inView ? { strokeDashoffset: 0 } : {}}
                        transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
                    />
                </svg>

                {/* Avatar silhouette — stylised human torso */}
                <svg
                    viewBox="0 0 64 80"
                    className="w-[72px] h-[90px] md:w-[88px] md:h-[110px]"
                    fill="none"
                >
                    {/* Head */}
                    <circle cx="32" cy="14" r="9" stroke="#00d4ff" strokeWidth="1.5" />
                    {/* Body */}
                    <path d="M20 28 Q16 38 18 54 Q22 62 32 64 Q42 62 46 54 Q48 38 44 28 Q38 24 32 24 Q26 24 20 28Z"
                        stroke="#00d4ff" strokeWidth="1.5" fill="#00d4ff0a" />
                    {/* Arc reactor on chest */}
                    <circle cx="32" cy="40" r="4" stroke="#00d4ff" strokeWidth="1.5" fill="#00d4ff33" />
                    <motion.circle cx="32" cy="40" r="4"
                        fill="#00d4ff"
                        opacity={0.8}
                        animate={{ r: [4, 6, 4], opacity: [0.8, 0.2, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    {/* Shoulders */}
                    <line x1="20" y1="28" x2="10" y2="36" stroke="#00d4ff" strokeWidth="1.5" strokeOpacity="0.6" />
                    <line x1="44" y1="28" x2="54" y2="36" stroke="#00d4ff" strokeWidth="1.5" strokeOpacity="0.6" />
                    {/* HUD scan lines */}
                    <motion.line x1="14" y1="20" x2="50" y2="20"
                        stroke="#00d4ff" strokeWidth="0.5" strokeOpacity="0.3"
                        animate={{ y1: [20, 60, 20], y2: [20, 60, 20] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />
                </svg>

                {/* Corner targeting brackets */}
                {[
                    'top-0 left-0 border-t-2 border-l-2',
                    'top-0 right-0 border-t-2 border-r-2',
                    'bottom-0 left-0 border-b-2 border-l-2',
                    'bottom-0 right-0 border-b-2 border-r-2',
                ].map((cls, i) => (
                    <motion.div
                        key={i}
                        className={`absolute w-4 h-4 border-[#00d4ff] ${cls}`}
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 0.7 } : {}}
                        transition={{ delay: 0.5 + i * 0.1 }}
                    />
                ))}
            </motion.div>

            {/* ── Status labels ── */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono-hud text-[9px] text-[#00d4ff] tracking-[0.25em] opacity-50"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 0.5 } : {}}
                transition={{ delay: 1, duration: 1 }}
            >
                ID: RAJ_KRISH_v3.0 // ONLINE
            </motion.div>
        </div>
    )
}
