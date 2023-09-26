"use client"
import SubmitButton from '@/components/Buttons'
import { experimental_useOptimistic as useOptimistic } from "react";
import { saveRekey } from "../actions";

type Rekey = {
  id: number,
  ref: string,
  date: string,
  auth: string,
  last4: string,
  amount: string,
  tip: string,
}

export default function RekeyForm({ rekey }: any) {
  const [ optimisticNote, setOptimisticNote ] = useOptimistic(
    rekey,
    (state, newNote: Rekey) => {
      return [...state, newNote]
    },
  )

  return (
    <form action={async (formData: FormData) => {
      setOptimisticNote({
        id: 1,
        ref: formData.get('ref') as string,
        date: formData.get('date') as string,
        auth: formData.get('auth') as string,
        last4: formData.get('last4') as string,
        amount: formData.get('amount') as string,
        tip: formData.get('tip') as string,
      })
      await saveRekey(formData)
    }} id='rekeyForm'>
      <div className="flex">
        <div className="px-20">
          <div id="rekeyForm">
            <label htmlFor='ref'>Ref</label>
            <input type='text' name='ref' id='ref' />
            <label htmlFor='date'>Date</label>
            <input type='text' name='date' id='date' />
            <label htmlFor='auth'>Auth</label>
            <input type='text' name='auth' id='auth' />
            <label htmlFor='last4'>Last4</label>
            <input type='text' name='last4' id='last4' />
            <label htmlFor='amount'>Amount</label>
            <input type='text' name='amount' id='amount' />
            <label htmlFor='tip'>Tip</label>
            <input type='text' name='tip' id='tip' />
          </div>
          <div id="submit">
            <SubmitButton />
          </div>
        </div>
        <div>
          <Output optimisticNote={optimisticNote} />
        </div>
      </div>
    </form>
  )
}

function Output({ optimisticNote }: any) {
  return (
    <div id="rekeyOutput" className="min-w-[400px] px-10 flex flex-col-reverse">
      {optimisticNote?.toReversed().map((rekey: any) => (
          <div key={rekey.id} className="mb-10 w-full bg-white p-5" id="rekeyItem">
              Ref: {rekey.ref}<br />
              Date: {rekey.date}<br />
              Auth: {rekey.auth}<br />
              Last4: {rekey.last4}<br />
              Amount: {rekey.amount}<br />
              Tip: {rekey.tip}<br />
          </div>
        ))}
    </div>
  )
}