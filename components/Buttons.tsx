"use client"
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import exp from 'constants'

export default function SubmitButton() {
  "use client"
  const { pending } = useFormStatus()
  const alert = document.querySelector('.alert')
  pending ? alert?.classList.remove('hidden') : alert?.classList.add('hidden')
 
  return (
    <Button disabled={pending} variant="outline" type='submit'>{pending ? 'Submitting...' : 'Submit'}</Button>
  )
}

export function DeleteButton() {
  "client"
  const { pending } = useFormStatus()
 
  return (
    <Button disabled={pending} variant="destructive" type='submit'>{pending ? 'Deleting...' : 'Delete'}</Button>
  )
}