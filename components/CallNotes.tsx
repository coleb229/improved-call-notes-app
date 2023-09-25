"use client"
import { experimental_useOptimistic as useOptimistic } from 'react'
import SubmitButton from '@/components/Buttons'
import ArrowSVG from '@/public/cool-arrow.svg'
import { saveCallNote } from '../app/actions'

export type CallNote = {
  callerName: string,
  callerNumber: string,
  dbaName: string,
  callNotes: string,
  summary: string,
  nextSteps: string,
}

type CallNoteComponentProps = {
  callNote: CallNote[]
}

export default function CallNotes({ callNote }:any) {
  const [ optimisticNote, setOptimisticNote ] = useOptimistic(
    callNote,
    (state, newNote: CallNote) => {
      return [...state, newNote]
    },
  )


  return (
    <form action={async formData => {
      setOptimisticNote({
        callerName: formData.get('callerName') as string,
        callerNumber: formData.get('callerNumber') as string,
        dbaName: formData.get('dbaName') as string,
        callNotes: formData.get('callNotes') as string,
        summary: formData.get('summary') as string,
        nextSteps: formData.get('nextSteps') as string,
      })
      await saveCallNote(formData)
    }} id='callNoteForm'>
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
        <Preview callNote={callNote} optimisticNote={optimisticNote} />
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
        <StatusButtons />
        <div className='ml-10'>
          <SubmitButton />
        </div>
      </div>
    </form>
  )
}

function StatusButtons() {
  return (
    <div className='flex flex-col'>
      <div className='flex justify-between'>
        <input type='radio' name='status' id='followUp' value='followUp' />
        <label htmlFor='followUp'>Follow Up</label>
      </div>
      <div className='flex justify-between'>
        <input type='radio' name='status' id='needsAttention' value='needsAttention' />
        <label htmlFor='needsAttention'>Needs Attention</label>
      </div>
      <div className='flex justify-between'>
        <input type='radio' name='status' id='inProgress' value='inProgress' />
        <label htmlFor='inProgress'>In Progress</label>
      </div>
      <div className='flex justify-between'>
        <input type='radio' name='status' id='resolved' value='resolved' />
        <label htmlFor='resolved'>Resolved</label>
      </div>
    </div>
  )
}

function Preview({ callNote, optimisticNote }:any) {
  let i = 1;

  return (
    <div className='flex flex-col'>
      <label htmlFor='output'>Preview</label>
      <div id='output' className='bg-white border-[1px] border-black overflow-y-auto flex justify-evenly'>
        {callNote.map((note: any) => (
          <>
            <div className='mx-5 text-sm'>
              <u>Caller Name</u>: {note.callerName}<br />
              <u>Caller Number</u>: {note.callerNumber}<br />
              <u>DBA</u>: {note.dbaName}<br /><br />
              <u>Call Notes</u>: {note.callNotes}<br /><br />
              <u>Call Summary</u>: {note.summary}<br />
              <u>Next Steps</u>: {note.nextSteps}<br />
            </div>
            <div className='mx-5 text-sm'>
              <div className='flex'>
                <p className='font-bold underline'>{note.dbaName}: </p>
                <p>{note.summary}</p>
              </div>
              <div className='flex'>
                <p className="font-bold">Link:</p>
                <p> link </p>
              </div>
              <div className='mt-5'>
                <p>
                Caller DBA: {note.dbaName}<br />
                Caller Number: {note.callerNumber}<br />
                Call Summary: {note.summary}<br />
                Resolved: Yes<br />
                Ticket: Yes<br />
                Follow Up: No<br />
                </p>
              </div>
            </div>
          </> 
        ))}
      </div>
    </div>
  )
}