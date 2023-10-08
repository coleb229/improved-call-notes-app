"use client"
import { addTestingNote, updateToTry, updateToInProgress, updateToDone, updateToAbandoned } from "../actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SubmitButton from '@/components/Buttons';
import Draggable from 'react-draggable';
import { useRef } from "react";

function getOffset( el:any ) {
  var _x = 0;
  var _y = 0;
  while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
      _x += el.offsetLeft - el.scrollLeft;
      _y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
  }
  return { top: _y, left: _x };
}

export default async function TestingStages({testingNote}:any) {

  const tryRef = useRef()
  const inProgressRef = useRef()
  const doneRef = useRef()
  const abandonedRef = useRef()
  const dragRef = useRef<HTMLDivElement>(null)

  const tryBounds = {
    left: getOffset(tryRef).left,
    right: getOffset(tryRef).left + 300,
  }
  
  const inProgressBounds = {
    left: getOffset(inProgressRef).left,
    right: getOffset(inProgressRef).left + 300,
  }
  
  const doneBounds = {
    left: getOffset(doneRef).left,
    right: getOffset(doneRef).left + 300,
  }
  
  const abandonedBounds = {
    left: getOffset(abandonedRef).left,
    right: getOffset(abandonedRef).left + 300,
  }

  const handleStop = (data:any, id:any) => {
    console.log(data)
    if (data.x >= tryBounds.left && data.x <= tryBounds.right) {
      updateToTry(id)
    } else if (data.x >= inProgressBounds.left && data.x <= inProgressBounds.right) {
      updateToInProgress(id)
    } else if (data.x >= doneBounds.left && data.x <= doneBounds.right) {
      updateToDone(id)
    } else if (data.x >= abandonedBounds.left && data.x <= abandonedBounds.right) {
      updateToAbandoned(id)
    }
  }

  const handleStart = (data:any) => {
    const element = document.querySelector('.react-draggable') as HTMLElement
    element.style.top = `${data.y}px`
  }

  return (
    <div className="w-full flex justify-around mt-10">
      <Try testingNote={testingNote.todo} handleStop={handleStop} handleStart={handleStart} ref={tryRef} dragRef={dragRef} />
      <InProgress testingNote={testingNote.inProgress} handleStop={handleStop} ref={inProgressRef} />
      <Done testingNote={testingNote.done} handleStop={handleStop} ref={doneRef} />
      <Abandoned testingNote={testingNote.abandoned} handleStop={handleStop} ref={abandonedRef} />
    </div>
  )
}

const Try = ({testingNote, handleStop, handleStart, ref, dragRef}:any) => {
  return(
    <div className="w-full mx-5 bg-white" ref={ref}>
      <div className="flex justify-between my-2">
        <h1 className="text-xl ml-5">Try</h1>
        <Dialog>
          <DialogTrigger className="mr-5">+</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new idea to try</DialogTitle>
              <DialogDescription>
                <form action={async (formData) => {
                  await addTestingNote({
                    title: formData.get('title'),
                    notes: formData.get('notes'),
                    status: "try",
                  })
                }} className="flex flex-col">
                  <label htmlFor="title" className="text-lg">Title</label>
                  <input className="border-2 border-gray-300 rounded-lg p-2" name="title" id="title" />
                  <label htmlFor="notes" className="text-lg">Notes</label>
                  <textarea name="notes" id="notes" className="border-2 border-gray-300 rounded-lg p-2" />
                  <SubmitButton />
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <hr />
      <div>
        {testingNote?.map((note: any) => (
          <div className="react-draggable">
            <Draggable
              axis="x"
              onStop={handleStop.bind(note.id)}
              onStart={handleStart}
              ref={dragRef}
            >
              <div key={note.id} className='m-4 text-xs border-black border-[1px] rounded-lg'>
                <p className='font-semibold bg-gray-100 px-4 rounded-tl-lg rounded-tr-lg'>{note.name}</p>
                <hr />
                <p className='mx-2 bg-white'>{note.description}</p>
              </div>
            </Draggable>
          </div>
        ))}
      </div>
    </div>
  )
}

