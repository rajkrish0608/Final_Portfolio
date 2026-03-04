import { Variants } from 'framer-motion'

// ===== FRAMER MOTION VARIANTS =====

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
}

export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
}

export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
}

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
}

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
}

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
    },
}

export const glowPulse: Variants = {
    initial: { boxShadow: '0 0 0px rgba(0, 212, 255, 0)' },
    animate: {
        boxShadow: [
            '0 0 0px rgba(0, 212, 255, 0)',
            '0 0 20px rgba(0, 212, 255, 0.5)',
            '0 0 0px rgba(0, 212, 255, 0)',
        ],
        transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    },
}

export const hologramFlicker: Variants = {
    initial: { opacity: 1 },
    animate: {
        opacity: [1, 0.8, 1, 0.6, 1, 0.9, 1],
        transition: { duration: 3, repeat: Infinity, times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1] },
    },
}

// ===== GSAP HELPERS =====

export const gsapDefaults = {
    ease: 'power3.out',
    duration: 0.8,
}

export const createScrollReveal = (element: Element, delay = 0) => ({
    from: { y: 60, opacity: 0 },
    to: { y: 0, opacity: 1, delay, ease: 'power3.out', duration: 0.8 },
})
