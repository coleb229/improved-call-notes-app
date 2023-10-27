import { fetchCallNotes, fetchHandoffs, fetchRekeys, deleteCallNotes, deleteHandoffs, deleteRekeys, selectiveDelete, selectiveDeleteHandoff, selectiveDeleteRekey } from "./actions"
import { DeleteButton, DeleteAllButton } from "@/components/Buttons";
import ExternalLinks from "@/components/externalLinks";
import StorageTabs from "./components/Storage";
import Handoff from "./components/Handoff";

export default async function DisplayStoredCalls() {
  let callNote = await fetchCallNotes();
  let handoff = await fetchHandoffs();
  let rekey = await fetchRekeys();

  return (
    <>
      <ExternalLinks />
      <div id="storageContainer">
        <div className="flex justify-evenly">
          <StorageTabs callNote={callNote} handoff={handoff} rekey={rekey} />
          <Handoff handoff={handoff} />
        </div>
      </div>
    </>
  );
}

