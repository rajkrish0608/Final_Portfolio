import type { Metadata, Viewport } from 'next'
import './globals.css'
import { CursorEffect } from '@/components/shared/CursorEffect'
import { ArcReactorLoader } from '@/components/Loader/ArcReactorLoader'
import { NavBar } from '@/components/Navigation/NavBar'
import { ScrollProgressHUD } from '@/components/shared/ScrollProgressHUD'
import { KonamiCode } from '@/components/shared/KonamiCode'

export const metadata: Metadata = {
  title: 'Raj Krish | Robotics & AIML Portfolio',
  description: 'Raj Krish is a B.Tech Robotics & AIML specialist building the future. Explore projects in BCI, Autonomous Drones, and Quantum Computing.',
  keywords: ['Raj Krish', 'Robotics', 'AIML', 'Artificial Intelligence', 'Machine Learning', 'Portfolio', 'BCI', 'ROS2', 'Engineer'],
  authors: [{ name: 'Raj Krish', url: 'https://github.com/rajkrish0608' }],
  creator: 'Raj Krish',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://rajkrish.dev', // Replace with actual domain when deployed
    title: 'Raj Krish | Robotics & AIML',
    description: 'Engineering Intelligence. Building the Future.',
    siteName: 'Raj Krish Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raj Krish | Robotics & AIML',
    description: 'Engineering Intelligence. Building the Future.',
    creator: '@rajkrish0608', // Replace with actual if present
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
        <KonamiCode />
        <NavBar />
        {children}
      </body>
    </html>
  )
}
