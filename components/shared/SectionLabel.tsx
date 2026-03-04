'use client'

interface SectionLabelProps {
    text: string
    className?: string
}

export function SectionLabel({ text, className = '' }: SectionLabelProps) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#00d4ff] opacity-60" />
            <span className="font-mono-hud text-xs tracking-[0.3em] text-[#00d4ff] opacity-70 uppercase">
                [ {text} ]
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-[#00d4ff] to-transparent opacity-20" />
        </div>
    )
}
