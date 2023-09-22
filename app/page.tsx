import { fetchLastCallNote, saveCallNote } from './actions'
import SubmitButton from '@/components/Buttons'
import ArrowSVG from '@/public/cool-arrow.svg'
import ExternalLinks from '@/components/externalLinks'

export default async function Home() {
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
            <div className='flex flex-col'>
              <div className='flex justify-between'>
                <label htmlFor='followUp'>Follow Up</label>
                <input type='radio' name='status' id='followUp' value='followUp' />
              </div>
              <div className='flex justify-between'>
                <label htmlFor='needsAttention'>Needs Attention</label>
                <input type='radio' name='status' id='needsAttention' value='needsAttention' />
              </div>
              <div className='flex justify-between'>
                <label htmlFor='inProgress'>In Progress</label>
                <input type='radio' name='status' id='inProgress' value='inProgress' />
              </div>
              <div className='flex justify-between'>
                <label htmlFor='resolved'>Resolved</label>
                <input type='radio' name='status' id='resolved' value='resolved' />
              </div>
            </div>
            <div className='ml-10'>
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
          <u>Caller Name</u>: {callNote?.callerName}<br />
          <u>Caller Number:</u> {callNote?.callerNumber}<br />
          <u>DBA</u>: {callNote?.dbaName}<br /><br />
          <u>Call Notes</u>: {callNote?.callNotes.split('\n').map((str) => <p>{i++}.) {str}</p>)}<br /><br />
          <u>Call Summary</u>: {callNote?.summary}<br />
          <u>Next Steps</u>: {callNote?.nextSteps}<br />
        </div>
        <div className='mx-5 text-sm'>
          <div className='flex'>
            <p className='font-bold underline'>{callNote?.dbaName}: </p>
            <p>{callNote?.summary}</p>
          </div>
          <div className='flex'>
            <p className="font-bold">Link:</p>
            <p> link </p>
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