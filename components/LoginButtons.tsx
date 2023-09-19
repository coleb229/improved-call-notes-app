"use client"
import { signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

export const LoginButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button variant='default' disabled={pending} onClick={() => signIn()} className='loginButton'>{pending ? 'Loading...' : 'Sign In'}</Button>
  )
}

export const LogoutButton = () => {
  return (
    <Button variant='destructive' onClick={() => signOut()} className='logoutButton'>Sign Out</Button>
  )
}
