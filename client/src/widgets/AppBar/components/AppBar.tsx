import { AccountModal } from "@/entity/AccountModal";
import { LogoutButton } from "@/entity/LogoutButton";

export function AppBar() {
  return (
    <header className="border border-black p-2 flex justify-between items-baseline">
      <h2 className="font-semibold text-2xl" role="heading">Todo App</h2>
      <nav className="flex gap-2">
        <AccountModal/>
        <LogoutButton/>
      </nav>
    </header>
  )
}