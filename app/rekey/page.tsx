import { fetchRekeys } from './actions'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import ExternalLinks from "@/components/externalLinks";
import RekeyForm from "./components/RekeyForm";

export default async function Home() {
  const rekey = await fetchRekeys()
  return (
    <main className="max-h-screen">
      <ExternalLinks />
      <Alert className='alert mt-24 w-[50%] mx-auto hidden'>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Call has been stored in the database!
        </AlertDescription>
      </Alert>
      <div id='container'>
        <RekeyForm rekey={rekey} />
      </div>
    </main>
  )
}