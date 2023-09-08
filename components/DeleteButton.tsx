import { PrismaClient } from "@prisma/client";
import { Button } from "./ui/button";

const prisma = new PrismaClient();

async function deleteToDo(this: any) {
  "use server";
  await prisma.todo.delete({
    where: {
      id: this.id,
    },
  });
}

export default async function Home(props: any) {
  return (
    <Button variant="destructive" onClick={deleteToDo.bind(props)} type="reset">
      Delete
    </Button>
  )
}