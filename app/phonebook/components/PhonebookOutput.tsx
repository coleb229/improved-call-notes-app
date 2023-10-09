"use client"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import PhonebookSubnav from "./PhonebookSubnav"


export default function Output({ dbas, ids, contacts }:any) {
  return (
    <div className="flex">
      <PhonebookSubnav dbas={ids} />
      <div className="ml-auto mr-[300px]">
        {dbas.map((dba: any) => (
          <Collapsible>
            <CollapsibleTrigger id={dba.id}>
              <div className="text-lg" id="dbaContactsTrigger">
                {dba.dbaName}
              </div>
            </CollapsibleTrigger>
            {contacts.map((contact: any) => (
              <CollapsibleContent className="w-[800px]">
                {contact.dbaName === dba.dbaName ? (
                  <Table id={contact.id}>
                    <TableCaption>{contact.dbaName}</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Caller Name</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Added By</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>{contact.name}</TableCell>
                        <TableCell>{contact.phone}</TableCell>
                        <TableCell>{contact.createdBy}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                ) : null}
              </CollapsibleContent>
            ))}
          </Collapsible>
        ))}
      </div>
    </div>
  )
}