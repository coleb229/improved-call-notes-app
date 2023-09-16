import './globals.css'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Improved Call Notes App',
  description: 'This is a full stack version of the call notes app.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/manga-temple" rel="stylesheet" />
      </head>        
      <body>{children}</body>
    </html>
  )
}
