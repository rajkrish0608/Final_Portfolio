'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// KONAMI CODE: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
]

export function KonamiCode() {
    const [, setInputSequence] = useState<string[]>([])
    const [activated, setActivated] = useState(false)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if user is typing in an input field
            if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
                return
            }

            setInputSequence(prev => {
                const nextSequence = [...prev, e.key]
                // Keep only the last N keys where N is the length of KONAMI_CODE
                if (nextSequence.length > KONAMI_CODE.length) {
                    nextSequence.shift()
                }

                // Check if the current sequence matches the Konami code
                if (nextSequence.join('').toLowerCase() === KONAMI_CODE.join('').toLowerCase()) {
                    if (!activated) {
                        triggerEasterEgg()
                    }
                    return [] // Reset sequence after activation
                }

                return nextSequence
            })
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [activated])

    const triggerEasterEgg = () => {
        setActivated(true)

        // Attempt to play JARVIS audio (if user has enabled audio context)
        try {
            // We don't have an actual audio file, but we can simulate the intent
            // const audio = new Audio('/sounds/jarvis_welcome.mp3')
            // audio.play().catch(() => console.log('Audio playback blocked by browser'))
            console.log('JARVIS: "At your service, sir."')
        } catch (e) {
            console.error(e)
        }

        // Reset after animation finishes
        setTimeout(() => setActivated(false), 4000)
    }

    return (
        <AnimatePresence>
            {activated && (
                <motion.div
                    className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Audio Wave / Repulsor Flash */}
                    <motion.div
                        className="absolute inset-0 bg-white mix-blend-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.8, 0] }}
                        transition={{ duration: 0.8, times: [0, 0.1, 1] }}
                    />

                    {/* Central Reactor Blast */}
                    <motion.div
                        className="w-[10px] h-[10px] rounded-full bg-[#00d4ff] shadow-[0_0_100px_40px_#00d4ff]"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: [1, 50, 200], opacity: [1, 0.8, 0] }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                    />

                    {/* HUD Overlay Text */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-orbitron font-black text-6xl text-[#00d4ff] tracking-[0.2em] whitespace-nowrap drop-shadow-[0_0_20px_#00d4ff]"
                        initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                        animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1.1, 1.2], filter: ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(20px)'] }}
                        transition={{ duration: 3, times: [0, 0.1, 0.8, 1] }}
                    >
                        MARK VII ONLINE
                    </motion.div>

                    <motion.div
                        className="absolute bottom-20 left-1/2 -translate-x-1/2 font-mono-hud text-xs text-[#00d4ff] tracking-[0.5em] opacity-50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: [0, 0.8, 0], y: [20, 0, -20] }}
                        transition={{ duration: 2, delay: 0.5 }}
                    >
                        PROTOCOL: OVERRIDE ACCEPTED
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
