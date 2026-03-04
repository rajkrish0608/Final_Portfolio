'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { CustomEase } from 'gsap/CustomEase'

// Register all plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, TextPlugin, CustomEase)

    // Custom Iron Man eases
    CustomEase.create('ironEnter', 'M0,0 C0.26,0 0.26,1 1,1')
    CustomEase.create('suitAssemble', 'M0,0 C0.04,0 0.08,0.8 0.2,0.9 0.4,1.02 0.6,1 1,1')
    CustomEase.create('reactorPulse', 'M0,0 C0.5,0 0.5,1 1,1')
}

export { gsap, ScrollTrigger }

// GSAP defaults
gsap.defaults({
    ease: 'power3.out',
    duration: 0.8,
})
