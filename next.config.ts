import type { NextConfig } from 'next'

const config: NextConfig = {
    experimental: {
        optimizePackageImports: ['three', 'gsap', 'lucide-react'],
    },
    images: {
        formats: ['image/webp', 'image/avif'],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    {
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin',
                    },
                ],
            },
        ]
    },
    webpack: (config) => {
        config.externals = [...(config.externals || []), { canvas: 'canvas' }]
        return config
    },
}

export default config
