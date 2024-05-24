import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/entity/LogoutButton";

export function AppBar() {
  return (
    <header className="border border-black px-2 py-1 flex justify-between items-baseline">
      <h2 className="font-semibold text-lg">AppBar</h2>
      <nav className="flex gap-2">
        <Button size='sm'>Аккаунт</Button>
        <LogoutButton/>
      </nav>
    </header>
  )
}