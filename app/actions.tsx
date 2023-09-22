"use server"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export const saveCallNote = async (formData: any) => {
  try {
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
        status: 'status',
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
  
    const callNote = await prisma.callNote.findFirst({
      orderBy: {
        id: 'desc'
      },
      where: {
        createdBy: email as string
      }
    })
    return callNote;
  } catch (error) {
    console.log(error)
  }
}