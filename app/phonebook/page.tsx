"use server"
import { fetchContacts, findDBAs } from "./actions"
import Output from "./components/Output";
import ExternalLinks from "@/components/externalLinks";


export default async function Home() {
  let contacts = await fetchContacts();
  let dbas = await findDBAs();

  return (
    <div id="storageContainer">
      <ExternalLinks />
      <Output dbas={dbas} contacts={contacts} />
    </div>
  )
}