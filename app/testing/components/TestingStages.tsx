"use client"

export default function TestingStages() {
  return (
    <div className="w-full mx-10 flex justify-evenly mt-10">
      <Try />
      <InProgress />
      <Done />
      <Abandoned />
    </div>
  )
}

const Try = () => {
  return(
    <div>
      <h1>Try</h1>
    </div>
  )
}

const InProgress = () => {
  return(
    <div>
      <h1>In Progress</h1>
    </div>
  )
}

const Done = () => {
  return(
    <div>
      <h1>Done</h1>
    </div>
  )
}

const Abandoned = () => {
  return(
    <div>
      <h1>Abandoned</h1>
    </div>
  )
}