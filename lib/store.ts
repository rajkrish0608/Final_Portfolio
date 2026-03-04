import { create } from 'zustand'

/**
 * Hero Animation Phase — maps to the TRD timeline spec:
 *
 * LOADING     → T=0ms      Loader visible, arc reactor drawing
 * TRANSITION  → T=1800ms   Loader iris-wipes out
 * CANVAS_IN   → T=2000ms   Canvas fades in, particles spawn
 * ASSEMBLING  → T=2200ms   Fragments begin stagger-flying in
 * ASSEMBLED   → T=3200ms   All fragments locked → reactor pulse
 * TEXT_REVEAL → T=3400ms   Name + tagline stagger-reveal
 * AMBIENT     → T=4000ms   Everything settled, ambient state
 */
export type HeroPhase =
    | 'LOADING'
    | 'TRANSITION'
    | 'CANVAS_IN'
    | 'ASSEMBLING'
    | 'ASSEMBLED'
    | 'TEXT_REVEAL'
    | 'AMBIENT'

interface PortfolioState {
    // --- Loader ---
    isLoading: boolean
    loaderProgress: number
    setLoaderDone: () => void
    setLoaderProgress: (p: number) => void

    // --- Hero Phase Machine ---
    heroPhase: HeroPhase
    setHeroPhase: (p: HeroPhase) => void

    // --- Suit Assembly (derived from phase for legacy use) ---
    isSuitAssembled: boolean
    setSuitAssembled: (v: boolean) => void

    // --- Navigation ---
    activeSection: string
    setActiveSection: (s: string) => void

    // --- Cursor ---
    cursorMode: 'default' | 'hover' | 'target' | 'crosshair'
    setCursorMode: (m: PortfolioState['cursorMode']) => void

    // --- Projects ---
    activeProject: string | null
    setActiveProject: (id: string | null) => void
}

export const useStore = create<PortfolioState>((set) => ({
    // Loader
    isLoading: true,
    loaderProgress: 0,
    setLoaderDone: () => set({ isLoading: false }),
    setLoaderProgress: (p) => set({ loaderProgress: p }),

    // Hero Phase
    heroPhase: 'LOADING',
    setHeroPhase: (p) => set({ heroPhase: p }),

    // Suit Assembly
    isSuitAssembled: false,
    setSuitAssembled: (v) => set({ isSuitAssembled: v }),

    // Navigation
    activeSection: 'hero',
    setActiveSection: (s) => set({ activeSection: s }),

    // Cursor
    cursorMode: 'default',
    setCursorMode: (m) => set({ cursorMode: m }),

    // Projects
    activeProject: null,
    setActiveProject: (id) => set({ activeProject: id }),
}))
