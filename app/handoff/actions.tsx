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
        collab: formdata.get('collab'),
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
    if(formdata.get('newStatus' && 'ticket' && 'collab') === null) {
      revalidatePath("/handoff")
    } else if(formdata.get('newStatus') === null && formdata.get('ticket') === "") {
      await prisma.handoff.update({
        where: {
          id: formdata.get('id')
        },
        data: {
          collab: formdata.get('collab')
        }
      })
    } else if(formdata.get('ticket') === "" && formdata.get('collab') === "") {
      await prisma.handoff.update({
        where: {
          id: formdata.get('id')
        },
        data: {
          status: formdata.get('newStatus')
        }
      })
    } else if(formdata.get('newStatus') === null && formdata.get('collab') === "") {
      await prisma.handoff.update({
        where: {
          id: formdata.get('id')
        },
        data: {
          ticket: formdata.get('ticket')
        }
      })
    } else if(formdata.get('newStatus') === null) {
      await prisma.handoff.update({
        where: {
          id: formdata.get('id')
        },
        data: {
          ticket: formdata.get('ticket'),
          collab: formdata.get('collab')
        }
      })
    } else if(formdata.get('ticket') === "") {
      await prisma.handoff.update({
        where: {
          id: formdata.get('id')
        },
        data: {
          status: formdata.get('newStatus'),
          collab: formdata.get('collab')
        }
      })
    } else if(formdata.get('collab') === "") {
      await prisma.handoff.update({
        where: {
          id: formdata.get('id')
        },
        data: {
          status: formdata.get('newStatus'),
          ticket: formdata.get('ticket')
        }
      })
    } else {
      await prisma.handoff.update({
        where: {
          id: formdata.get('id')
        },
        data: {
          status: formdata.get('newStatus'),
          ticket: formdata.get('ticket'),
          collab: formdata.get('collab')
        }
      })
    }
    revalidatePath("/handoff")
  } catch (error) {
    return(error)
  }
}

export const updateSummary = async (formdata: any) => {
  try {
    await prisma.handoff.update({
      where: {
        id: formdata.get('id')
      },
      data: {
        summary: formdata.get('summary')
      }
    })
    revalidatePath("/handoff")
  } catch (error) {
    console.log(error)
  }
}

export const deleteSelected = async (formData: any) => {
  try {
    await prisma.handoff.delete({
      where: {
        id: formData.get('id')
      }
    })
    revalidatePath("/handoff")
  } catch (error) {
    console.log(error)
  }
}

export const test = async (formdata: any) => {
  console.log(formdata.get('ticket'))
  console.log(formdata.get('status'))
}