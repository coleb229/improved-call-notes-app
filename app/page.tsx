import Navbar from '@/components/navbar'
import { PrismaClient } from '@prisma/client'
import SubmitButton from '@/components/Buttons'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

async function saveCallNote(formData: any) {
  "use server"
  await prisma.callNote.create({
    data: {
      callerName: formData.get('callerName'),
      callerNumber: formData.get('callerNumber'),
      dbaName: formData.get('dbaName'),
      callNotes: formData.get('callNotes'),
      summary: formData.get('summary'),
      nextSteps: formData.get('nextSteps'),
    }
  })
  await prisma.handoff.create({
    data: {
      dbaName: formData.get('dbaName'),
      summary: formData.get('summary'),
      ticket: 'ticket',
    }
  })
  formData.reset();
  revalidatePath("/")
}

async function fetchLastCallNote() {
  "use server"
  const callNote = await prisma.callNote.findFirst({
    orderBy: {
      id: 'desc'
    }
  })
  return callNote;
}

export default async function Home() {
  let callNote = await fetchLastCallNote();

  return (
    <main className="h-screen">
      <Navbar />
      <Alert className='alert mt-24 w-[50%] mx-auto hidden' id='alert'>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Call has been stored in the database!
        </AlertDescription>
      </Alert>
      <div id='container'>
        <form action={saveCallNote} id='callNoteForm'>
          <div id='callerInfo' className='flex justify-evenly'>
            <div className='callerInfos'>
              <label htmlFor='callerName'>Caller Name</label>
              <input type='text' name='callerName' id='callerName' />
            </div>
            <div className='callerInfos'>
              <label htmlFor='callerNumber'>Caller Number</label>
              <input type='text' name='callerNumber' id='callerNumber' />
            </div>
            <div className='callerInfos'>
              <label htmlFor='dbaName'>DBA Name</label>
              <input type='text' name='dbaName' id='dbaNameInput' />
            </div>
          </div>
          <div id='callNotes' className='flex justify-between'>
            <div className='flex flex-col'>
              <label htmlFor='callNotes'>Call Notes</label>
              <textarea name='callNotes' id='callNotes'></textarea>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='output'>Preview</label>
              <div id='output' className='bg-white border-[1px] border-black overflow-y-auto flex justify-evenly'>
                <div className='mx-5 text-xs'>
                  <p className="font-semibold">Caller Name:</p>
                  <p>{callNote?.callerName}</p>
                  <p className="font-semibold">Caller Number:</p>
                  <p>{callNote?.callerNumber}</p>
                  <p className="font-semibold">Caller DBA:</p>
                  <p>{callNote?.dbaName}</p>
                  <p className="font-semibold">Call Notes:</p>
                  <p>{callNote?.callNotes.split('\n').map((str) => <p>{str}</p>)}</p>
                  <p className="font-semibold">Call Summary:</p>
                  <p>{callNote?.summary}</p>
                  <p className="font-semibold">Next Steps:</p>
                  <p>{callNote?.nextSteps}</p>
                </div>
                <div className='mx-5 text-xs'>
                  <div className='flex'>
                    <p className='font-bold underline'>{callNote?.dbaName}: </p>
                    <p>{callNote?.summary}</p>
                  </div>
                  <div className='flex'>
                    <p className="font-semibold">Ticket:</p>
                    <p>ticket</p>
                  </div>
                  <div className='mt-5'>
                    Caller DBA: {callNote?.dbaName}<br />
                    Caller Number: {callNote?.callerNumber}<br />
                    Call Summary: {callNote?.summary}<br />
                    Resolved: Yes<br />
                    Ticket: Yes<br />
                    Follow Up: No<br />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id='footNotes' className='flex justify-around'>
            <div className='flex flex-col'>
              <label htmlFor='summary'>Summary</label>
              <textarea name='summary' id='summaryInput' className='w-[20rem] h-[6rem]'></textarea>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='nextSteps'>Next Steps</label>
              <textarea name='nextSteps' id='nextSteps' className='w-[20rem] h-[6rem]'></textarea>
            </div>
            <div id=''>
              <SubmitButton />
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}