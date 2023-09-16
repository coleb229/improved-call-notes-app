import { signIn, signOut, getServerSession } from "next-auth"

export default async function Component() {
  const session = await getServerSession()
  if (session) {
    return (
      <>
        <p>Signed in as: {session.user.email}</p>
        <form action={signOut}><button type="submit" className="text-2xl" id="login">Sign out</button></form>
      </>
    )
  }
  
  return (
    <>
      <form action={'/api/auth/signin'} method="POST"><button type="submit" className="text-2xl" id="login">Sign in</button></form>
    </>
  )
}