'use client'

interface HUDLinesProps {
    className?: string
    size?: number
    color?: string
    opacity?: number
}

export function HUDLines({
    className = '',
    size = 24,
    color = '#00d4ff',
    opacity = 0.5,
}: HUDLinesProps) {
    return (
        <div
            className={`absolute inset-0 pointer-events-none ${className}`}
            aria-hidden="true"
        >
            {/* Top-left corner */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: size,
                    height: size,
                    borderTop: `2px solid ${color}`,
                    borderLeft: `2px solid ${color}`,
                    opacity,
                }}
            />
            {/* Top-right corner */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: size,
                    height: size,
                    borderTop: `2px solid ${color}`,
                    borderRight: `2px solid ${color}`,
                    opacity,
                }}
            />
            {/* Bottom-left corner */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: size,
                    height: size,
                    borderBottom: `2px solid ${color}`,
                    borderLeft: `2px solid ${color}`,
                    opacity,
                }}
            />
            {/* Bottom-right corner */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: size,
                    height: size,
                    borderBottom: `2px solid ${color}`,
                    borderRight: `2px solid ${color}`,
                    opacity,
                }}
            />
        </div>
    )
}
