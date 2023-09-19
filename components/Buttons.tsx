"use client"
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

export default function SubmitButton() {
  "use client"
  const { pending } = useFormStatus()
 
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