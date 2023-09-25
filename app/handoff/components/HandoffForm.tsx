import SubmitButton from '@/components/Buttons';
import { saveHandoff } from '../actions';

export const HandoffForm = () => {
  return(
    <form action={saveHandoff} id='handoffForm'>
      <div id="handoffForm">
        <label htmlFor='dbaName'>DBA Name</label>
        <input type='text' name='dbaName' id='dbaName' />
        <label htmlFor='summary'>Summary</label>
        <input type='text' name='summary' id='summary' />
        <label htmlFor='ticket'>Link</label>
        <input type='text' name='ticket' id='ticket' />
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
        <div id="submit">
          <SubmitButton />
        </div>
      </div>
    </form>
  )
}