import { signIn, signOut } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import NextAuth from 'next-auth/next'

export default async function Component() {
  const session = await getServerSession(NextAuth)
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
