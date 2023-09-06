import Navbar from '@/components/navbar'
import { PrismaClient } from '@prisma/client'

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
}

export default async function Home() {
  const callNote = await prisma.callNote.findFirst({});

  return (
    <main className="h-screen">
      <Navbar />
      <div id='container'>
        <form action={saveCallNote} id='callNoteForm'>
          <div id='callerInfo' className='flex justify-around'>
            <div>
              <label htmlFor='callerName'>Caller Name</label>
              <input type='text' name='callerName' id='callerName' />
            </div>
            <div>
              <label htmlFor='callerNumber'>Caller Number</label>
              <input type='text' name='callerNumber' id='callerNumber' />
            </div>
            <div>
              <label htmlFor='dbaName'>DBA Name</label>
              <input type='text' name='dbaName' id='dbaName' />
            </div>
          </div>
          <div id='callNotes' className='flex justify-between'>
            <div className='flex flex-col'>
              <label htmlFor='callNotes'>Call Notes</label>
              <textarea name='callNotes' id='callNotes'></textarea>
            </div>
          </div>
          <div id='footNotes' className='flex justify-around'>
            <div className='flex flex-col'>
              <label htmlFor='summary'>Summary</label>
              <textarea name='summary' id='summary'></textarea>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='nextSteps'>Next Steps</label>
              <textarea name='nextSteps' id='nextSteps'></textarea>
            </div>
          </div>
          <div id='submit' className='w-full mx-auto'>
            <button type='submit'>Save</button>
          </div>
        </form>
      </div>
    </main>
  )
}

function Output() {
  return (
    <div id='output'>
      <h2>Caller Name:</h2>
      <p id='callerNameOutput'></p>
      <h2>Caller Number:</h2>
      <p id='callerNumberOutput'></p>
      <h2>DBA Name:</h2>
      <p id='dbaNameOutput'></p>
      <h2>Call Notes:</h2>
      <p id='callNotesOutput'></p>
    </div>
  )
}