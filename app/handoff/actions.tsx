"use server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

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
    return(error)
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

export const updateHandoff = async (formdata: any) => {
  try {
    if(formdata.get('status' && 'ticket' === null)) {
      revalidatePath("/handoff")
    } else if(formdata.get('status' === null)) {
      await prisma.handoff.update({
        where: {
          id: formdata.get('id')
        },
        data: {
          ticket: formdata.get('ticket')
        }
      })
    } else if(formdata.get('ticket' === null)) {
      await prisma.handoff.update({
        where: {
          id: formdata.get('id')
        },
        data: {
          status: formdata.get('status')
        }
      })
    } else {
      await prisma.handoff.update({
        where: {
          id: formdata.get('id')
        },
        data: {
          status: formdata.get('status'),
          ticket: formdata.get('ticket')
        }
      })
    }
    revalidatePath("/handoff")
  } catch (error) {
    return(error)
  }
}