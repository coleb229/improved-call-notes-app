"use client"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export default function Output({ dbas, contacts }:any) {
  return (
    <div>
      {dbas.map((dba: any) => (
        <Collapsible>
          <CollapsibleTrigger>{dba.dbaName}</CollapsibleTrigger>
          {contacts.map((contact: any) => (
            <CollapsibleContent>
              {contact.dbaName === dba.dbaName ? (
                <div key={contact.id}>
                  <p>{contact.name}</p>
                  <p>{contact.phone}</p>
                  <p>{contact.createdBy}</p>
                </div>
              ) : null}
            </CollapsibleContent>
          ))}
        </Collapsible>
      ))}
    </div>
  )
}