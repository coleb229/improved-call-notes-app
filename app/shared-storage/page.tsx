import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { DeleteButton } from "@/components/Buttons";
import Github from "@/components/github";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

async function fetchCallNotes() {
  "use server";
  const callNote = await prisma.callNote.findMany({
    orderBy: {
      id: "desc",
    }
  });
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
  const handoff = await prisma.handoff.findMany({
    orderBy: {
      id: "desc",
    },
  });
  return handoff;
}

async function fetchRekeys() {
  "use server";
  const rekey = await prisma.rekey.findMany({
    orderBy: {
      id: "desc",
    },
  });
  return rekey;
}

async function deleteCallNotes() {
  "use server";
  await prisma.callNote.deleteMany({  });
  revalidatePath("/storage")
}

async function deleteHandoffs() {
  "use server";
  await prisma.handoff.deleteMany({  });
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
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if(email?.includes('@getquantic.com') === false) {return <div id="container">Access Denied</div>}

  return (
    <>
      <Github />
      <div id="storageContainer">
        <div className="flex justify-evenly">
          <div className="storageCol">
            <h1 className="text-2xl font-semibold">Call Notes</h1>
            <hr className="mb-10" />
            {callNote.map((callNote) => (
              <div key={callNote.id} className="mb-10 mr-10 bg-white p-5">
                <div className='optima'>
                  Caller Name: {callNote.callerName}<br />
                  Caller Number: {callNote.callerNumber}<br />
                  DBA Name: {callNote.dbaName}<br />
                  Call Notes: {callNote.callNotes}<br />
                  Summary: {callNote.summary}<br />
                  Next Steps: {callNote.nextSteps}<br />
                </div>
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
                <div className='optima'>
                  Caller DBA: {callNote.dbaName}<br />
                  Caller Number: {callNote.callerNumber}<br />
                  Call Summary: {callNote.summary}<br />
                  Resolved: Yes<br />
                  Ticket: Yes<br />
                  Follow Up: No<br />
                </div>
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
                <div className='optima'>
                  <div className="flex">
                    <p className="font-bold underline">{handoff.dbaName}:</p>
                    <p>{handoff.summary}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">Ticket:</p>
                    <p>{handoff.ticket}</p>
                  </div>
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
                <div className='optima'>
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
                </div>
                <form action={selectiveDeleteRekey} className="flex justify-end m-5">
                  <input type="hidden" name="id" value={rekey.id} />
                  <DeleteButton />
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