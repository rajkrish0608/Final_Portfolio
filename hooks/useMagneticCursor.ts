'use client'

import { useEffect, useRef } from 'react'

export function useMagneticCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const pos = useRef({ x: 0, y: 0 })
    const ringPos = useRef({ x: 0, y: 0 })
    const rafRef = useRef<number>()

    useEffect(() => {
        if (typeof window === 'undefined') return

        const cursor = cursorRef.current
        const ring = ringRef.current
        if (!cursor || !ring) return

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t

        const animate = () => {
            ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.12)
            ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.12)

            cursor.style.transform = `translate(${pos.current.x - 5}px, ${pos.current.y - 5}px)`
            ring.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`

            rafRef.current = requestAnimationFrame(animate)
        }

        const onMove = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY }
        }

        const onEnterButton = () => {
            cursor.classList.add('cursor-hover')
            ring.classList.add('ring-hover')
        }
        const onLeaveButton = () => {
            cursor.classList.remove('cursor-hover')
            ring.classList.remove('ring-hover')
        }

        window.addEventListener('mousemove', onMove)
        rafRef.current = requestAnimationFrame(animate)

        // Magnetic on buttons
        const buttons = document.querySelectorAll('button, a, [data-cursor="hover"]')
        buttons.forEach((b) => {
            b.addEventListener('mouseenter', onEnterButton)
            b.addEventListener('mouseleave', onLeaveButton)
        })

        return () => {
            window.removeEventListener('mousemove', onMove)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            buttons.forEach((b) => {
                b.removeEventListener('mouseenter', onEnterButton)
                b.removeEventListener('mouseleave', onLeaveButton)
            })
        }
    }, [])

    return { cursorRef, ringRef }
}
