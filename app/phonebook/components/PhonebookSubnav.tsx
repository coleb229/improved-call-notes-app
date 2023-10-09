"use client"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export default function PhonebookSubnav({ dbas }:any) {
  return (
    <Command className="w-1/6 h-1/3 mx-20 fixed" id="phonebookSubnav">
      <CommandInput placeholder="Search up a business name" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="DBAs">
          {dbas.map((dba: any) => (
            <CommandItem><a href={`#${dba.id}`}>{dba.dbaName}</a></CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}