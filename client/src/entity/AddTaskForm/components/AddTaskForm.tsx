"use client"

import { useState } from "react";
import { AddTaskButton } from "./AddTaskButton";
import { PseudoTask } from "./PseudoTask";

export function AddTaskForm() {
  const [isPseudoTask, setIsPseudoTask] = useState<boolean>(false)
  
  return (
    <div className="mt-2">
      {isPseudoTask 
        ? <PseudoTask setIsPseudoTask={setIsPseudoTask}/> 
        : <AddTaskButton setIsPseudoTask={setIsPseudoTask}/>
      }
    </div>
  )
}