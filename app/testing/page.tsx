"use server"
import ExternalHandoff from "./components/ExternalHandoffForm"
import ExternalHandoffOutput from "./components/ExternalHandoffOutput"
import TestingStages from "./components/TestingStages"

export default async function Home() {
  return (
    <main className="mt-[100px]">
      <div className="flex" id="feature-testing">
        <ExternalHandoff />
        <ExternalHandoffOutput />
      </div>
      <TestingStages />
    </main>
  )
}