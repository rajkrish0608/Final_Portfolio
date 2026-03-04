import { create } from 'zustand'

interface PortfolioState {
    // Loader
    isLoading: boolean
    loaderProgress: number
    setLoaderDone: () => void
    setLoaderProgress: (p: number) => void

    // Suit Assembly
    isSuitAssembled: boolean
    setSuitAssembled: (v: boolean) => void

    // Navigation
    activeSection: string
    setActiveSection: (s: string) => void

    // Cursor
    cursorMode: 'default' | 'hover' | 'target' | 'crosshair'
    setCursorMode: (m: PortfolioState['cursorMode']) => void

    // Projects
    activeProject: string | null
    setActiveProject: (id: string | null) => void
}

export const useStore = create<PortfolioState>((set) => ({
    // Loader
    isLoading: true,
    loaderProgress: 0,
    setLoaderDone: () => set({ isLoading: false }),
    setLoaderProgress: (p) => set({ loaderProgress: p }),

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
