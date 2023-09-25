import { fetchCallNotes, fetchHandoffs, fetchRekeys, deleteCallNotes, deleteHandoffs, deleteRekeys, selectiveDelete, selectiveDeleteHandoff, selectiveDeleteRekey } from "./actions"
import { DeleteButton, DeleteAllButton } from "@/components/Buttons";

const getDate = (givenDate = new Date()): string => {
  const offset = givenDate.getTimezoneOffset();
  givenDate = new Date(givenDate.getTime() - offset * 60 * 1000);
  return givenDate.toISOString().split('T')[0];
};

export default async function DisplayStoredCalls() {
  let callNote = await fetchCallNotes();
  let handoff = await fetchHandoffs();
  let rekey = await fetchRekeys();

  return (
    <>
      <div id="storageContainer">
        <h1></h1>
      </div>
    </>
  );
}