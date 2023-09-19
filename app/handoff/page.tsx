import { PrismaClient } from "@prisma/client";
import SubmitButton from '@/components/Buttons'
import { revalidatePath } from "next/cache";
import ExternalLinks from "@/components/externalLinks";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

async function saveHandoff(formData: any) {
  "use server"
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  await prisma.handoff.create({
    data: {
      createdBy: email as string,
      dbaName: formData.get('dbaName'),
      summary: formData.get('summary'),
      ticket: formData.get('ticket'),
    }
  })
  revalidatePath("/handoff")
}

export default async function Home() {
  return (
    <main className="max-h-screen">
      <ExternalLinks />
      <div id='container'>
        <Output />
        <form action={saveHandoff} id='handoffForm'>
          <div id="handoffForm">
            <label htmlFor='dbaName'>DBA Name</label>
            <input type='text' name='dbaName' id='dbaName' />
            <label htmlFor='summary'>Summary</label>
            <input type='text' name='summary' id='summary' />
            <label htmlFor='ticket'>Ticket</label>
            <input type='text' name='ticket' id='ticket' />
          </div>
          <div id="submit">
            <SubmitButton />
          </div>
        </form>
      </div>
    </main>
  )
}

async function fetchHandoffs() {
  "server";
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const handoff = await prisma.handoff.findMany({
    orderBy: {
      id: 'desc'
    },
    where: {
      createdBy: email as string
    },
    take: 5
  })
  return handoff;
}

async function Output() {
  const handoff = await fetchHandoffs();

  return (
    <div id="handoffOutput">
      {handoff.map((handoff) => (
        <div key={handoff.id} className="mb-10 mr-10 bg-white p-5">
          <div className="flex">
            <p className="font-bold underline">{handoff.dbaName}:</p>
            <p>{handoff.summary}</p>
          </div>
          <div className="flex">
            <p className="font-bold">Ticket:</p>
            <p>{handoff.ticket}</p>
          </div>
          <hr />
        </div>
      ))}
    </div>
  )
}