'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlowCardProps {
    children: ReactNode
    className?: string
    glowColor?: string
    hover?: boolean
    onClick?: () => void
}

export function GlowCard({
    children,
    className = '',
    glowColor = '#00d4ff',
    hover = true,
    onClick,
}: GlowCardProps) {
    return (
        <motion.div
            onClick={onClick}
            whileHover={hover ? { scale: 1.02, y: -4 } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`glass-card rounded-lg p-6 relative overflow-hidden ${hover ? 'glass-card-hover cursor-pointer' : ''} ${className}`}
            style={{
                ['--glow-color' as string]: glowColor,
            }}
        >
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00d4ff] opacity-40" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00d4ff] opacity-40" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00d4ff] opacity-40" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00d4ff] opacity-40" />

            {children}
        </motion.div>
    )
}
