import Navbar from "@/components/navbar";
import { PrismaClient } from "@prisma/client";
import SubmitButton from '@/components/SubmitButton'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
  const todo = await prisma.todo.findFirst({});

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
        <OutputTable />
        <form action={saveToDo} id='todoForm'>
          <div className="flex">
            <div>
              <label htmlFor='name'>Name</label>
              <input type='text' name='name' id='name' />
            </div>
            <div>
              <label htmlFor='task'>Task</label>
              <input type='text' name='task' id='task' className="w-[50rem]" />
            </div>
          </div>
          <div className="flex justify-evenly">
            <div>
              <label htmlFor='timeframe'>Timeframe</label>
              <input type='text' name='timeframe' id='timeframe' />
            </div>
          </div>
          <div id="submit">
            <SubmitButton />
          </div>
        </form>
      </div>
    </main>
  )
}

async function OutputTable() {
  const todo = await prisma.todo.findMany({});

  return (
    <Table className="w-2/3">
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
            <TableCell>{todo.completed}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}