"use server"
import { fetchContacts, findDBAs, findIds } from "./actions"
import Output from "./components/PhonebookOutput";
import ExternalLinks from "@/components/externalLinks";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export default async function Home() {
  let contacts = await fetchContacts();
  let dbas = await findDBAs();
  let ids = await findIds();
  let session = await getServerSession(authOptions);

  if(session?.user?.email?.includes('@getquantic.com')) {
    return (
      <div id="phonebookContainer">
        <ExternalLinks />
        <Output dbas={dbas} ids={ids} contacts={contacts} />
      </div>
    )
  } else {
    return (
      <div id="phonebookContainer">
        <ExternalLinks />
        <div className="text-center text-2xl">You are not authorized to view this page.</div>
      </div>
    )
  }
}