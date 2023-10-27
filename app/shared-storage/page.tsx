import { fetchCallNotes, fetchHandoffs, fetchDaysHandoffs, addExternalHandoff } from "./actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SharedSubnav from "@/components/sharedSubnav";
import { findAuthors } from "@/components/sharedSubnav";
import { PrismaClient } from "@prisma/client";
import ExternalLinks from "@/components/externalLinks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import SubmitButton from "@/components/Buttons";


const prisma = new PrismaClient();

export default async function DisplayStoredCalls() {
  const callNote = await fetchCallNotes();
  const handoff = await fetchHandoffs();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const { callAuthors } = await findAuthors();

  if(email?.includes('@getquantic.com' || 'cbrant229') === false) {return <div id="container">Access Denied</div>}

  return (
    <>
      <ExternalLinks />
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
              <h1 className="text-lg text-left ml-14 mr-auto">Follow Up</h1>
              <hr className="w-5/6 mb-5 mr-auto ml-10" />
              {handoff?.map((handoff: any) => (
                handoff.createdBy === author.createdBy && handoff.status === 'followUp' ?
                  <div className="w-5/6 text-left text-sm m-2 p-2">
                    <p className="font-bold underline">{handoff.dbaName}:</p>
                    <p>{handoff.summary}</p>
                    <div className="flex">
                      <b>Link:</b>{handoff.ticket}<br />
                    </div>
                    {handoff.collab && (
                      <div className="flex">
                        <b>Collab:</b>{handoff.collab}<br />
                      </div>
                    )}
                  </div>
                  : null
              ))}
              <h1 className="text-lg text-left ml-14 mr-auto">Needs Attention</h1>
              <hr className="w-5/6 mb-5 mr-auto ml-10" />
              {handoff?.map((handoff: any) => (
                handoff.createdBy === author.createdBy && handoff.status === 'needsAttention' ?
                  <div className="w-5/6 text-left text-sm m-2 p-2">
                    <p className="font-bold underline">{handoff.dbaName}:</p>
                    <p>{handoff.summary}</p>
                    <div className="flex">
                      <p className="font-bold">Link:</p>
                      <p>{handoff.ticket}</p>
                    </div>
                    {handoff.collab && (
                      <div className="flex">
                        <b>Collab:</b>{handoff.collab}<br />
                      </div>
                    )}
                  </div>
                  : null
              ))}
              <h1 className="text-lg text-left ml-14 mr-auto">In Progress</h1>
              <hr className="w-5/6 mb-5 mr-auto ml-10" />
              {handoff?.map((handoff: any) => (
                handoff.createdBy === author.createdBy && handoff.status === 'inProgress' ?
                  <div className="w-5/6 text-left text-sm m-2 p-2">
                    <p className="font-bold underline">{handoff.dbaName}:</p>
                    <p>{handoff.summary}</p>
                    <div className="flex">
                      <p className="font-bold">Link:</p>
                      <p>{handoff.ticket}</p>
                    </div>
                    {handoff.collab && (
                      <div className="flex">
                        <b>Collab:</b>{handoff.collab}<br />
                      </div>
                    )}
                  </div>
                  : null
              ))}
              <h1 className="text-lg text-left ml-14 mr-auto">Resolved</h1>
              <hr className="w-5/6 mb-5 mr-auto ml-10" />
              {handoff?.map((handoff: any) => (
                handoff.createdBy === author.createdBy && handoff.status === 'resolved' ?
                  <div className="w-5/6 text-left text-sm m-2 p-2">
                    <p className="font-bold underline">{handoff.dbaName}:</p>
                    <p>{handoff.summary}</p>
                    <div className="flex">
                      <p className="font-bold">Link:</p>
                      <p>{handoff.ticket}</p>
                    </div>
                    {handoff.collab && (
                      <div className="flex">
                        <b>Collab:</b>{handoff.collab}<br />
                      </div>
                    )}
                  </div>
                  : null
              ))}
              <h1 className="text-lg text-left ml-14 mr-auto">Unknown</h1>
              <hr className="w-5/6 mb-5 mr-auto ml-10" />
              {handoff?.map((handoff: any) => (
                handoff.createdBy === author.createdBy && handoff.status === 'Unknown' ?
                  <div className="w-5/6 text-left text-sm m-2 p-2">
                    <p className="font-bold underline">{handoff.dbaName}:</p>
                    <p>{handoff.summary}</p>
                    <div className="flex">
                      <p className="font-bold">Link:</p>
                      <p>{handoff.ticket}</p>
                    </div>
                    {handoff.collab && (
                      <div className="flex">
                        <b>Collab:</b>{handoff.collab}<br />
                      </div>
                    )}
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
  const getDate = (givenDate = new Date()): string => {
    const offset = givenDate.getTimezoneOffset();
    givenDate = new Date(givenDate.getTime() - offset * 60 * 1000);
    return givenDate.toISOString().split('T')[0];
  };

  const hideHandoff = () => {

  }

  return (
    <>
      <h1 className="text-2xl font-semibold text-center pt-20">Shared Daily Handoff</h1>
      <h2 className="text-lg text-center">Current Date: {getDate()}</h2>
      <div className="flex items-center justify-center text-sm pt-10">
        <div className="flex flex-col px-5 w-4/6 bg-white border-2 border-black rounded-lg py-10" id="sharedHandoffs">
          <div className="flex justify-between">
            <h1 className="text-lg text-left ml-14 mr-auto">Follow Up</h1>
            <Dialog>
              <DialogTrigger className="mr-[200px] text-lg">📝</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add an external handoff to follow ups</DialogTitle>
                  <hr />
                  <DialogDescription>
                    <form action={addExternalHandoff}>
                      <div className="flex flex-col">
                        <label htmlFor='dbaName'>DBA Name</label>
                        <input type='text' name='dbaName' id='dbaName' />
                        <label htmlFor='summary'>Summary</label>
                        <input type='text' name='summary' id='summary' />
                        <label htmlFor='ticket'>Link</label>
                        <input type='text' name='ticket' id='ticket' />
                        <input type='hidden' name='status' value='followUp' />
                        <div className="mt-5 mx-auto">
                          <SubmitButton />
                        </div>
                      </div>
                    </form>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <hr className="w-5/6 mb-5 mr-auto ml-10" />
          {handoff?.map((handoff: any) => (
            handoff.status === 'followUp' ?
              <div className="w-5/6 text-left mx-20 my-2 p-2">
                <p className="font-bold underline">{handoff.dbaName}:</p>
                <p>{handoff.summary}</p>
                <div className="flex">
                  <b>Link:</b>{handoff.ticket}<br />
                </div>
                {handoff.collab && (
                  <div className="flex">
                    <b>Collab:</b>{handoff.collab}<br />
                  </div>
                )}
              </div>
            : null
          ))}
          <div className="flex justify-between">
            <h1 className="text-lg text-left ml-14 mr-auto">Needs Attention</h1>
            <Dialog>
              <DialogTrigger className="mr-[200px] text-lg">📝</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add an external handoff to needs attention</DialogTitle>
                  <hr />
                  <DialogDescription>
                    <form action={addExternalHandoff}>
                      <div className="flex flex-col">
                        <label htmlFor='dbaName'>DBA Name</label>
                        <input type='text' name='dbaName' id='dbaName' />
                        <label htmlFor='summary'>Summary</label>
                        <input type='text' name='summary' id='summary' />
                        <label htmlFor='ticket'>Link</label>
                        <input type='text' name='ticket' id='ticket' />
                        <input type='hidden' name='status' value='needsAttention' />
                        <div className="mt-5 mx-auto">
                          <SubmitButton />
                        </div>
                      </div>
                    </form>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <hr className="w-5/6 mb-5 mr-auto ml-10" />
          {handoff?.map((handoff: any) => (
            handoff.status === 'needsAttention' ?
              <div className="w-5/6 text-left mx-20 my-2 p-2">
                <p className="font-bold underline">{handoff.dbaName}:</p>
                <p>{handoff.summary}</p>
                <div className="flex">
                  <p className="font-bold">Link:</p>
                  <p>{handoff.ticket}</p>
                </div>
                {handoff.collab && (
                  <div className="flex">
                    <b>Collab:</b>{handoff.collab}<br />
                  </div>
                )}
              </div>
              : null
          ))}
          <div className="flex justify-between">
            <h1 className="text-lg text-left ml-14 mr-auto">In Progress</h1>
            <Dialog>
              <DialogTrigger className="mr-[200px] text-lg">📝</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add an external handoff to in progress</DialogTitle>
                  <hr />
                  <DialogDescription>
                    <form action={addExternalHandoff}>
                      <div className="flex flex-col">
                        <label htmlFor='dbaName'>DBA Name</label>
                        <input type='text' name='dbaName' id='dbaName' />
                        <label htmlFor='summary'>Summary</label>
                        <input type='text' name='summary' id='summary' />
                        <label htmlFor='ticket'>Link</label>
                        <input type='text' name='ticket' id='ticket' />
                        <input type='hidden' name='status' value='inProgress' />
                        <div className="mt-5 mx-auto">
                          <SubmitButton />
                        </div>
                      </div>
                    </form>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <hr className="w-5/6 mb-5 mr-auto ml-10" />
          {handoff?.map((handoff: any) => (
            handoff.status === 'inProgress' ?
              <div className="w-5/6 text-left mx-20 my-2 p-2">
                <p className="font-bold underline">{handoff.dbaName}:</p>
                <p>{handoff.summary}</p>
                <div className="flex">
                  <p className="font-bold">Link:</p>
                  <p>{handoff.ticket}</p>
                </div>
                {handoff.collab && (
                  <div className="flex">
                    <b>Collab:</b>{handoff.collab}<br />
                  </div>
                )}
              </div>
              : null
          ))}
          <div className="flex justify-between">
            <h1 className="text-lg text-left ml-14 mr-auto">Resolved</h1>
            <Dialog>
              <DialogTrigger className="mr-[200px] text-lg">📝</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add an external handoff to resolved</DialogTitle>
                  <hr />
                  <DialogDescription>
                    <form action={addExternalHandoff}>
                      <div className="flex flex-col">
                        <label htmlFor='dbaName'>DBA Name</label>
                        <input type='text' name='dbaName' id='dbaName' />
                        <label htmlFor='summary'>Summary</label>
                        <input type='text' name='summary' id='summary' />
                        <label htmlFor='ticket'>Link</label>
                        <input type='text' name='ticket' id='ticket' />
                        <input type='hidden' name='status' value='resolved' />
                        <div className="mt-5 mx-auto">
                          <SubmitButton />
                        </div>
                      </div>
                    </form>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <hr className="w-5/6 mb-5 mr-auto ml-10" />
          {handoff?.map((handoff: any) => (
            handoff.status === 'resolved' ?
              <div className="w-5/6 text-left mx-20 my-2 p-2">
                <p className="font-bold underline">{handoff.dbaName}:</p>
                <p>{handoff.summary}</p>
                <div className="flex">
                  <p className="font-bold">Link:</p>
                  <p>{handoff.ticket}</p>
                </div>
                {handoff.collab && (
                  <div className="flex">
                    <b>Collab:</b>{handoff.collab}<br />
                  </div>
                )}
              </div>
              : null
          ))}
          <div className="flex justify-between">
            <h1 className="text-lg text-left ml-14 mr-auto">Unknown</h1>
            <Dialog>
              <DialogTrigger className="mr-[200px] text-lg">📝</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add an external handoff to unknown</DialogTitle>
                  <hr />
                  <DialogDescription>
                    <form action={addExternalHandoff}>
                      <div className="flex flex-col">
                        <label htmlFor='dbaName'>DBA Name</label>
                        <input type='text' name='dbaName' id='dbaName' />
                        <label htmlFor='summary'>Summary</label>
                        <input type='text' name='summary' id='summary' />
                        <label htmlFor='ticket'>Link</label>
                        <input type='text' name='ticket' id='ticket' />
                        <input type='hidden' name='status' value='unknown' />
                        <div className="mt-5 mx-auto">
                          <SubmitButton />
                        </div>
                      </div>
                    </form>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <hr className="w-5/6 mb-5 mr-auto ml-10" />
          {handoff?.map((handoff: any) => (
            handoff.status === 'Unknown' ?
              <div className="w-5/6 text-left mx-20 my-2 p-2">
                <p className="font-bold underline">{handoff.dbaName}:</p>
                <p>{handoff.summary}</p>
                <div className="flex">
                  <p className="font-bold">Link:</p>
                  <p>{handoff.ticket}</p>
                </div>
                {handoff.collab && (
                  <div className="flex">
                    <b>Collab:</b>{handoff.collab}<br />
                  </div>
                )}
              </div>
              : null
          ))}
        </div>
      </div>
    </>
  )
}

//comment