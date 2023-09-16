import Navbar from "@/components/navbar";
import { PrismaClient } from "@prisma/client";
import SubmitButton from '@/components/Buttons';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { revalidatePath } from "next/cache";
import { DeleteButton } from "@/components/Buttons";
import Github from "@/components/github";
import ExternalLinks from "@/components/externalLinks";

const prisma = new PrismaClient();

async function saveToDo(formData: any) {
  "use server"
  await prisma.todo.create({
    data: {
      name: formData.get('name'),
      task: formData.get('task'),
      timeframe: formData.get('timeframe'),
      completed: false,
    }
  })
  revalidatePath("/todo")
}

async function deleteSelected(formData: any) {
  "use server"
  await prisma.todo.delete({
    where: {
      id: formData.get('id')
    }
  })
  revalidatePath("/todo")
}

export default async function Home() {

  return (
    <main className="max-h-screen">
      <Navbar />
      <ExternalLinks />
      <div id='container'>
        <div id="todoTable"><OutputTable /></div>
        <div id="todoForm">
          <form action={saveToDo}>
            <div className="flex">
              <div className="todo">
                <label htmlFor='name'>Name</label>
                <input type='text' name='name' id='name' />
              </div>
              <div className="todo">
                <label htmlFor='task'>Task</label>
                <input type='text' name='task' id='task' className="w-[25rem]" />
              </div>
              <div className="todo">
                <label htmlFor='timeframe'>Timeframe</label>
                <input type='text' name='timeframe' id='timeframe' />
              </div>
              <div id="submitTodo">
                <SubmitButton />
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

async function OutputTable() {
  const todo = await prisma.todo.findMany({});

  return (
    <Table className="w-2/3 mx-auto">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Task</TableHead>
          <TableHead>Timeframe</TableHead>
          <TableHead>Completed</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todo.map((todo) => (
          <TableRow key={todo.id}>
            <TableCell className="optima">{todo.name}</TableCell>
            <TableCell className="optima">{todo.task}</TableCell>
            <TableCell className="optima">{todo.timeframe}</TableCell>
            <TableCell>
              {/* had to wrap delete in a form to hit it with server action */}
              <form action={deleteSelected}>
                <input type="hidden" name="id" value={todo.id} />
                <DeleteButton />
              </form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}