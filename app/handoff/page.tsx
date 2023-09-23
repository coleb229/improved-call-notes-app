import { fetchHandoffs, saveHandoff, updateHandoff, test } from "./actions";
import SubmitButton from '@/components/Buttons';
import { UpdateButton } from "@/components/Buttons";
import ExternalLinks from "@/components/externalLinks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Home() {
  return (
    <main className="max-h-screen">
      <ExternalLinks />
      <div id='container'>
        <Output />
        <form action={saveHandoff} id='handoffForm'>
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
      </div>
    </main>
  )
}

async function Output() {
  const handoff = await fetchHandoffs()

  return (
    <div id="handoffOutput">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Handoff</TableHead>
            <TableHead>Update Handoff</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {handoff?.map((handoff: any) => (
            <TableRow key={handoff.id}>
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
                <form action={updateHandoff}>
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