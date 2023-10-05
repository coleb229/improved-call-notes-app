"use server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const addTestingNote = async (testingNote: any) => {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const newTestingNote = await prisma.testingNote.create({
      data: {
        ...testingNote,
        createdBy: email as string,
      },
    });
    revalidatePath("/testing");
    return newTestingNote;
  } catch (error) {
    console.log(error);
  }
}

export const fetchTestingNotes = async (whereAt:any) => {
  try {
    const testingNote = await prisma.testingNote.findMany({
      orderBy: {
        id: "desc",
      },
      where: {
        status: whereAt,
      },
    });
    let testingNotes = testingNote.map((testingNote) => ({
      id: testingNote.id,
      name: testingNote.title,
      description: testingNote.notes,
      status: testingNote.status,
    }));
    return testingNotes;
  } catch (error) {
    console.log(error);
  }
}