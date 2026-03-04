'use client'

import { useEffect, useRef } from 'react'
import { useStore } from '@/lib/store'

export function CursorEffect() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const pos = useRef({ x: -100, y: -100 })
    const ringPos = useRef({ x: -100, y: -100 })
    const rafRef = useRef<number>()
    const cursorMode = useStore((s) => s.cursorMode)

    useEffect(() => {
        if (typeof window === 'undefined') return
        // Hide on touch devices
        if (window.matchMedia('(hover: none)').matches) return

        const cursor = cursorRef.current
        const ring = ringRef.current
        if (!cursor || !ring) return

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t

        const animate = () => {
            ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.1)
            ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.1)

            if (cursor) {
                cursor.style.left = `${pos.current.x}px`
                cursor.style.top = `${pos.current.y}px`
            }
            if (ring) {
                ring.style.left = `${ringPos.current.x}px`
                ring.style.top = `${ringPos.current.y}px`
            }

            rafRef.current = requestAnimationFrame(animate)
        }

        const onMove = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY }
        }

        window.addEventListener('mousemove', onMove, { passive: true })
        rafRef.current = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('mousemove', onMove)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [])

    const isHover = cursorMode === 'hover' || cursorMode === 'target'
    const isCrosshair = cursorMode === 'crosshair'

    return (
        <>
            {/* Inner dot */}
            <div
                ref={cursorRef}
                className="fixed pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2"
                style={{ transition: 'width 0.2s, height 0.2s' }}
                aria-hidden="true"
            >
                <div
                    className="rounded-full"
                    style={{
                        width: isHover ? 12 : 8,
                        height: isHover ? 12 : 8,
                        background: '#00d4ff',
                        boxShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff66',
                        transition: 'all 0.2s ease',
                    }}
                />
            </div>

            {/* Outer ring */}
            <div
                ref={ringRef}
                className="fixed pointer-events-none z-[99998] -translate-x-1/2 -translate-y-1/2"
                aria-hidden="true"
            >
                <div
                    style={{
                        width: isHover ? 48 : isCrosshair ? 36 : 36,
                        height: isHover ? 48 : isCrosshair ? 36 : 36,
                        border: isHover
                            ? '2px solid rgba(255, 215, 0, 0.8)'
                            : '1.5px solid rgba(0, 212, 255, 0.6)',
                        borderRadius: isCrosshair ? '0' : '50%',
                        boxShadow: isHover ? '0 0 15px #ffd70066' : '0 0 10px #00d4ff44',
                        transition: 'all 0.3s ease',
                        // Targeting reticle lines
                        position: 'relative',
                    }}
                >
                    {(isHover || isCrosshair) && (
                        <>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '-8px',
                                    right: '-8px',
                                    height: '1px',
                                    background: isHover ? '#ffd700' : '#00d4ff',
                                    opacity: 0.6,
                                }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    left: '50%',
                                    top: '-8px',
                                    bottom: '-8px',
                                    width: '1px',
                                    background: isHover ? '#ffd700' : '#00d4ff',
                                    opacity: 0.6,
                                }}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
