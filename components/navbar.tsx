"use client"
export default function Navbar() {
  return (
    <nav className="flex w-full items-center justify-around flex-wrap bg-gray-800 p-6">
      <div>
        <a href="/" className="text-white text-2xl font-bold">Call Template</a>
      </div>
      <div>
        <a href="/handoff" className="text-white text-2xl font-bold">Just Handoff</a>
      </div>
      <div>
        <a href="/rekey" className="text-white text-2xl font-bold">Rekeys</a>
      </div>
      <div>
        <a href="/storage" className="text-white text-2xl font-bold">Storage</a>
      </div>
    </nav>
  )
}