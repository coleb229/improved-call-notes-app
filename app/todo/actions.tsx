"use server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const saveToDo = async (formData: any) => {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    await prisma.todo.create({
      data: {
        name: formData.get('name'),
        task: formData.get('task'),
        timeframe: formData.get('timeframe'),
        completed: false,
      }
    })
    revalidatePath("/todo")
  } catch (error) {
    console.log(error)
  }
}

export const deleteSelected = async (formData: any) => {
  try {
    await prisma.todo.delete({
      where: {
        id: formData.get('id')
      }
    })
    revalidatePath("/todo")
  } catch (error) {
    console.log(error)
  }
}

export const fetchToDo = async () => {
  try {
    const todo = await prisma.todo.findMany({
      orderBy: {
        id: 'desc'
      }
    })
    return todo;
  } catch (error) {
    console.log(error)
  }
}