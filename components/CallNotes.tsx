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
  ticket: string,
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

  const angerCheck = ['unbelievable', 'unacceptable', 'unreal', 'ridiculous', 'insane', 'crazy']

  return (
    <form action={async (formData) => {
      setOptimisticNote({
        callerName: formData.get('callerName') as string,
        callerNumber: formData.get('callerNumber') as string,
        dbaName: formData.get('dbaName') as string,
        callNotes: formData.get('callNotes') as string,
        summary: formData.get('summary') as string,
        nextSteps: formData.get('nextSteps') as string,
        ticket: 'ticket',
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
          <textarea 
            name='callNotes' 
            id='callNotesInput'
            onChange={(e) => {
              const textArea = document.getElementById('callNotesInput') as HTMLTextAreaElement
              textArea.value.split(' ').map((word) => {
                if (angerCheck.includes(word.toLowerCase())) {
                  textArea.style.backgroundColor = '#ff8f8f'
                } else {
                  textArea.style.backgroundColor = 'white'
                }
              })
            }}
          />
        </div>
        <div id='arrow'>
          <ArrowSVG className='h-10 w-10' />
        </div>
        <Preview callNote={callNote} optimisticNote={optimisticNote} />
      </div>
      <div id='footNotes' className='flex justify-center'>
        <div className='flex flex-col mx-10 footNoteItem'>
          <label htmlFor='summary'>Summary</label>
          <textarea name='summary' id='summaryInput' className='w-[20rem] h-[6rem]'></textarea>
        </div>
        <div className='flex flex-col mx-10 footNoteItem'>
          <label htmlFor='nextSteps'>Next Steps</label>
          <textarea name='nextSteps' id='nextSteps' className='w-[20rem] h-[6rem]'></textarea>
        </div>
        <StatusButtons />
        <div className='ml-10' id='submitButton'>
          <SubmitButton />
        </div>
      </div>
    </form>
  )
}

function StatusButtons() {
  return (
    <div className='flex flex-col'>
      <div className='flex'>
        <input type='radio' name='status' id='followUp' value='followUp' />
        <label htmlFor='followUp' className='ml-5'>Follow Up</label>
      </div>
      <div className='flex'>
        <input type='radio' name='status' id='needsAttention' value='needsAttention' />
        <label htmlFor='needsAttention' className='ml-5'>Needs Attention</label>
      </div>
      <div className='flex'>
        <input type='radio' name='status' id='inProgress' value='inProgress' />
        <label htmlFor='inProgress' className='ml-5'>In Progress</label>
      </div>
      <div className='flex'>
        <input type='radio' name='status' id='resolved' value='resolved' />
        <label htmlFor='resolved' className='ml-5'>Resolved</label>
      </div>
    </div>
  )
}

function Preview({ optimisticNote }:any) {
  let i = 0;

  return (
    <div className='flex flex-col'>
      <label htmlFor='output'>Preview</label>
      <div id='output' className='bg-white border-[1px] border-black overflow-y-auto flex flex-col'>
        {optimisticNote.toReversed().map((note: any) => (
          <div className='previewOutput flex justify-between p-5'>
            <div className='mx-5 text-sm'>
              <u>Caller Name</u>: {note.callerName}<br />
              <u>Caller Number</u>: {note.callerNumber}<br />
              <u>DBA</u>: {note.dbaName}<br /><br />
              <u>Call Notes</u>: {note.callNotes.split('\n').map((str: any) => <p> - {str}</p>)}<br /><br />
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
              <div className='flex'>
                <p className="font-bold">Collab:</p>
                <p> collab </p>
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
          </div> 
        ))}
      </div>
    </div>
  )
}