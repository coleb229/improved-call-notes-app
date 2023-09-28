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


export default function Output({ dbas, contacts }:any) {
  return (
    <div>
      {dbas.map((dba: any) => (
        <Collapsible>
          <CollapsibleTrigger>
            <div className="text-lg" id="dbaContactsTrigger">
              {dba.dbaName}
            </div>
          </CollapsibleTrigger>
          {contacts.map((contact: any) => (
            <CollapsibleContent>
              {contact.dbaName === dba.dbaName ? (
                <Table>
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
  )
}