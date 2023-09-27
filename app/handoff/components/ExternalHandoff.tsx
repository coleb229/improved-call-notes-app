"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SubmitButton from "@/components/Buttons"

export default function ExternalHandoff({ saveExternalHandoff }:any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>External Handoff</CardTitle>
        <CardDescription>Use this form to submit an external handoff note to the shared storage. <br /> **NOT CURRENTLY WORKING**</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={saveExternalHandoff} id="saveHandoff">
          <div className="flex flex-col">
            <div className="flex justify-between w-5/6">
              <label className="text-sm" htmlFor="author">Author Name:</label>
              <input type="text" name="author" id="author" />
            </div>
            <div className="flex justify-between w-5/6">
              <label className="text-sm" htmlFor="handoff">Handoff:</label>
              <textarea name="externalHandoff" id="externalHandoff" />
            </div>
            <div className="flex justify-between w-5/6">
              <div>
                <label className="text-sm" htmlFor="status">Status:</label>
              </div>
              <div>
                <div>
                  <input type="radio" name="status" id="followUp" value="followUp" />
                  <label className="text-sm" htmlFor="followUp">Follow Up</label>
                </div>
                <div>
                  <input type="radio" name="status" id="needsAttention" value="needsAttention" />
                  <label className="text-sm" htmlFor="needsAttention">Needs Attention</label>
                </div>
                <div>
                  <input type="radio" name="status" id="inProgress" value="inProgress" />
                  <label className="text-sm" htmlFor="inProgress">In Progress</label>
                </div>
                <div>
                  <input type="radio" name="status" id="resolved" value="resolved" />
                  <label className="text-sm" htmlFor="resolved">Resolved</label>
                </div>
              </div>
            </div>
            <div id="" className="mx-auto">
              <SubmitButton />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}