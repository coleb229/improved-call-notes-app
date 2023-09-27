"use server"
import { fetchContacts, findDBAs } from "./actions"
import Output from "./components/Output";


export default async function Home() {
  let contacts = await fetchContacts();
  let dbas = await findDBAs();

  return (
    <div id="storageContainer">
      <Output dbas={dbas} contacts={contacts} />
    </div>
  )
}