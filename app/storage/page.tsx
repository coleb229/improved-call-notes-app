import { PrismaClient } from "@prisma/client";
import Navbar from "../../components/navbar";
import { Button } from "@/components/ui/button";

const prisma = new PrismaClient();

async function fetchCallNotes() {
  "use server";
  const callNote = await prisma.callNote.findMany({});
  let callNotes = callNote.map((callNote) => ({
    id: callNote.id,
    callerName: callNote.callerName,
    callerNumber: callNote.callerNumber,
    dbaName: callNote.dbaName,
    callNotes: callNote.callNotes.split("\n").map((str) => <p>{str}</p>),
    summary: callNote.summary,
    nextSteps: callNote.nextSteps,
  }));
  return callNotes;
}

async function fetchHandoffs() {
  "use server";
  const handoff = await prisma.handoff.findMany({});
  return handoff;
}

async function fetchRekeys() {
  "use server";
  const rekey = await prisma.rekey.findMany({});
  return rekey;
}

async function deleteCallNotes() {
  "use server";
  await prisma.callNote.deleteMany({});
}

async function deleteHandoffs() {
  "use server";
  await prisma.handoff.deleteMany({});
}

async function deleteRekeys() {
  "use server";
  await prisma.rekey.deleteMany({});
}

export default async function DisplayStoredCalls() {
  let callNote = await fetchCallNotes();
  let handoff = await fetchHandoffs();
  let rekey = await fetchRekeys();

  return (
    <>
      <Navbar />
      <div id="container">
        <div className="flex justify-evenly">
          <div>
            <h1 className="text-2xl font-semibold">Call Notes</h1>
            <hr className="mb-10" />
            {callNote.map((callNote) => (
              <div key={callNote.id} className="pb-10">
                <p className="font-semibold">Caller Name:</p>
                <p>{callNote.callerName}</p>
                <p className="font-semibold">Caller Number:</p>
                <p>{callNote.callerNumber}</p>
                <p className="font-semibold">Caller DBA:</p>
                <p>{callNote.dbaName}</p>
                <p className="font-semibold">Call Notes:</p>
                <p>{callNote.callNotes}</p>
                <p className="font-semibold">Call Summary:</p>
                <p>{callNote.summary}</p>
                <p className="font-semibold">Next Steps:</p>
                <p>{callNote.nextSteps}</p>
                <hr />
              </div>
            ))}
            <form action={deleteCallNotes}>
              <Button variant="destructive" type="submit">
                Delete Calls
              </Button>
            </form>
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Call Logs</h1>
            <hr className="mb-10" />
            {callNote.map((callNote) => (
              <div key={callNote.id} className="pb-10">
                <p className="font-semibold">Caller DBA:</p>
                <p>{callNote.dbaName}</p>
                <p className="font-semibold">Caller Number:</p>
                <p>{callNote.callerNumber}</p>
                <p className="font-semibold">Call Summary:</p>
                <p>{callNote.summary}</p>
                <hr />
              </div>
            ))}
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Handoffs</h1>
            <hr className="mb-10" />
            {handoff.map((handoff) => (
              <div key={handoff.id} className="pb-10">
                <div className="flex">
                  <p className="font-bold">{handoff.dbaName}:</p>
                  <p>{handoff.summary}</p>
                </div>
                <div className="flex">
                  <p className="font-semibold">Ticket:</p>
                  <p>{handoff.ticket}</p>
                </div>
                <hr />
              </div>
            ))}
            <form action={deleteHandoffs}>
              <Button variant="destructive" type="submit">
                Delete Handoffs
              </Button>
            </form>
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Rekeys</h1>
            <hr className="mb-10" />
            {rekey.map((rekey) => (
              <div key={rekey.id} className="pb-10">
                <p className="font-semibold">Ref:</p>
                <p>{rekey.ref}</p>
                <p className="font-semibold">Date:</p>
                <p>{rekey.date}</p>
                <p className="font-semibold">Auth:</p>
                <p>{rekey.auth}</p>
                <p className="font-semibold">Last4:</p>
                <p>{rekey.last4}</p>
                <p className="font-semibold">Amount:</p>
                <p>{rekey.amount}</p>
                <p className="font-semibold">Tip:</p>
                <p>{rekey.tip}</p>
                <hr />
              </div>
            ))}
            <form action={deleteRekeys}>
              <Button variant="destructive" type="submit">
                Delete Rekeys
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}