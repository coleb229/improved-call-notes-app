"use server"
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

const getDate = (givenDate = new Date()): string => {
  const offset = givenDate.getTimezoneOffset();
  givenDate = new Date(givenDate.getTime() - offset * 60 * 1000);
  return givenDate.toISOString().split('T')[0];
};

export const fetchCallNotes = async () => {
  try {
    const callNote = await prisma.callNote.findMany({
      orderBy: {
        id: "desc",
      }
    });
    let callNotes = callNote.map((callNote) => ({
      id: callNote.id,
      createdBy: callNote.createdBy as string,
      callerName: callNote.callerName,
      callerNumber: callNote.callerNumber,
      dbaName: callNote.dbaName,
      callNotes: callNote.callNotes.split("\n").map((str) => <p> - {str}</p>),
      summary: callNote.summary,
      nextSteps: callNote.nextSteps,
    }));
    return callNotes;
  } catch (error) {
    console.log(error);
  }
}

export const fetchHandoffs = async () => {
  try {
    const handoff = await prisma.handoff.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return handoff;
  } catch (error) {
    console.log(error);
  }
}

export const fetchDaysHandoffs = async () => {
  try {
    const handoff = await prisma.handoff.findMany({
      where: {
        createdAt: {
          gte: new Date(getDate()),
        }
      },
    })
    return handoff;
  } catch (error) {
    console.log(error);
  }
}

export const addExternalHandoff = async (formdata: any) => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  try {
    await prisma.handoff.create({
      data: {
        createdBy: email as string,
        dbaName: formdata.get("dbaName"),
        summary: formdata.get("summary"),
        ticket: formdata.get("ticket"),
        status: formdata.get("status"),
      },
    });
    revalidatePath("/handoff");
  } catch (error) {
    console.log(error);
  }
}