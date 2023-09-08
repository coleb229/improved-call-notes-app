import Navbar from "@/components/navbar";
import { PrismaClient } from "@prisma/client";
import SubmitButton from '@/components/SubmitButton'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";

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
}

export default async function Home() {

  return (
    <main className="max-h-screen">
      <Navbar />
      <Alert className='alert mt-24 w-[50%] mx-auto hidden'>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Call has been stored in the database!
        </AlertDescription>
      </Alert>
      <div id='container'>
        <div id="todoTable"><OutputTable /></div>
        <form action={saveToDo} id='todoForm'>
          <div className="flex w-screen">
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
            <TableCell>{todo.name}</TableCell>
            <TableCell>{todo.task}</TableCell>
            <TableCell>{todo.timeframe}</TableCell>
            <TableCell>
              <form><Button variant="destructive" type="submit">Delete</Button></form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}