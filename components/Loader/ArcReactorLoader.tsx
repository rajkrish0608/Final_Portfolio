'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/lib/store'
import { useLoader } from '@/hooks/useLoader'

export function ArcReactorLoader() {
    useLoader()
    const { isLoading, loaderProgress } = useStore()
    const [showContent, setShowContent] = useState(false)

    useEffect(() => {
        if (!isLoading) {
            setTimeout(() => setShowContent(true), 1000)
        }
    }, [isLoading])

    if (showContent) return null

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="loader"
                    initial={{ clipPath: 'circle(150% at 50% 50%)' }}
                    exit={{
                        clipPath: 'circle(0% at 50% 50%)',
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0f] overflow-hidden"
                >
                    {/* Scanline overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,212,255,0.05)_50%,transparent_100%)] h-[200%] animate-scan-line pointer-events-none" />

                    <div className="absolute inset-0 hex-bg opacity-10 pointer-events-none" />

                    {/* Arc Reactor */}
                    <div className="relative w-64 h-64 flex items-center justify-center">
                        {/* Outer rings drawn in */}
                        <motion.svg
                            viewBox="0 0 100 100"
                            className="absolute w-full h-full text-[#00d4ff] opacity-50"
                            initial={{ rotate: -90, strokeDasharray: "0 400" }}
                            animate={{ rotate: 270, strokeDasharray: "400 400" }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        >
                            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
                        </motion.svg>

                        {/* Middle complex ring */}
                        <motion.svg
                            viewBox="0 0 100 100"
                            className="absolute w-4/5 h-4/5 text-[#00d4ff]"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                        >
                            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="15 10 5 10" opacity="0.8" />
                            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                                <path
                                    key={i}
                                    d="M 50 10 L 55 18 L 45 18 Z"
                                    fill="currentColor"
                                    transform={`rotate(${deg} 50 50)`}
                                    opacity="0.9"
                                />
                            ))}
                        </motion.svg>

                        {/* Core */}
                        <motion.div
                            className="relative w-24 h-24 rounded-full bg-[#00d4ff] flex items-center justify-center glow-arc"
                            initial={{ scale: 0 }}
                            animate={{
                                scale: 1,
                                boxShadow: [
                                    '0 0 20px #00d4ff44, 0 0 40px #00d4ff22',
                                    '0 0 40px #00d4ffaa, 0 0 80px #00d4ff44',
                                    '0 0 20px #00d4ff44, 0 0 40px #00d4ff22',
                                ]
                            }}
                            transition={{
                                scale: { duration: 1, ease: 'easeOut' },
                                boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }
                            }}
                        >
                            <div className="w-16 h-16 rounded-full bg-[#ffffff] blur-[4px]" />
                            {/* Mark VI Triangle */}
                            <svg viewBox="0 0 100 100" className="absolute w-12 h-12 text-[#0a0a0f] z-10">
                                <path d="M 50 20 L 80 75 L 20 75 Z" fill="currentColor" stroke="#e8f4f8" strokeWidth="2" opacity="0.8" strokeLinejoin="round" />
                            </svg>
                        </motion.div>
                    </div>

                    <div className="mt-16 w-80 flex flex-col items-center z-10">
                        <div className="w-full flex justify-between font-mono-hud text-[10px] text-[#00d4ff] mb-2 tracking-[0.2em] opacity-80">
                            <span>INITIALIZING SYSTEM...</span>
                            <span>{Math.round(loaderProgress)}%</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full h-[2px] bg-[#00d4ff22] relative overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-[#00d4ff] shadow-[0_0_10px_#00d4ff]"
                                initial={{ width: 0 }}
                                animate={{ width: `${loaderProgress}%` }}
                                transition={{ duration: 0.2, ease: 'linear' }}
                            />
                        </div>
                        <div className="mt-4 font-mono-hud text-[10px] text-[#00d4ff] tracking-[0.3em] h-4">
                            <motion.span
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                LOADING MODULES
                            </motion.span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
