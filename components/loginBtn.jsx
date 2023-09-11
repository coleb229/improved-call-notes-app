import { signIn, signOut } from "next-auth/react"
import { unstable_useServerSession as useServerSession } from "next-auth/react"

export default function Component() {
  const session = useServerSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()} className="text-black">Sign out</button>
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