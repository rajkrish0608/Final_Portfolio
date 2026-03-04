// Iron Man Color Constants — matches CSS custom properties in globals.css

export const Colors = {
    // Background
    bgPrimary: '#0a0a0f',
    bgSecondary: '#0d0d1a',
    bgCard: 'rgba(255,255,255,0.03)',

    // Signature
    arcBlue: '#00d4ff',
    arcBlueGlow: '#00aaff44',
    repulsorGold: '#ffd700',
    suitRed: '#c0392b',
    neuralGreen: '#00ff88',

    // Text
    textPrimary: '#e8f4f8',
    textSecondary: '#8bb8cc',
    textAccent: '#00d4ff',

    // Borders
    borderDefault: 'rgba(0, 212, 255, 0.15)',
    borderHover: 'rgba(0, 212, 255, 0.6)',
} as const

export type ColorKey = keyof typeof Colors

// Three.js numeric colors (0x prefix)
export const ThreeColors = {
    arcBlue: 0x00d4ff,
    repulsorGold: 0xffd700,
    suitRed: 0xc0392b,
    neuralGreen: 0x00ff88,
    bgPrimary: 0x0a0a0f,
    white: 0xffffff,
} as const
