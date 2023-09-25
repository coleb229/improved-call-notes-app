import { fetchCallNotes, fetchHandoffs, fetchRekeys, deleteCallNotes, deleteHandoffs, deleteRekeys, selectiveDelete, selectiveDeleteHandoff, selectiveDeleteRekey } from "./actions"
import { DeleteButton, DeleteAllButton } from "@/components/Buttons";

export default async function DisplayStoredCalls() {
  let callNote = await fetchCallNotes();
  let handoff = await fetchHandoffs();
  let rekey = await fetchRekeys();

  return (
    <>
      <div id="storageContainer">
        <div className="flex justify-evenly">
          <div className="storageCol">
            <div className="flex justify-between mr-14">
              <h1 className="text-2xl font-semibold">Call Notes</h1>
              <form action={deleteCallNotes}>
                <DeleteAllButton />
              </form>
            </div>
            <hr className="mb-10" />
            {callNote?.map((callNote) => (
              <div key={callNote.id} className="mb-10 mr-10 border-2 border-black rounded-lg bg-white p-5">
                <div className='optima'>
                <u>Caller Name</u>: {callNote.callerName}<br />
                <u>Caller Number</u>: {callNote.callerNumber}<br />
                <u>DBA Name</u>: {callNote.dbaName}<br /><br />
                <u>Call Notes</u>: {callNote.callNotes}<br /><br />
                <u>Summary</u>: {callNote.summary}<br />
                <u>Next Steps</u>: {callNote.nextSteps}<br />
                </div>
                <form action={selectiveDelete} className="flex justify-end m-5">
                  <h1 className="mr-10 mt-2 font-semibold">{callNote.dbaName}</h1>
                  <input type="hidden" name="id" value={callNote.id} />
                  <DeleteButton />
                </form>
                <hr />
              </div>
            ))}
          </div>
          <div className="storageCol">
            <h1 className="text-2xl font-semibold mb-2">Call Logs</h1>
            <hr className="mb-10" />
            {callNote?.map((callNote) => (
              <div key={callNote.id} className="mb-10 mr-10 bg-white border-2 border-black rounded-lg p-5">
                <div className='optima'>
                  Caller DBA: {callNote.dbaName}<br />
                  Caller Number: {callNote.callerNumber}<br />
                  Call Summary: {callNote.summary}<br />
                  Resolved: Yes<br />
                  Ticket: Yes<br />
                  Follow Up: No<br />
                </div>
                <form action={selectiveDelete} className="flex justify-end m-5">
                  <h1 className="mr-10 mt-2 font-semibold">{callNote.dbaName}</h1>
                  <input type="hidden" name="id" value={callNote.id} />
                  <DeleteButton />
                </form>
                <hr />
              </div>
            ))}
          </div>
          <div className="storageCol">
            <div className="flex justify-between mr-14">
              <h1 className="text-2xl font-semibold">Handoffs</h1>
              <form action={deleteHandoffs}>
                <DeleteAllButton />
              </form>
            </div>
            <hr className="mb-10" />
            {handoff?.map((handoff) => (
              <div key={handoff.id} className="mb-10 mr-10 border-2 border-black rounded-lg bg-white p-5">
                <div className='optima'>
                  <div className="flex">
                    <p className="font-bold underline">{handoff.dbaName}:</p>
                    <p>{handoff.summary}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">Link:</p>
                    <p>{handoff.ticket}</p>
                  </div>
                </div>
                <form action={selectiveDeleteHandoff} className="flex justify-end m-5">
                  <h1 className="mr-10 mt-2 font-semibold">{handoff.dbaName}</h1>
                  <input type="hidden" name="id" value={handoff.id} />
                  <DeleteButton />
                </form>
                <hr />
              </div>
            ))}
          </div>
          <div className="storageCol">
            <div className="flex justify-between mr-14">
              <h1 className="text-2xl font-semibold">Rekeys</h1>
              <form action={deleteRekeys}>
                <DeleteAllButton />
              </form>
            </div>
            <hr className="mb-10" />
            {rekey?.map((rekey) => (
              <div key={rekey.id} className="mb-10 mr-10 border-2 border-black rounded-lg bg-white p-5">
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
          </div>
        </div>
      </div>
    </>
  );
}