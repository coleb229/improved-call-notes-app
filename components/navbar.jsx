import ArrowSVG from '@/public/arrow.svg'

export default function Navbar() {
  return (
    <nav className="flex justify-around flex-wrap bg-slate-800 p-6" id='nav'>
      <div>
        <a href="/todo" className="text-white text-xl font-bold py-15">To Do</a>
      </div>
      -
      <div>
        <a href="/" className="text-white text-xl font-bold">Call Template</a>
      </div>
      -
      <div>
        <a href="/handoff" className="text-white text-xl font-bold">Just Handoff</a>
      </div>
      -
      <div>
        <a href="/rekey" className="text-white text-xl font-bold">Rekeys</a>
      </div>
      <div>
        <ArrowSVG width={25} height={25} />
      </div>
      <div>
        <a href="/storage" className="text-white text-xl font-bold">Storage</a>
      </div>
      /
      <div>
        <a href="/shared-storage" className="text-white text-xl font-bold">Shared Storage</a>
      </div>
    </nav>
  )
}