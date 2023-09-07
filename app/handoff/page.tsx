import Navbar from "@/components/navbar";
import { PrismaClient } from "@prisma/client";
import SubmitButton from '@/components/SubmitButton'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

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
        <form action={saveHandoff} id='handoffForm'>
          <div>
            <label htmlFor='dbaName'>DBA Name</label>
            <input type='text' name='dbaName' id='dbaName' />
          </div>
          <div>
            <label htmlFor='summary'>Summary</label>
            <input type='text' name='summary' id='summary' />
          </div>
          <div>
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