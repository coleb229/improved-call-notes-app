export default function Handoff({ handoff }:any) {
  return (
    <div id="personalHandoffContainer">
      <div className="flex flex-col w-4/6 mx-auto items-center bg-white rounded-lg py-10">
        <h1 className="text-lg text-left ml-14 mr-auto">Follow Up</h1>
        <hr className="w-5/6 mb-5 mr-auto ml-10" />
        {handoff?.map((handoff: any) => (
          handoff.status === 'followUp' ?
            <div className="w-5/6 text-left text-sm m-2 p-2">
              <p className="font-bold underline">{handoff.dbaName}:</p>
              <p>{handoff.summary}</p>
              <div className="flex">
                <b>Link:</b>{handoff.ticket}<br />
              </div>
            </div>
            : null
        ))}
        <h1 className="text-lg text-left ml-14 mr-auto">Needs Attention</h1>
        <hr className="w-5/6 mb-5 mr-auto ml-10" />
        {handoff?.map((handoff: any) => (
          handoff.status === 'needsAttention' ?
            <div className="w-5/6 text-left text-sm m-2 p-2">
              <p className="font-bold underline">{handoff.dbaName}:</p>
              <p>{handoff.summary}</p>
              <div className="flex">
                <p className="font-bold">Link:</p>
                <p>{handoff.ticket}</p>
              </div>
            </div>
            : null
        ))}
        <h1 className="text-lg text-left ml-14 mr-auto">In Progress</h1>
        <hr className="w-5/6 mb-5 mr-auto ml-10" />
        {handoff?.map((handoff: any) => (
          handoff.status === 'inProgress' ?
            <div className="w-5/6 text-left text-sm m-2 p-2">
              <p className="font-bold underline">{handoff.dbaName}:</p>
              <p>{handoff.summary}</p>
              <div className="flex">
                <p className="font-bold">Link:</p>
                <p>{handoff.ticket}</p>
              </div>
            </div>
            : null
        ))}
        <h1 className="text-lg text-left ml-14 mr-auto">Resolved</h1>
        <hr className="w-5/6 mb-5 mr-auto ml-10" />
        {handoff?.map((handoff: any) => (
          handoff.status === 'resolved' ?
            <div className="w-5/6 text-left text-sm m-2 p-2">
              <p className="font-bold underline">{handoff.dbaName}:</p>
              <p>{handoff.summary}</p>
              <div className="flex">
                <p className="font-bold">Link:</p>
                <p>{handoff.ticket}</p>
              </div>
            </div>
            : null
        ))}
        <h1 className="text-lg text-left ml-14 mr-auto">Unknown</h1>
        <hr className="w-5/6 mb-5 mr-auto ml-10" />
        {handoff?.map((handoff: any) => (
          handoff.status === 'Unknown' ?
            <div className="w-5/6 text-left text-sm m-2 p-2">
              <p className="font-bold underline">{handoff.dbaName}:</p>
              <p>{handoff.summary}</p>
              <div className="flex">
                <p className="font-bold">Link:</p>
                <p>{handoff.ticket}</p>
              </div>
            </div>
            : null
        ))}
      </div>
    </div>
  )
}