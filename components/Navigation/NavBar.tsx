'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/lib/store'

const NAV_LINKS = [
    { id: 'hero', label: 'HOME', href: '#hero' },
    { id: 'about', label: 'IDENTITY', href: '#about' },
    { id: 'skills', label: 'DIAGNOSTICS', href: '#skills' },
    { id: 'projects', label: 'MISSIONS', href: '#projects' },
    { id: 'achievements', label: 'RECORD', href: '#achievements' },
    { id: 'contact', label: 'COMMS', href: '#contact' },
]

export function NavBar() {
    const { activeSection } = useStore()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => { setMounted(true) }, [])

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleNav = (href: string) => {
        setMenuOpen(false)
        const el = document.querySelector(href)
        el?.scrollIntoView({ behavior: 'smooth' })
    }

    if (!mounted) return null

    return (
        <>
            {/* Desktop Nav */}
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`
          fixed top-0 left-0 right-0 z-[500] hidden md:flex
          items-center justify-between px-8 py-4
          transition-all duration-500
          ${scrolled
                        ? 'bg-[rgba(10,10,15,0.85)] backdrop-blur-xl border-b border-[rgba(0,212,255,0.12)] shadow-[0_4px_30px_rgba(0,212,255,0.06)]'
                        : 'bg-transparent'}
        `}
            >
                {/* Logo */}
                <button
                    onClick={() => handleNav('#hero')}
                    className="font-orbitron font-bold text-lg tracking-[0.2em] text-[#e8f4f8] hover:text-[#00d4ff] transition-colors duration-300 flex items-center gap-2"
                    data-cursor="hover"
                >
                    <ArcReactorDot />
                    RK
                </button>

                {/* Links */}
                <ul className="flex items-center gap-8">
                    {NAV_LINKS.map((link) => {
                        const isActive = activeSection === link.id
                        return (
                            <li key={link.id}>
                                <button
                                    onClick={() => handleNav(link.href)}
                                    data-cursor="hover"
                                    className="relative group flex items-center gap-2 font-mono-hud text-[11px] tracking-[0.2em] transition-colors duration-300"
                                    style={{ color: isActive ? '#00d4ff' : '#8bb8cc' }}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="active-dot"
                                            className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] shadow-[0_0_8px_#00d4ff]"
                                        />
                                    )}
                                    {link.label}
                                    {/* Underline glow */}
                                    <span className="absolute -bottom-1 left-0 h-[1px] w-0 group-hover:w-full bg-[#00d4ff] transition-all duration-300" />
                                </button>
                            </li>
                        )
                    })}
                </ul>

                {/* CTA Button */}
                <motion.a
                    href="mailto:raj@example.com"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px #00d4ff66' }}
                    whileTap={{ scale: 0.97 }}
                    data-cursor="hover"
                    className="font-mono-hud text-[11px] tracking-[0.2em] px-5 py-2 border border-[#00d4ff] text-[#00d4ff] rounded hover:bg-[#00d4ff15] transition-all duration-300"
                >
                    INITIATE CONTACT
                </motion.a>
            </motion.nav>

            {/* Mobile Nav */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-[500]">
                <motion.div
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className={`flex items-center justify-between px-6 py-4 transition-all duration-500 ${scrolled || menuOpen
                            ? 'bg-[rgba(10,10,15,0.95)] backdrop-blur-xl border-b border-[rgba(0,212,255,0.12)]'
                            : 'bg-transparent'
                        }`}
                >
                    <button
                        onClick={() => handleNav('#hero')}
                        className="font-orbitron font-bold text-base tracking-[0.2em] text-[#e8f4f8] flex items-center gap-2"
                    >
                        <ArcReactorDot size={10} />
                        RK
                    </button>

                    {/* Hamburger */}
                    <button
                        onClick={() => setMenuOpen((v) => !v)}
                        className="w-8 h-8 flex flex-col justify-center items-center gap-1.5"
                        aria-label="Toggle menu"
                    >
                        {[0, 1, 2].map((i) => (
                            <motion.span
                                key={i}
                                animate={{
                                    rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                                    y: menuOpen && i === 0 ? 8 : menuOpen && i === 2 ? -8 : 0,
                                    opacity: menuOpen && i === 1 ? 0 : 1,
                                }}
                                transition={{ duration: 0.3 }}
                                className="block w-6 h-[1.5px] bg-[#00d4ff] origin-center"
                            />
                        ))}
                    </button>
                </motion.div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 top-[60px] bg-[rgba(10,10,15,0.97)] backdrop-blur-2xl flex flex-col items-center justify-center gap-8 hex-bg"
                        >
                            {NAV_LINKS.map((link, i) => (
                                <motion.button
                                    key={link.id}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                                    onClick={() => handleNav(link.href)}
                                    className="font-orbitron text-2xl tracking-[0.3em] text-[#8bb8cc] hover:text-[#00d4ff] transition-colors duration-200"
                                >
                                    {link.label}
                                </motion.button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}

function ArcReactorDot({ size = 12 }: { size?: number }) {
    return (
        <span
            className="arc-pulse inline-block rounded-full bg-[#00d4ff]"
            style={{
                width: size,
                height: size,
                boxShadow: '0 0 8px #00d4ff, 0 0 16px #00d4ff44',
            }}
        />
    )
}
