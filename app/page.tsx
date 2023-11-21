import { fetchLastCallNote } from './actions'
import ExternalLinks from '@/components/externalLinks'
import CallNotes from '@/components/CallNotes'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache';

export default async function Home() {
  let callNote = await fetchLastCallNote();

  return (
    <main className="h-screen">
      <ExternalLinks />
      <div id='container'>
        <CallNotes callNote={callNote} />
      </div>
    </main>
  )
}

