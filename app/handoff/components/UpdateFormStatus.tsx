"use client"

export const UpdateStatusForm = () => {

  return (
    <>
      <div className="flex justify-center">
        <div>
          <label htmlFor="followUp">Follow Up</label>
          <input type="radio" name="status" id="followUp" value="followUp" />
        </div>
        <div>
          <label htmlFor="needsAttention">Needs Attention</label>
          <input type="radio" name="status" id="needsAttention" value="needsAttention" />
        </div>
        <div>
          <label htmlFor="inProgress">In Progress</label>
          <input type="radio" name="status" id="inProgress" value="inProgress" />
        </div>
        <div>
          <label htmlFor="resolved">Resolved</label>
          <input type="radio" name="status" id="resolved" value="resolved" />
        </div>
      </div>
    </>
  )
}