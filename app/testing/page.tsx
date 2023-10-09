"use server"
import ExternalHandoff from "./components/ExternalHandoffForm"
import ExternalHandoffOutput from "./components/ExternalHandoffOutput"
import Flow from "./components/Flowchart-Maker"
import TestingStages from "./components/TestingStages"
import { fetchTestingNotes } from "./actions"

export default async function Home() {
  const todo = await fetchTestingNotes("try");
  const inProgress = await fetchTestingNotes("inProgress");
  const done = await fetchTestingNotes("done");
  const abandoned = await fetchTestingNotes("abandoned");

  return (
    <main className="mt-[100px]">
      <div className="">
        <TestingStages testingNote={{todo, inProgress, done, abandoned}} />
      </div>
      <div>
        <h1 className="text-2xl font-bold ml-40 mt-20">External Handoff Testing</h1>
        <hr className="mb-10" />
        <div className="flex mx-10" id="feature-testing">
          <ExternalHandoff />
          <ExternalHandoffOutput />
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold ml-40 mt-20">React-Flow Testing</h1>
        <hr className="mb-10" />
        <Flow />
      </div>
    </main>
  )
}