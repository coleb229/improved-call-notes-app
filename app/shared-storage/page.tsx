import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { DeleteButton } from "@/components/Buttons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SharedSubnav from "@/components/sharedSubnav";
import { findAuthors } from "@/components/sharedSubnav";

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
    createdBy: callNote.createdBy as string,
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
  const callNote = await fetchCallNotes();
  const handoff = await fetchHandoffs();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const { callAuthors } = await findAuthors();

  if(email?.includes('@getquantic.com' || 'cbrant229') === false) {return <div id="container">Access Denied</div>}

  return (
    <>
      <div id="sharedContainer">
        <SharedSubnav />
        {callAuthors.map((author: any) => (
          <div id={author.createdBy} className="flex flex-col items-center py-20">
            <h1 className="text-2xl font-semibold py-5">{author.createdBy}</h1>
            <h1 className="text-lg font-semibold">Call Notes / Logs</h1>
            <div className="flex w-full" id="sharedItems">
              {callNote.map((callNote: any) => (
                callNote.createdBy === author.createdBy ?
                  <div>
                    <div className="flex flex-col text-left border-2 border-black rounded-lg m-2 p-2">
                      Caller Name: {callNote.callerName}<br />
                      Caller Number: {callNote.callerNumber}<br />
                      DBA Name: {callNote.dbaName}<br /><br />
                      Call Notes: {callNote.callNotes}<br /><br />
                      Summary: {callNote.summary}<br />
                      Next Steps: {callNote.nextSteps}<br />
                    </div>
                    <div className="flex flex-col text-left border-2 border-black rounded-lg m-2 p-2">
                      Caller DBA: {callNote.dbaName}<br />
                      Caller Number: {callNote.callerNumber}<br />
                      Call Summary: {callNote.summary}<br />
                      Resolved: Yes<br />
                      Ticket: Yes<br />
                      Follow Up: No<br />
                    </div>
                  </div>
                  : null
              ))}
            </div>
            <h1 className="text-lg font-semibold">Handoffs</h1>
            <div className="flex items-center w-full" id="sharedItems">
              {handoff.map((handoff: any) => (
                handoff.createdBy === author.createdBy ?
                  <div className="flex flex-col w-[20%] text-left border-2 border-black rounded-lg m-2 p-2">
                    <p className="font-bold underline">{handoff.dbaName}:</p>
                    <p>{handoff.summary}</p>
                    <div className="flex">
                      <p className="font-bold">Ticket:</p>
                      <p>{handoff.ticket}</p>
                    </div>
                  </div>
                  : null
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}