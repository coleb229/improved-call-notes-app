import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function findAuthors() {
  const callAuthors = await prisma.handoff.findMany({
    distinct: ['createdBy'],
  })
  const rekeyAuthors = await prisma.rekey.findMany({
    distinct: ['createdBy'],
  })
  return { callAuthors, rekeyAuthors }
}

export default async function SharedSubnav() {
  const { callAuthors, rekeyAuthors } = await findAuthors();

  return (
    <div className="flex w-full justify-around" id="sharedSubnav">
      {callAuthors.map((author: any) => (
        <a href={`#${author.createdBy}`} className="text-center text-lg font-semibold w-1/2">
          {author.createdBy}
        </a>
      ))}
    </div>
  )
}