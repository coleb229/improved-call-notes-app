import './globals.css'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { LoginButton, LogoutButton } from '@/components/LoginButtons'
import Navbar from '@/components/navbar'

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

  if (!session) { 
    return (
      <html lang="en">
        <head>
          <link href="https://fonts.cdnfonts.com/css/manga-temple" rel="stylesheet" />
        </head>        
        <body>
          <Navbar />
          <pre id='session'>Session: <br />{JSON.stringify(session)}</pre>
          <div id='container'>
            <h1 className='font-bold justify-center flex text-2xl p-10 mt-40'>Please sign in</h1>
            <h2 className='font-semibold justify-center flex text-md pb-10'>You will need a getquantic.com email to view shared storage.</h2>
            <div className='flex justify-center w-full mb-40'>{button}</div>
          </div>
        </body>
      </html>
    )
  } else {
    return (
      <html lang="en">
        <head>
          <link href="https://fonts.cdnfonts.com/css/manga-temple" rel="stylesheet" />
        </head>        
        <body>
          <Navbar />
          {button}
          {children}
          <pre id='session'>Session: <br />name: {JSON.stringify(session.user?.name)}<br />email: {JSON.stringify(session.user?.email)}</pre>
        </body>
      </html>
    )
  }
}
