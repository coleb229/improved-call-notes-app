import Navbar from "@/components/navbar";
import { PrismaClient } from "@prisma/client";
import SubmitButton from '@/components/Buttons'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { revalidatePath } from "next/cache";

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
  formData.reset();
  revalidatePath("/rekey")
}

async function fetchRekeys() {
  "server";
  const rekey = await prisma.rekey.findMany({
    orderBy: {
      id: 'desc'
    },
    take: 10
  })
  return rekey;
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
          <div className="flex">
            <div className="px-20">
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
            </div>
            <div>
              <Output />
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}

async function Output() {
  const rekey = await fetchRekeys();

  return (
    <div id="rekeyOutput" className="pl-[100px]">
      {rekey.map((rekey) => (
          <div key={rekey.id} className="mb-10 w-full bg-white p-5">
              Ref: {rekey.ref}<br />
              Date: {rekey.date}<br />
              Auth: {rekey.auth}<br />
              Last4: {rekey.last4}<br />
              Amount: {rekey.amount}<br />
              Tip: {rekey.tip}<br />
          </div>
        ))}
    </div>
  )
}