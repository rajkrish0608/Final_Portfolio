'use client'

import { useEffect, useRef } from 'react'
import { useStore } from '@/lib/store'

export function useLoader() {
    const { setLoaderDone, setLoaderProgress } = useStore()
    const started = useRef(false)

    useEffect(() => {
        if (started.current) return
        started.current = true

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
    }, [setLoaderDone, setLoaderProgress])
}
