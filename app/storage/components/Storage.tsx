"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DeleteButton, DeleteAllButton } from "@/components/Buttons";
import { deleteCallNotes, deleteHandoffs, deleteRekeys, selectiveDelete, selectiveDeleteHandoff, selectiveDeleteRekey } from "../actions";

export default function StorageTabs({ callNote, handoff, rekey }:any) {
  return (
    <div className="w-[600px]">
      <Tabs defaultValue="callnote" className="w-full">
        <TabsList id="storageTabHeader" className="w-full justify-around">
          <TabsTrigger value="callnote">Call Note</TabsTrigger>
          <TabsTrigger value="handoff">Handoff</TabsTrigger>
          <TabsTrigger value="rekey">Rekey</TabsTrigger>
        </TabsList>
        <TabsContent value="callnote">
          <div>
            <div id="callNoteHeader">
              <div className="flex justify-between">
                <h1 className="text-2xl font-semibold">Call Notes</h1>
                <form action={deleteCallNotes}>
                  <DeleteAllButton />
                </form>
              </div>
              <hr className="mb-10" />
            </div>
            <div id="storageTabsContainer">
              {callNote?.map((callNote:any) => (
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
          </div>
        </TabsContent>
        <TabsContent value="handoff">
          <div className="storageCol">
            <div id="callNoteHeader">
              <div className="flex justify-between mr-14">
                <h1 className="text-2xl font-semibold">Handoffs</h1>
                <form action={deleteHandoffs}>
                  <DeleteAllButton />
                </form>
              </div>
              <hr className="mb-10" />
            </div>
            <div id="storageTabsContainer">
              {handoff?.map((handoff:any) => (
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
          </div>
        </TabsContent>
        <TabsContent value="rekey">
          <div className="">
            <div id="callNoteHeader">
              <div className="flex justify-between mr-14">
                <h1 className="text-2xl font-semibold">Rekeys</h1>
                <form action={deleteRekeys}>
                  <DeleteAllButton />
                </form>
              </div>
              <hr className="mb-10" />
            </div>
            <div id="storageTabsContainer">
              {rekey?.map((rekey:any) => (
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
        </TabsContent>
      </Tabs>
    </div>
  )
}