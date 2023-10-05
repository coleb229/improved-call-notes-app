"use client"

export default function TestingStages() {
  return (
    <div className="w-full flex justify-around mt-10">
      <Try />
      <InProgress />
      <Done />
      <Abandoned />
    </div>
  )
}

const Try = () => {
  return(
    <div className="w-full mx-5 bg-white">
      <div className="flex justify-between my-2">
        <h1 className="text-xl ml-5">Try</h1>
        <button className="mr-5">+</button>
      </div>
      <hr />
    </div>
  )
}

const InProgress = () => {
  return(
    <div className="w-full mx-5 bg-white">
      <div className="flex justify-between my-2">
        <h1 className="text-xl ml-5">In Progress</h1>
        <button className="mr-5">+</button>
      </div>
      <hr />
    </div>
  )
}

const Done = () => {
  return(
    <div className="w-full mx-5 bg-white">
      <div className="flex justify-between my-2">
        <h1 className="text-xl ml-5">Done</h1>
        <button className="mr-5">+</button>
      </div>
      <hr />
    </div>
  )
}

const Abandoned = () => {
  return(
    <div className="w-full mx-5 bg-white">
      <div className="flex justify-between my-2">
        <h1 className="text-xl ml-5">Abandoned</h1>
        <button className="mr-5">+</button>
      </div>
      <hr />
    </div>
  )
}