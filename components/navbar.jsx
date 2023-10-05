import ArrowSVG from '@/public/arrow.svg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Navbar() {
  return (
    <nav className="flex justify-around flex-wrap bg-slate-800 p-6" id='nav'>
      <div className='h-[25px] fuckTheOverflow'>
        <a href="/testing" className="text-white text-xl font-bold">Testing</a>
      </div>
      -
      <div className='h-[25px] fuckTheOverflow'>
        <a href="/todo" className="text-white text-xl font-bold">To Do</a>
      </div>
      -
      <div className='h-[25px] fuckTheOverflow'>
        <a href="/" className="text-white text-xl font-bold">Call Template</a>
      </div>
      -
      <div className='h-[25px] fuckTheOverflow'>
        <a href="/handoff" className="text-white text-xl font-bold">Just Handoff</a>
      </div>
      -
      <div className='h-[25px] fuckTheOverflow'>
        <a href="/rekey" className="text-white text-xl font-bold">Rekeys</a>
      </div>
      <div className='h-[25px] fuckTheOverflow'>
        <ArrowSVG width={25} height={25} />
      </div>
      <div className='h-[25px] fuckTheOverflow'>
      <DropdownMenu>
        <DropdownMenuTrigger className='text-white text-xl font-bold'>Storage</DropdownMenuTrigger>
        <div className='mt-10'>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Note Storage</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <a href="/storage">Personal</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href="/shared-storage">Shared Storage</a>
            </DropdownMenuItem>
            <DropdownMenuLabel>Phone Book</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <a href="/phonebook">Stored Contacts</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </div>
        </DropdownMenu>
      </div>
    </nav>
  )
}