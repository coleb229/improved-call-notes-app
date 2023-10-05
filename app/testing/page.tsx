"use server"
import ExternalHandoff from "./components/ExternalHandoffForm"
import ExternalHandoffOutput from "./components/ExternalHandoffOutput"

export default async function Home() {
  return (
    <main className="max-h-screen mt-[100px]">
      <div className="flex">
        <ExternalHandoff />
        <ExternalHandoffOutput />
      </div>
    </main>
  )
}