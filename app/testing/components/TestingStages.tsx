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

const tryBounds = {
  left: getOffset(document.getElementById('try') as any).left,
  right: getOffset(document.getElementById('try') as any).left + 300,
}

const inProgressBounds = {
  left: getOffset(document.getElementById('inProgress') as any).left,
  right: getOffset(document.getElementById('inProgress') as any).left + 300,
}

const doneBounds = {
  left: getOffset(document.getElementById('done') as any).left,
  right: getOffset(document.getElementById('done') as any).left + 300,
}

const abandonedBounds = {
  left: getOffset(document.getElementById('abandoned') as any).left,
  right: getOffset(document.getElementById('abandoned') as any).left + 300,
}

export default async function TestingStages({testingNote}:any) {

  const handleStop = (event:any, data:any) => {
    console.log(data)
    if (data.x >= tryBounds.left && data.x <= tryBounds.right) {
      console.log('try')
    } else if (data.x >= inProgressBounds.left && data.x <= inProgressBounds.right) {
      console.log('inProgress')
    } else if (data.x >= doneBounds.left && data.x <= doneBounds.right) {
      console.log('done')
    } else if (data.x >= abandonedBounds.left && data.x <= abandonedBounds.right) {
      console.log('abandoned')
    }
  }

  return (
    <div className="w-full flex justify-around mt-10">
      <Try testingNote={testingNote.todo} handleStop={handleStop} />
      <InProgress testingNote={testingNote.inProgress} handleStop={handleStop} />
      <Done testingNote={testingNote.done} handleStop={handleStop} />
      <Abandoned testingNote={testingNote.abandoned} handleStop={handleStop} />
    </div>
  )
}

const Try = ({testingNote, handleStop}:any) => {
  return(
    <div className="w-full mx-5 bg-white" id="try">
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

const InProgress = ({testingNote, handleStop}:any) => {
  return(
    <div className="w-full mx-5 bg-white" id="inProgress">
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

const Done = ({testingNote, handleStop}:any) => {
  return(
    <div className="w-full mx-5 bg-white" id="done">
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

const Abandoned = ({testingNote, handleStop}:any) => {
  return(
    <div className="w-full mx-5 bg-white" id="abandoned">
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