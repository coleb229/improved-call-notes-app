import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function updateCallnote(formData1: any, formData2: any) {
  "use server";
  const callNote = await prisma.callNote.update({
    where: {
      id: formData1.get("id"),
    },
    data: {
      callerName: formData2.get("callerName"),
      callerNumber: formData2.get("callerNumber"),
      dbaName: formData2.get("dbaName"),
      callNotes: formData2.get("callNotes"),
      summary: formData2.get("summary"),
      nextSteps: formData2.get("nextSteps"),
    },
  });
  return callNote;
}

export default async function UpdateCallnote() {

}