"use server"
import { PrismaClient } from "@prisma/client";

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
          lt: new Date(new Date().setHours(23,59,59,999)),
        }
      },
    })
    return handoff;
  } catch (error) {
    console.log(error);
  }
}