"use server"
import { getServerSession } from "next-auth";
import { authOptions } from '@/lib/auth';
import prisma from "@/lib/prisma";
import { revalidatePath } from 'next/cache';

export const fetchContacts = async () => {
  try {
    const contacts = await prisma.contact.findMany({})
    return contacts
  } catch (error) {
    console.log(error)
  }
}

export const findDBAs = async () => {
  try {
    const dbas = await prisma.contact.findMany({
      distinct: ['dbaName']
    })
    return dbas
  } catch (error) {
    console.log(error)
  }
}