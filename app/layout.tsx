import './globals.css'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { LoginButton, LogoutButton } from '@/components/LoginButtons'

export const metadata: Metadata = {
  title: 'Improved Call Notes App',
  description: 'This is a full stack version of the call notes app.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  const button = session?.user ? <LogoutButton /> : <LoginButton />

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/manga-temple" rel="stylesheet" />
      </head>        
      <body>
        {button}
        {children}
        <pre id='session'>Session: <br />{JSON.stringify(session)}</pre>
      </body>
    </html>
  )
}
