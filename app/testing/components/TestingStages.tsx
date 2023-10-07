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

  const tryRef = useRef(null)
  const inProgressRef = useRef(null)
  const doneRef = useRef(null)
  const abandonedRef = useRef(null)

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

  const handleStop = (event:any, data:any) => {
    console.log(data)
    if (data.x >= tryBounds.left && data.x <= tryBounds.right) {
      updateToTry(data.node.children[0].children[0].children[0].value)
    } else if (data.x >= inProgressBounds.left && data.x <= inProgressBounds.right) {
      updateToInProgress(data.node.children[0].children[0].children[0].value)
    } else if (data.x >= doneBounds.left && data.x <= doneBounds.right) {
      updateToDone(data.node.children[0].children[0].children[0].value)
    } else if (data.x >= abandonedBounds.left && data.x <= abandonedBounds.right) {
      updateToAbandoned(data.node.children[0].children[0].children[0].value)
    }
  }

  return (
    <div className="w-full flex justify-around mt-10">
      <Try testingNote={testingNote.todo} handleStop={handleStop} ref={tryRef} />
      <InProgress testingNote={testingNote.inProgress} handleStop={handleStop} ref={inProgressRef} />
      <Done testingNote={testingNote.done} handleStop={handleStop} ref={doneRef} />
      <Abandoned testingNote={testingNote.abandoned} handleStop={handleStop} ref={abandonedRef} />
    </div>
  )
}

const Try = ({testingNote, handleStop, ref}:any) => {
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
          <form>
            <input type="hidden" name="id" value={note.id} />
            <Draggable
              axis="x"
              onStop={handleStop}
            >
              <div key={note.id}>
                <p>{note.name}</p>
                <p>{note.description}</p>
                +
              </div>
            </Draggable>
          </form>
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
              <DialogTitle>Add a new idea to try</DialogTitle>
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
            onStop={handleStop}
          >
            <div key={note.id}>
              <p>{note.name}</p>
              <p>{note.description}</p>
              +
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
              <DialogTitle>Add a new idea to try</DialogTitle>
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
            onStop={handleStop}
          >
            <div key={note.id}>
              <p>{note.name}</p>
              <p>{note.description}</p>
              +
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
              <DialogTitle>Add a new idea to try</DialogTitle>
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
            onStop={handleStop}
          >
            <div key={note.id}>
              <p>{note.name}</p>
              <p>{note.description}</p>
              +
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  )
}