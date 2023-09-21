import { PrismaClient } from '@prisma/client'
import SubmitButton from '@/components/Buttons'
import { revalidatePath } from 'next/cache'
import ArrowSVG from '@/public/cool-arrow.svg'
import ExternalLinks from '@/components/externalLinks'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

async function saveCallNote(formData: any) {
  "use server"
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  await prisma.callNote.create({
    data: {
      createdBy: email as string,
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
      createdBy: email as string,
      dbaName: formData.get('dbaName'),
      summary: formData.get('summary'),
      ticket: 'ticket',
    }
  })
  revalidatePath("/")
}

async function fetchLastCallNote() {
  "use server"
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  const callNote = await prisma.callNote.findFirst({
    orderBy: {
      id: 'desc'
    },
    where: {
      createdBy: email as string
    }
  })
  return callNote;
}

export default async function Home() {
  let callNote = await fetchLastCallNote();

  return (
    <main className="h-screen">
      <ExternalLinks />
      <div id='container'>
        <form action={saveCallNote} id='callNoteForm'>
          <div id='callerInfo' className='flex justify-center'>
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
          <div id='callNotes' className='flex justify-center'>
            <div className='flex flex-col'>
              <label htmlFor='callNotes'>Call Notes</label>
              <textarea name='callNotes' id='callNotesInput'></textarea>
            </div>
            <div id='arrow'>
              <ArrowSVG className='h-10 w-10' />
            </div>
            <Preview />
          </div>
          <div id='footNotes' className='flex justify-center'>
            <div className='flex flex-col mx-20'>
              <label htmlFor='summary'>Summary</label>
              <textarea name='summary' id='summaryInput' className='w-[20rem] h-[6rem]'></textarea>
            </div>
            <div className='flex flex-col mx-20'>
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

async function Preview() {
  let callNote = await fetchLastCallNote();
  let i = 1;

  return (
    <div className='flex flex-col'>
      <label htmlFor='output'>Preview</label>
      <div id='output' className='bg-white border-[1px] border-black overflow-y-auto flex justify-evenly'>
        <div className='mx-5 text-sm'>
          <p>Caller Name: {callNote?.callerName}</p>
          <p>Caller Number: {callNote?.callerNumber}</p>
          <p>DBA: {callNote?.dbaName}</p><br />
          <p>Call Notes: {callNote?.callNotes.split('\n').map((str) => <p>{i++}.) {str}</p>)}</p><br />
          <p>Call Summary: {callNote?.summary}</p>
          <p>Next Steps: {callNote?.nextSteps}</p>
        </div>
        <div className='mx-5 text-xs'>
          <div className='flex'>
            <p className='font-bold underline'>{callNote?.dbaName}: </p>
            <p>{callNote?.summary}</p>
          </div>
          <div className='flex'>
            <p className="font-bold">Ticket:</p>
            <p>ticket</p>
          </div>
          <div className='mt-5'>
            <p>
            Caller DBA: {callNote?.dbaName}<br />
            Caller Number: {callNote?.callerNumber}<br />
            Call Summary: {callNote?.summary}<br />
            Resolved: Yes<br />
            Ticket: Yes<br />
            Follow Up: No<br />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}