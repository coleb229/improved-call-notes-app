"use client"
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

export default function SubmitButton() {
  "use client"
  const { pending } = useFormStatus()
  const alert = document.querySelector('.alert')
  pending ? alert?.classList.remove('hidden') : alert?.classList.add('hidden')
 
  return (
    <Button disabled={pending} variant="outline" type='submit'>{pending ? 'Submitting...' : 'Submit'}</Button>
  )
}