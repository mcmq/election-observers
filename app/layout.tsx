import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from 'next-themes'
import Locked from '@/components/locked'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://election-observers.vercel.app'),
  title: {
    default: 'Election Observers',
    template: `%s | Election Observers`,
  },
  description: 'Developed by Tiyo Software',
  authors: [
    {
      name: 'Tiyo Software',
      url: 'https://tiyosoftware.com',
    },
  ],
  creator: 'Tiyo Software',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://election-observers.vercel.app',
    title: 'Election Observers',
    description: 'Developed by Tiyo Software',
    siteName: 'Election Observers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Election Observers',
    description: 'Developed by Tiyo Software',
    images: [`https://election-observers.vercel.app/og.jpg`],
    creator: '@tiyosoftware',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return <Locked />

  return (
    <html lang="en">
      <body className={cn(
        "min-h-dvh flex flex-col",
        inter.className
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
