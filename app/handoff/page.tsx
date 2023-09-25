import { fetchHandoffs } from "./actions";
import ExternalLinks from "@/components/externalLinks";
import Output from "./components/HandoffForm";
import { HandoffForm } from "./components/HandoffForm";

export default async function Home() {
  const handoff = await fetchHandoffs()

  return (
    <main className="max-h-screen">
      <ExternalLinks />
      <div id='container'>
        <Output handoff={handoff} />
      </div>
    </main>
  )
}