const InProgress = ({testingNote, handleStop, ref}:any) => {
  return(
    <div className="w-full mx-5 bg-white" ref={ref}>
      <div className="flex justify-between my-2">
        <h1 className="text-xl ml-5">In Progress</h1>
        <Dialog>
          <DialogTrigger className="mr-5">+</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add an idea to In Progress</DialogTitle>
              <DialogDescription>
                <form action={async (formData) => {
                  await addTestingNote({
                    title: formData.get('title'),
                    notes: formData.get('notes'),
                    status: "inProgress",
                  })
                }} className="flex flex-col">
                  <label htmlFor="title" className="text-lg">Name</label>
                  <input className="border-2 border-gray-300 rounded-lg p-2" name="title" id="title" />
                  <label htmlFor="notes" className="text-lg">Description</label>
                  <textarea name="notes" id="notes" className="border-2 border-gray-300 rounded-lg p-2" />
                  <SubmitButton />
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <hr />
      <div>
        {testingNote?.map((note: any) => (
          <Draggable
            axis="x"
            onStop={handleStop.bind(note.id)}
          >
            <div key={note.id} className='m-4 text-xs border-black border-[1px] rounded-lg'>
              <p className='font-semibold bg-gray-100 px-4 rounded-tl-lg rounded-tr-lg'>{note.name}</p>
              <hr />
              <p className='mx-2 bg-white'>{note.description}</p>
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  )
}

const Done = ({testingNote, handleStop, ref}:any) => {
  return(
    <div className="w-full mx-5 bg-white" ref={ref}>
      <div className="flex justify-between my-2">
        <h1 className="text-xl ml-5">Done</h1>
        <Dialog>
          <DialogTrigger className="mr-5">+</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a finished idea</DialogTitle>
              <DialogDescription>
                <form action={async (formData) => {
                  await addTestingNote({
                    title: formData.get('title'),
                    notes: formData.get('notes'),
                    status: "done",
                  })
                }} className="flex flex-col">
                  <label htmlFor="title" className="text-lg">Name</label>
                  <input className="border-2 border-gray-300 rounded-lg p-2" name="title" id="title" />
                  <label htmlFor="notes" className="text-lg">Description</label>
                  <textarea name="notes" id="notes" className="border-2 border-gray-300 rounded-lg p-2" />
                  <SubmitButton />
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <hr />
      <div>
        {testingNote?.map((note: any) => (
          <Draggable
            axis="x"
            onStop={handleStop.bind(note.id)}
          >
            <div key={note.id} className='m-4 text-xs border-black border-[1px] rounded-lg'>
              <p className='font-semibold bg-gray-100 px-4 rounded-tl-lg rounded-tr-lg'>{note.name}</p>
              <hr />
              <p className='mx-2 bg-white'>{note.description}</p>
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  )
}

const Abandoned = ({testingNote, handleStop, ref}:any) => {
  return(
    <div className="w-full mx-5 bg-white" ref={ref}>
      <div className="flex justify-between my-2">
        <h1 className="text-xl ml-5">Abandoned</h1>
        <Dialog>
          <DialogTrigger className="mr-5">+</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add an unsuccessful idea</DialogTitle>
              <DialogDescription>
                <form action={async (formData) => {
                  await addTestingNote({
                    title: formData.get('title'),
                    notes: formData.get('notes'),
                    status: "abandoned",
                  })
                }} className="flex flex-col">
                  <label htmlFor="title" className="text-lg">Name</label>
                  <input className="border-2 border-gray-300 rounded-lg p-2" name="title" id="title" />
                  <label htmlFor="notes" className="text-lg">Description</label>
                  <textarea name="notes" id="notes" className="border-2 border-gray-300 rounded-lg p-2" />
                  <SubmitButton />
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <hr />
      <div>
        {testingNote?.map((note: any) => (
          <Draggable
            axis="x"
            onStop={handleStop.bind(note.id)}
          >
            <div key={note.id} className='m-4 text-xs border-black border-[1px] rounded-lg'>
              <p className='font-semibold bg-gray-100 px-4 rounded-tl-lg rounded-tr-lg'>{note.name}</p>
              <hr />
              <p className='mx-2 bg-white'>{note.description}</p>
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  )
}