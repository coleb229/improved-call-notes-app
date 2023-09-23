import { fetchCallNotes, fetchHandoffs, fetchDaysHandoffs } from "./actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SharedSubnav from "@/components/sharedSubnav";
import { findAuthors } from "@/components/sharedSubnav";

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
        <DailySharedHandoff />
        {callAuthors.map((author: any) => (
          <div id={author.createdBy} className="flex flex-col items-center py-20">
            <div className="border-b-black border-2 px-40">
              <h1 className="text-2xl font-semibold py-5">{author.createdBy}</h1>
            </div>
            <h1 className="text-lg underline py-10 font-semibold">Call Notes / Logs</h1>
            <div className="flex w-full" id="sharedItems">
              {callNote?.map((callNote: any) => (
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
            <div className="flex flex-col items-center w-4/6 bg-white border-2 border-black rounded-lg py-10" id="sharedHandoffs">
              <h1 className="text-xl font-bold text-left ml-14 mr-auto">Follow Up</h1>
              <hr className="w-5/6 mb-5 mr-auto ml-10" />
              {handoff?.map((handoff: any) => (
                handoff.createdBy === author.createdBy && handoff.status === 'followUp' ?
                  <div className="flex flex-col w-5/6 text-left text-sm m-2 p-2">
                    <p className="font-bold underline">{handoff.dbaName}:</p>
                    <p>{handoff.summary}</p>
                    <div className="flex">
                      <p className="font-bold">Link:</p>
                      <p>{handoff.ticket}</p>
                    </div>
                  </div>
                  : null
              ))}
              <h1 className="text-xl font-bold text-left ml-14 mr-auto">Needs Attention</h1>
              <hr className="w-5/6 mb-5 mr-auto ml-10" />
              {handoff?.map((handoff: any) => (
                handoff.createdBy === author.createdBy && handoff.status === 'needsAttention' ?
                  <div className="flex flex-col w-5/6 text-left text-sm m-2 p-2">
                    <p className="font-bold underline">{handoff.dbaName}:</p>
                    <p>{handoff.summary}</p>
                    <div className="flex">
                      <p className="font-bold">Link:</p>
                      <p>{handoff.ticket}</p>
                    </div>
                  </div>
                  : null
              ))}
              <h1 className="text-xl font-bold text-left ml-14 mr-auto">In Progress</h1>
              <hr className="w-5/6 mb-5 mr-auto ml-10" />
              {handoff?.map((handoff: any) => (
                handoff.createdBy === author.createdBy && handoff.status === 'inProgress' ?
                  <div className="flex flex-col w-5/6 text-left text-sm m-2 p-2">
                    <p className="font-bold underline">{handoff.dbaName}:</p>
                    <p>{handoff.summary}</p>
                    <div className="flex">
                      <p className="font-bold">Link:</p>
                      <p>{handoff.ticket}</p>
                    </div>
                  </div>
                  : null
              ))}
              <h1 className="text-xl font-bold text-left ml-14 mr-auto">Resolved</h1>
              <hr className="w-5/6 mb-5 mr-auto ml-10" />
              {handoff?.map((handoff: any) => (
                handoff.createdBy === author.createdBy && handoff.status === 'resolved' ?
                  <div className="flex flex-col w-5/6 text-left text-sm m-2 p-2">
                    <p className="font-bold underline">{handoff.dbaName}:</p>
                    <p>{handoff.summary}</p>
                    <div className="flex">
                      <p className="font-bold">Link:</p>
                      <p>{handoff.ticket}</p>
                    </div>
                  </div>
                  : null
              ))}
              <h1 className="text-xl font-bold text-left ml-14 mr-auto">Unknown</h1>
              <hr className="w-5/6 mb-5 mr-auto ml-10" />
              {handoff?.map((handoff: any) => (
                handoff.createdBy === author.createdBy && handoff.status === 'Unknown' ?
                  <div className="flex flex-col w-5/6 text-left text-sm m-2 p-2">
                    <p className="font-bold underline">{handoff.dbaName}:</p>
                    <p>{handoff.summary}</p>
                    <div className="flex">
                      <p className="font-bold">Link:</p>
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

const DailySharedHandoff = async () => {
  const handoff = await fetchDaysHandoffs();

  return (
    <>
      <h1 className="text-2xl font-semibold text-center pt-20">Shared Daily Handoff</h1>
      <div className="flex items-center justify-center text-sm pt-10">
        <div className="flex flex-col items-center w-4/6 bg-white border-2 border-black rounded-lg py-10" id="sharedHandoffs">
          <h1 className="text-xl font-bold text-left ml-14 mr-auto">Follow Up</h1>
          <hr className="w-5/6 mb-5 mr-auto ml-10" />
          {handoff?.map((handoff: any) => (
            handoff.status === 'followUp' ?
              <div className="flex flex-col w-5/6 text-left m-2 p-2">
                <p className="font-bold underline">{handoff.dbaName}:</p>
                <p>{handoff.summary}</p>
                <div className="flex">
                  <p className="font-bold">Link:</p>
                  <p>{handoff.ticket}</p>
                </div>
              </div>
              : null
          ))}
          <h1 className="text-xl font-bold text-left ml-14 mr-auto">Needs Attention</h1>
          <hr className="w-5/6 mb-5 mr-auto ml-10" />
          {handoff?.map((handoff: any) => (
            handoff.status === 'needsAttention' ?
              <div className="flex flex-col w-5/6 text-left m-2 p-2">
                <p className="font-bold underline">{handoff.dbaName}:</p>
                <p>{handoff.summary}</p>
                <div className="flex">
                  <p className="font-bold">Link:</p>
                  <p>{handoff.ticket}</p>
                </div>
              </div>
              : null
          ))}
          <h1 className="text-xl font-bold text-left ml-14 mr-auto">In Progress</h1>
          <hr className="w-5/6 mb-5 mr-auto ml-10" />
          {handoff?.map((handoff: any) => (
            handoff.status === 'inProgress' ?
              <div className="flex flex-col w-5/6 text-left m-2 p-2">
                <p className="font-bold underline">{handoff.dbaName}:</p>
                <p>{handoff.summary}</p>
                <div className="flex">
                  <p className="font-bold">Link:</p>
                  <p>{handoff.ticket}</p>
                </div>
              </div>
              : null
          ))}
          <h1 className="text-xl font-bold text-left ml-14 mr-auto">Resolved</h1>
          <hr className="w-5/6 mb-5 mr-auto ml-10" />
          {handoff?.map((handoff: any) => (
            handoff.status === 'resolved' ?
              <div className="flex flex-col w-5/6 text-left m-2 p-2">
                <p className="font-bold underline">{handoff.dbaName}:</p>
                <p>{handoff.summary}</p>
                <div className="flex">
                  <p className="font-bold">Link:</p>
                  <p>{handoff.ticket}</p>
                </div>
              </div>
              : null
          ))}
          <h1 className="text-xl font-bold text-left ml-14 mr-auto">Unknown</h1>
          <hr className="w-5/6 mb-5 mr-auto ml-10" />
          {handoff?.map((handoff: any) => (
            handoff.status === 'Unknown' ?
              <div className="flex flex-col w-5/6 text-left m-2 p-2">
                <p className="font-bold underline">{handoff.dbaName}:</p>
                <p>{handoff.summary}</p>
                <div className="flex">
                  <p className="font-bold">Link:</p>
                  <p>{handoff.ticket}</p>
                </div>
              </div>
              : null
          ))}
        </div>
      </div>
    </>
  )
}