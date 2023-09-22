"use server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export const saveHandoff = async (formdata: any) => {
  try {
    const session = await getServerSession(authOptions)
    const email = session?.user?.email
    formdata.get('status') === null ? formdata.set('status', 'Unknown') : null
    await prisma.handoff.create({
      data: {
        createdBy: email as string,
        dbaName: formdata.get('dbaName'),
        summary: formdata.get('summary'),
        ticket: formdata.get('ticket'),
        status: formdata.get('status'),
      }
    })
    revalidatePath("/handoff")
  } catch (error) {
    console.log(error)
  }
}

export const fetchHandoffs = async () => {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const handoff = await prisma.handoff.findMany({
      orderBy: {
        id: 'desc'
      },
      where: {
        createdBy: email as string
      }
    })
    return handoff;
  } catch (error) {
    console.log(error)
  }
}