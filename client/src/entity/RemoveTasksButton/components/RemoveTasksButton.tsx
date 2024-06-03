"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { ITask } from "@/entity/Task";
import { Dispatch, SetStateAction, useState } from "react";
import { removeTasks } from "../api/removeTasks";

interface Props {
  setTasks: Dispatch<SetStateAction<ITask[]>>
}

export function RemoveTasksButton({setTasks}: Props) {
  const [open, setOpen] = useState<boolean>(false)
  
  async function remove() {
    await removeTasks()
    setTasks([])
    return setOpen(false)
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="mt-2">
        <Button variant="destructive">Remove all tasks</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={remove}>Remove</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}