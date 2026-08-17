import type { Metadata, Viewport } from 'next'
import { inter } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'GORKAENGLISH — Real English Conversations',
  description: 'Learn English with real conversations. Live lessons + AI Tutor.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: { url: '/apple-touch-icon.png' },
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#F01428',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}