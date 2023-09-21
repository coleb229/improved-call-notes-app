import { PrismaClient } from "@prisma/client";
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
    callNotes: callNote.callNotes.split("\n").map((str) => <p> - {str}</p>),
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
            <div className="border-b-black border-2 px-40">
              <h1 className="text-2xl font-semibold py-5">{author.createdBy}</h1>
            </div>
            <h1 className="text-lg underline py-10 font-semibold">Call Notes / Logs</h1>
            <div className="flex w-full" id="sharedItems">
              {callNote.map((callNote: any) => (
                callNote.createdBy === author.createdBy ?
                  <div id="sharedCallNoteContainer">
                    <h1 className="text-center text-lg">{callNote.dbaName}</h1>
                    <div className="flex flex-col text-left text-sm border-2 border-black rounded-lg m-2 p-2 sharedCall bg-white">
                      <u>Caller Name</u>: {callNote.callerName}<br />
                      <u>Caller Number</u>: {callNote.callerNumber}<br />
                      <u>DBA Name</u>: {callNote.dbaName}<br /><br />
                      <u>Call Notes</u>: {callNote.callNotes}<br /><br />
                      <u>Summary</u>: {callNote.summary}<br />
                      <u>Next Steps</u>: {callNote.nextSteps}<br />
                    </div>
                    <div className="flex flex-col text-left text-sm border-2 border-black rounded-lg m-2 p-2 sharedCall bg-white">
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
            <h1 className="text-lg underline py-10 pt-24 font-semibold">Handoffs</h1>
            <div className="flex flex-col items-center w-5/6 bg-white border-2 border-black rounded-lg py-10" id="sharedHandoffs">
              {handoff.map((handoff: any) => (
                handoff.createdBy === author.createdBy ?
                  <div className="flex flex-col w-5/6 text-left m-2 p-2">
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