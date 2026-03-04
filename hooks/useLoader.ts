'use client'

import { useEffect, useRef } from 'react'
import { useStore } from '@/lib/store'

export function useLoader() {
    // Use getState() to get stable function references that never change
    // This prevents the useEffect from re-running when Zustand updates state
    const started = useRef(false)

    useEffect(() => {
        if (started.current) return
        started.current = true

        const { setLoaderDone, setLoaderProgress } = useStore.getState()

        let progress = 0
        const interval = setInterval(() => {
            progress += Math.random() * 18 + 5
            if (progress >= 100) {
                progress = 100
                setLoaderProgress(100)
                clearInterval(interval)
                setTimeout(() => {
                    setLoaderDone()
                }, 600)
            } else {
                setLoaderProgress(progress)
            }
        }, 120)

        return () => clearInterval(interval)
        // Empty dependency array — runs once on mount only
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}
