"use server"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from "@/lib/prisma";
import { revalidatePath } from 'next/cache';

export const saveCallNote = async (formData: any) => {
  try {
    revalidatePath("/")
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    formData.get('status') === null ? formData.set('status', 'Unknown') : null;
    await prisma.callNote.create({
      data: {
        createdBy: email as string,
        callerName: formData.get('callerName'),
        callerNumber: formData.get('callerNumber'),
        dbaName: formData.get('dbaName'),
        callNotes: formData.get('callNotes'),
        summary: formData.get('summary'),
        nextSteps: formData.get('nextSteps'),
      }
    })
    await prisma.handoff.create({
      data: {
        createdBy: email as string,
        dbaName: formData.get('dbaName'),
        summary: formData.get('summary'),
        ticket: 'ticket',
        status: formData.get('status'),
      }
    })
    revalidatePath("/")
  } catch (error) {
    console.log(error)
  }
}

export const fetchLastCallNote = async () => {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const callNote = await prisma.callNote.findMany({
      orderBy: {
        id: 'desc'
      },
      where: {
        createdBy: email as string
      },
      take: 1
    })
    let callNotes = callNote?.map((callNote) => ({
      id: callNote.id,
      callerName: callNote.callerName,
      callerNumber: callNote.callerNumber,
      dbaName: callNote.dbaName,
      callNotes: callNote.callNotes.split("\n").map((str) => <p> - {str}</p>),
      summary: callNote.summary,
      nextSteps: callNote.nextSteps,
    }));
    return callNotes;
  } catch (error) {
    console.log(error)
  }
}