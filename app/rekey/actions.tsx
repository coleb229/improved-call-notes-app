"use server"
import prisma from "@/lib/prisma"
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export const saveRekey = async (formData: any) => {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    await prisma.rekey.create({
      data: {
        createdBy: email as string,
        ref: formData.get('ref'),
        date: formData.get('date'),
        auth: formData.get('auth'),
        last4: formData.get('last4'),
        amount: formData.get('amount'),
        tip: formData.get('tip'),
      }
    })
    revalidatePath("/rekey")
  } catch (error) {
    console.log(error)
  }
}

export const fetchRekeys = async () => {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const rekey = await prisma.rekey.findMany({
      orderBy: {
        id: 'desc'
      },
      where: {
        createdBy: email as string
      },
      take: 10
    })
    return rekey;
  } catch (error) {
    console.log(error)
  }
}