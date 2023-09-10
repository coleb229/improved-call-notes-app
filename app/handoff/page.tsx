import Navbar from "@/components/navbar";
import { PrismaClient } from "@prisma/client";
import SubmitButton from '@/components/Buttons'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

async function saveHandoff(formData: any) {
  "use server"
  await prisma.handoff.create({
    data: {
      dbaName: formData.get('dbaName'),
      summary: formData.get('summary'),
      ticket: formData.get('ticket'),
    }
  })
  formData.reset();
  revalidatePath("/handoff")
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
        <Output />
        <form action={saveHandoff} id='handoffForm'>
          <div id="handoffForm">
            <label htmlFor='dbaName'>DBA Name</label>
            <input type='text' name='dbaName' id='dbaName' />
            <label htmlFor='summary'>Summary</label>
            <input type='text' name='summary' id='summary' />
            <label htmlFor='ticket'>Ticket</label>
            <input type='text' name='ticket' id='ticket' />
          </div>
          <div id="submit">
            <SubmitButton />
          </div>
        </form>
      </div>
    </main>
  )
}

async function fetchHandoffs() {
  "server";
  const handoff = await prisma.handoff.findMany({
    orderBy: {
      id: 'desc'
    },
    take: 5
  })
  return handoff;
}

async function Output() {
  const handoff = await fetchHandoffs();

  return (
    <div id="handoffOutput">
      {handoff.map((handoff) => (
        <div key={handoff.id} className="mb-10 mr-10 bg-white p-5">
          <div className="flex">
            <p className="font-bold underline">{handoff.dbaName}:</p>
            <p>{handoff.summary}</p>
          </div>
          <div className="flex">
            <p className="font-bold">Ticket:</p>
            <p>{handoff.ticket}</p>
          </div>
          <hr />
        </div>
      ))}
    </div>
  )
}