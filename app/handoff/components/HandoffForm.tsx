"use client"
import SubmitButton from '@/components/Buttons';
import { experimental_useOptimistic as useOptimistic } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UpdateButton, DeleteButton } from "@/components/Buttons";
import { updateHandoff, saveHandoff, deleteSelected } from "../actions";
import ExternalHandoff from './ExternalHandoff';

type Handoff = {
  id: number,
  dbaName: string,
  summary: string,
  ticket: string,
  status: string,
}

export default function Handoff({ handoff, externalHandoff }: any) {
  const [ optimisticNote, setOptimisticNote ] = useOptimistic(
    handoff,
    (state, newNote: Handoff) => {
      return [...state, newNote]
    },
  )

  return (
    <>
    <div id="handoffOutput">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Delete</TableHead>
            <TableHead>Handoff</TableHead>
            <TableHead>Update Handoff</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {optimisticNote?.toReversed().map((handoff: any) => (
            <TableRow key={handoff.id}>
              <TableCell>
                <div>
                  <form action={deleteSelected}>
                    <input type="hidden" name="id" value={handoff.id} />
                    <DeleteButton />
                  </form>
                </div>
              </TableCell>
              <TableCell>
                <div className="my-5 mx-10 bg-white p-5">
                  <div className="flex">
                    <p className="font-bold underline">{handoff.dbaName}:</p>
                    <p>{handoff.summary}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">Link:</p>
                    <p>{handoff.ticket}</p>
                  </div>
                  <hr />
                  <p className="font-bold text-green-500 text-right">{handoff.status}</p>
                </div>
              </TableCell>
              <TableCell>
                <form action={updateHandoff} id="updateHandoff">
                  <input type="hidden" name="id" value={handoff.id} />
                  <div className="flex justify-around items-center">
                    <UpdateStatusForm />
                    <UpdateLinkForm />
                    <UpdateButton />
                  </div>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    <div className='flex justify-center'>
      <div className='h-1/2'><ExternalHandoff /></div>
      <HandoffForm setOptimisticNote={setOptimisticNote} />
    </div>
    </>
  )
}

export const HandoffForm = ({ setOptimisticNote }:any) => {
  return(
    <form action={async (formData) => {
      setOptimisticNote({
        dbaName: formData.get('dbaName') as string,
        summary: formData.get('summary') as string,
        ticket: formData.get('ticket') as string,
        status: formData.get('status') as string,
      })
      console.log(formData.get('status'))
      await saveHandoff(formData)
    }} id='handoffForm'>
      <div id="handoffForm">
        <label htmlFor='dbaName'>DBA Name</label>
        <input type='text' name='dbaName' id='dbaName' />
        <label htmlFor='summary'>Summary</label>
        <input type='text' name='summary' id='summary' />
        <label htmlFor='ticket'>Link</label>
        <input type='text' name='ticket' id='ticket' />
        <div className="flex justify-center">
          <div>
            <label htmlFor="followUp">Follow Up</label>
            <input type="radio" name="status" id="followUp" value="followUp" />
          </div>
          <div>
            <label htmlFor="needsAttention">Needs Attention</label>
            <input type="radio" name="status" id="needsAttention" value="needsAttention" />
          </div>
          <div>
            <label htmlFor="inProgress">In Progress</label>
            <input type="radio" name="status" id="inProgress" value="inProgress" />
          </div>
          <div>
            <label htmlFor="resolved">Resolved</label>
            <input type="radio" name="status" id="resolved" value="resolved" />
          </div>
        </div>
        <div id="submit">
          <SubmitButton />
        </div>
      </div>
    </form>
  )
}

const UpdateStatusForm = () => {
  return (
    <>
      <div className="flex flex-col text-sm">
        <div className="flex justify-between">
          <label htmlFor="followUp">Follow Up</label>
          <input type="radio" name="status" id="followUp" value="followUp" />
        </div>
        <div className="flex justify-between">
          <label htmlFor="needsAttention">Needs Attention</label>
          <input type="radio" name="status" id="needsAttention" value="needsAttention" className="ml-5" />
        </div>
        <div className="flex justify-between">
          <label htmlFor="inProgress">In Progress</label>
          <input type="radio" name="status" id="inProgress" value="inProgress" />
        </div>
        <div className="flex justify-between">
          <label htmlFor="resolved">Resolved</label>
          <input type="radio" name="status" id="resolved" value="resolved" />
        </div>
      </div>
    </>
  )
}

const UpdateLinkForm = () => {
  return (
    <>
      <div className="flex flex-col text-sm w-2/6">
        <label htmlFor="ticket">Link</label>
        <input type='text' name='ticket' id='ticket' />
      </div>
    </>
  )
}