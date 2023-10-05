"use server"
import ExternalHandoff from "./components/ExternalHandoffForm"
import ExternalHandoffOutput from "./components/ExternalHandoffOutput"
import TestingStages from "./components/TestingStages"
import { fetchTestingNotes } from "./actions"

export default async function Home() {
  const todo = await fetchTestingNotes("try");
  const inProgress = await fetchTestingNotes("inProgress");
  const done = await fetchTestingNotes("done");
  const abandoned = await fetchTestingNotes("abandoned");

  return (
    <main className="mt-[100px]">
      <div className="flex" id="feature-testing">
        <ExternalHandoff />
        <ExternalHandoffOutput />
      </div>
      <TestingStages testingNote={{todo, inProgress, done, abandoned}} />
    </main>
  )
}