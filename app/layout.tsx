import type { Metadata, Viewport } from 'next'
import './globals.css'
import { CursorEffect } from '@/components/shared/CursorEffect'
import { ArcReactorLoader } from '@/components/Loader/ArcReactorLoader'
import { NavBar } from '@/components/Navigation/NavBar'
import { ScrollProgressHUD } from '@/components/shared/ScrollProgressHUD'

export const metadata: Metadata = {
  title: 'Raj Krish | Robotics & AIML Portfolio',
  description:
    'Personal portfolio of Raj Krish — B.Tech Robotics & AIML specialist. BCI, Autonomous Drones, Quantum Computing.',
  keywords: ['Robotics', 'AIML', 'Portfolio', 'Raj Krish', 'Machine Learning', 'BCI'],
  authors: [{ name: 'Raj Krish' }],
  openGraph: {
    title: 'Raj Krish | Robotics & AIML Portfolio',
    description: 'Engineering Intelligence. Building the Future.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen relative selection:bg-[#00d4ff44] selection:text-[#e8f4f8]">
        <CursorEffect />
        <ArcReactorLoader />
        <ScrollProgressHUD />
        <NavBar />
        {children}
      </body>
    </html>
  )
}
