"use server"
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const fetchCallNotes = async () => {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const callNote = await prisma.callNote.findMany({
      orderBy: {
        id: "desc",
      },
      where: {
        createdBy: email as string,
      },
    });
    let callNotes = callNote.map((callNote) => ({
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
    console.log(error);
  }
}

export const fetchHandoffs = async () => {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const handoff = await prisma.handoff.findMany({
      orderBy: {
        id: "desc",
      },
      where: {
        createdBy: email as string,
      },
    });
    return handoff;
  } catch (error) {
    console.log(error);
  }
}

export const fetchRekeys = async () => {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const rekey = await prisma.rekey.findMany({
      orderBy: {
        id: "desc",
      },
      where: {
        createdBy: email as string,
      },
    });
    return rekey;
  } catch (error) {
    console.log(error);
  }
}

// FULL DELETES

export const deleteCallNotes = async () => {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    await prisma.callNote.deleteMany({
      where: {
        createdBy: email as string,
      },
    });
    revalidatePath("/storage")
  } catch (error) {
    console.log(error);
  }
}

export const deleteHandoffs = async () => {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    await prisma.handoff.deleteMany({
      where: {
        createdBy: email as string,
      },
    });
    revalidatePath("/storage")
  } catch (error) {
    console.log(error);
  }
}

export const deleteRekeys = async () => {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    await prisma.rekey.deleteMany({
      where: {
        createdBy: email as string,
      },
    });
    revalidatePath("/storage")
  } catch (error) {
    console.log(error);
  }
}

// SELECTIVE DELETES

export const selectiveDelete = async (formData: any) => {
  try {
    await prisma.callNote.deleteMany({
      where: {
        id: formData.get("id"),
      },
    });
    revalidatePath("/storage")
  } catch (error) {
    console.log(error);
  }
}

export const selectiveDeleteHandoff = async (formData: any) => {
  try {
    await prisma.handoff.deleteMany({
      where: {
        id: formData.get("id"),
      },
    });
    revalidatePath("/storage")
  } catch (error) {
    console.log(error);
  }
}

export const selectiveDeleteRekey = async (formData: any) => {
  try {
    await prisma.rekey.deleteMany({
      where: {
        id: formData.get("id"),
      },
    });
    revalidatePath("/storage")
  } catch (error) {
    console.log(error);
  }
}