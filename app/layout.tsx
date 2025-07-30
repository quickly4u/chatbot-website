import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import GoogleAnalytics from '../components/GoogleAnalytics'
import './globals.css'

export const metadata: Metadata = {
  title: 'Quickly4U - AI Chatbot Solutions',
  description: 'Transform your business with Quickly4U\'s AI-powered chatbot solutions',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
