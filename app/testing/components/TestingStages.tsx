"use client"

export default function TestingStages() {
  return (
    <div className="w-full mx-10 flex justify-evenly mt-10">
      <Todo />
      <InProgress />
      <Done />
    </div>
  )
}

const Todo = () => {
  return(
    <div>
      <h1>Todo</h1>
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