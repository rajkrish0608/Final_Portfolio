'use client'

import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { Engine } from '@tsparticles/engine'

export function AmbientParticles() {
    const [init, setInit] = useState(false)

    useEffect(() => {
        initParticlesEngine(async (engine: Engine) => {
            await loadSlim(engine)
        }).then(() => {
            setInit(true)
        })
    }, [])

    if (!init) return null

    return (
        <Particles
            id="tsparticles"
            className="absolute inset-0 z-0 pointer-events-none"
            options={{
                background: { color: { value: 'transparent' } },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onHover: { enable: true, mode: 'repulse' },
                    },
                    modes: {
                        repulse: { distance: 100, duration: 0.4 },
                    },
                },
                particles: {
                    color: { value: ['#00d4ff', '#8bb8cc', '#ffffff'] },
                    links: {
                        color: '#00d4ff',
                        distance: 150,
                        enable: true,
                        opacity: 0.1,
                        width: 1,
                    },
                    move: {
                        direction: 'none',
                        enable: true,
                        outModes: { default: 'out' },
                        random: false,
                        speed: 0.5, // Slow drift
                        straight: false,
                    },
                    number: {
                        density: { enable: true, width: 800, height: 800 },
                        value: 60, // Light ambient field
                    },
                    opacity: { value: { min: 0.1, max: 0.4 } },
                    shape: { type: 'circle' },
                    size: { value: { min: 1, max: 3 } },
                },
                detectRetina: true,
            }}
        />
    )
}
