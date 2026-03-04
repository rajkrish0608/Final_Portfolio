'use client'

import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { SectionLabel } from '../shared/SectionLabel'
import { useStore } from '@/lib/store'

export function HeroText() {
    const { isSuitAssembled } = useStore()

    return (
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pt-32 pointer-events-none">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: isSuitAssembled ? 1 : 0,
                    scale: isSuitAssembled ? 1 : 0.8
                }}
                transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
            >
                <SectionLabel text="SYSTEM.IDENTITY_MODULE" className="mb-6 mx-auto w-max" />
            </motion.div>

            <motion.h1
                className="font-orbitron font-extrabold text-5xl md:text-7xl lg:text-9xl tracking-[0.1em] text-[#e8f4f8] uppercase filter drop-shadow-[0_0_20px_rgba(0,212,255,0.4)]"
                initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                animate={{
                    opacity: isSuitAssembled ? 1 : 0,
                    y: isSuitAssembled ? 0 : 50,
                    filter: isSuitAssembled ? 'blur(0px)' : 'blur(10px)'
                }}
                transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                RAJ <br className="md:hidden" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#fff]">
                    KRISH
                </span>
            </motion.h1>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isSuitAssembled ? 1 : 0 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="mt-6 font-mono-hud text-[#8bb8cc] text-sm md:text-base tracking-[0.2em] bg-[rgba(0,212,255,0.05)] border border-[#00d4ff33] backdrop-blur-sm px-6 py-3 rounded-full"
            >
                {isSuitAssembled ? (
                    <TypeAnimation
                        sequence={[
                            'Robotics & AIML Specialist',
                            2000,
                            'Engineering Intelligence.',
                            2000,
                            'Building the Future.',
                            2000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                        cursor={true}
                    />
                ) : (
                    <span>ASSEMBLING...</span>
                )}
            </motion.div>
        </div>
    )
}
