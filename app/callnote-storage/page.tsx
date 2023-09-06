import { PrismaClient } from "@prisma/client";
import Navbar from "../../components/navbar";

const prisma = new PrismaClient();

async function fetchCallNotes() {
  "use server";
  const callNote = await prisma.callNote.findMany({});
  return callNote;
}

export default async function DisplayStoredCalls() {
  let callNote = await fetchCallNotes();

  return (
    <>
      <Navbar />
      <div id="container">
        {callNote.map((callNote) => (
          <div key={callNote.id} className="pb-10">
            <p className="font-semibold">Caller Name:</p>
            <p>{callNote.callerName}</p>
            <p className="font-semibold">Caller Number:</p>
            <p>{callNote.callerNumber}</p>
            <p className="font-semibold">Caller DBA:</p>
            <p>{callNote.dbaName}</p>
            <p className="font-semibold">Call Notes:</p>
            <p>{callNote.callNotes.replaceAll()}</p>
            <p className="font-semibold">Call Summary:</p>
            <p>{callNote.summary}</p>
            <p className="font-semibold">Next Steps:</p>
            <p>{callNote.nextSteps}</p>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
}