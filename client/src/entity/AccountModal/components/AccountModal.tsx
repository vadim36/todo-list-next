import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AccountInfo } from "./AccountInfo"

export function AccountModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
          <Button size="sm">Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your account</DialogTitle>
          <AccountInfo/>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}