"use client"

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setIsPseudoTask: Dispatch<SetStateAction<boolean>>
}

export function AddTaskButton({setIsPseudoTask}: Props) {
  return (
    <Label className="flex items-center gap-2 text-lg">
      <Button size="icon" className="rounded-full" variant="outline" 
        onClick={() => setIsPseudoTask(true)}
      >
        <Plus/>
      </Button>
      Add a task
    </Label>
  )
}