import './globals.css'
import type { Metadata } from 'next'
import { authOptions } from './api/auth/[nextauth]'
import { getServerSession } from 'next-auth'

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
    return {
      props: {
        session,
      },
    }
  }
}

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
