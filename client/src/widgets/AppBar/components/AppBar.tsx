import { NavBar } from "@/entity/NavBar"

export function AppBar() {
  return (
    <header className="flex border border-black py-1 px-2 justify-between">
      <h2 className="font-semibold text-2xl">Trello clone</h2>
      <NavBar/>
    </header>
  )
}