import { PrismaClient } from "@prisma/client";
import Navbar from "../../components/navbar";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import { DeleteButton } from "@/components/Buttons";

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
  revalidatePath("/storage")
}

async function deleteHandoffs() {
  "use server";
  await prisma.handoff.deleteMany({});
  revalidatePath("/storage")
}

async function deleteRekeys() {
  "use server";
  await prisma.rekey.deleteMany({});
  revalidatePath("/storage")
}

async function selectiveDelete(formData: any) {
  "use server";
  await prisma.callNote.deleteMany({
    where: {
      id: formData.get("id"),
    },
  });
  revalidatePath("/storage")
}

async function selectiveDeleteHandoff(formData: any) {
  "use server";
  await prisma.handoff.deleteMany({
    where: {
      id: formData.get("id"),
    },
  });
  revalidatePath("/storage")
}

async function selectiveDeleteRekey(formData: any) {
  "use server";
  await prisma.rekey.deleteMany({
    where: {
      id: formData.get("id"),
    },
  });
  revalidatePath("/storage")
}


export default async function DisplayStoredCalls() {
  let callNote = await fetchCallNotes();
  let handoff = await fetchHandoffs();
  let rekey = await fetchRekeys();

  return (
    <>
      <Navbar />
      <div id="storageContainer">
        <div className="flex justify-evenly">
          <div className="storageCol">
            <h1 className="text-2xl font-semibold">Call Notes</h1>
            <hr className="mb-10" />
            {callNote.map((callNote) => (
              <div key={callNote.id} className="mb-10 mr-10 bg-white p-5">
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
                <form action={selectiveDelete} className="flex justify-end m-5">
                  <input type="hidden" name="id" value={callNote.id} />
                  <DeleteButton />
                </form>
                <hr />
              </div>
            ))}
            <form action={deleteCallNotes}>
              <DeleteButton />
            </form>
          </div>
          <div className="storageCol">
            <h1 className="text-2xl font-semibold">Call Logs</h1>
            <hr className="mb-10" />
            {callNote.map((callNote) => (
              <div key={callNote.id} className="mb-10 mr-10 bg-white p-5">
                Caller DBA: {callNote.dbaName}<br />
                Caller Number: {callNote.callerNumber}<br />
                Call Summary: {callNote.summary}<br />
                Resolved: Yes<br />
                Ticket: Yes<br />
                Follow Up: No<br />
                <form action={selectiveDelete} className="flex justify-end m-5">
                  <input type="hidden" name="id" value={callNote.id} />
                  <DeleteButton />
                </form>
                <hr />
              </div>
            ))}
            <form action={deleteCallNotes}>
              <DeleteButton />
            </form>
          </div>
          <div className="storageCol">
            <h1 className="text-2xl font-semibold">Handoffs</h1>
            <hr className="mb-10" />
            {handoff.map((handoff) => (
              <div key={handoff.id} className="mb-10 mr-10 bg-white p-5">
                <div className="flex">
                  <p className="font-bold underline">{handoff.dbaName}:</p>
                  <p>{handoff.summary}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">Ticket:</p>
                  <p>{handoff.ticket}</p>
                </div>
                <form action={selectiveDeleteHandoff} className="flex justify-end m-5">
                  <input type="hidden" name="id" value={handoff.id} />
                  <DeleteButton />
                </form>
                <hr />
              </div>
            ))}
            <form action={deleteHandoffs}>
              <DeleteButton />
            </form>
          </div>
          <div className="storageCol">
            <h1 className="text-2xl font-semibold">Rekeys</h1>
            <hr className="mb-10" />
            {rekey.map((rekey) => (
              <div key={rekey.id} className="mb-10 mr-10 bg-white p-5">
                <div className="flex">
                  <p className="">Ref: {rekey.ref}</p>
                </div>
                <div className="flex">
                  <p className="">Date: {rekey.date}</p>
                </div>
                <div className="flex">
                  <p className="">Auth: {rekey.auth}</p>
                </div>
                <div className="flex">
                  <p className="">Last4: {rekey.last4}</p>
                </div>
                <div className="flex">
                  <p className="">Amount: {rekey.amount}</p>
                </div>
                <div className="flex">
                  <p className="">Tip: {rekey.tip}</p>
                </div>
                <form action={selectiveDeleteRekey} className="flex justify-end m-5">
                  <input type="hidden" name="id" value={rekey.id} />
                  
                </form>
                <hr />
              </div>
            ))}
            <form action={deleteRekeys}>
              <DeleteButton />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}