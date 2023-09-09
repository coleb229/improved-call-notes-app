import Navbar from "@/components/navbar";
import { PrismaClient } from "@prisma/client";
import SubmitButton from '@/components/SubmitButton'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

const prisma = new PrismaClient();

async function saveHandoff(formData: any) {
  "use server"
  await prisma.rekey.create({
    data: {
      ref: formData.get('ref'),
      date: formData.get('date'),
      auth: formData.get('auth'),
      last4: formData.get('last4'),
      amount: formData.get('amount'),
      tip: formData.get('tip'),
    }
  })
}

export default async function Home() {
  return (
    <main className="max-h-screen">
      <Navbar />
      <Alert className='alert mt-24 w-[50%] mx-auto hidden'>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Call has been stored in the database!
        </AlertDescription>
      </Alert>
      <div id='container'>
        <form action={saveHandoff} id='rekeyForm'>
          <div id="rekeyForm">
            <label htmlFor='ref'>Ref</label>
            <input type='text' name='ref' id='ref' />
            <label htmlFor='date'>Date</label>
            <input type='text' name='date' id='date' />
            <label htmlFor='auth'>Auth</label>
            <input type='text' name='auth' id='auth' />
            <label htmlFor='last4'>Last4</label>
            <input type='text' name='last4' id='last4' />
            <label htmlFor='amount'>Amount</label>
            <input type='text' name='amount' id='amount' />
            <label htmlFor='tip'>Tip</label>
            <input type='text' name='tip' id='tip' />
          </div>
          <div id="submit">
            <SubmitButton />
          </div>
        </form>
      </div>
    </main>
  )
}