'use client'

import { useEffect, useRef } from 'react'
import { useStore } from '@/lib/store'

export function useLoader() {
    // In React 18 Strict Mode, effects run twice (setup, cleanup, setup).
    // If we use a ref to prevent double-running, we MUST reset it in cleanup,
    // otherwise the second setup never runs the interval.
    const started = useRef(false)

    useEffect(() => {
        // If the loader is already done in global state, don't restart it
        if (useStore.getState().isLoading === false) return
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

        return () => {
            clearInterval(interval)
            started.current = false // Reset for React 18 Strict Mode remounts
        }
        // Empty dependency array — runs once on mount only
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}
