"use client"

import { signIn, signOut } from 'next-auth/react'

export const LoginButton = () => {
  return (
    <button className='loginButton' onClick={() => signIn()}>Login</button>
  )
}

export const LogoutButton = () => {
  return (
    <button className='logoutButton' onClick={() => signOut()}>Logout</button>
  )
}
