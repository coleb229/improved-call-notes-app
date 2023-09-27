import { fetchHandoffs } from "./actions";
import ExternalLinks from "@/components/externalLinks";
import Handoff from "./components/HandoffForm";

export default async function Home() {
  const handoff = await fetchHandoffs()

  return (
    <main className="max-h-screen">
      <ExternalLinks />
      <div id='container'>
        <Handoff handoff={handoff} />
      </div>
    </main>
  )
}

