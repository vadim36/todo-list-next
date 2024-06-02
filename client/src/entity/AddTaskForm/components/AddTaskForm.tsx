"use client"

import { Dispatch, SetStateAction, useState } from "react";
import { AddTaskButton } from "./AddTaskButton";
import { PseudoTask } from "./PseudoTask";
import { ITask } from "@/entity/Task";

interface Props {
  tasks: ITask[],
  setTasks: Dispatch<SetStateAction<ITask[]>>
}

export function AddTaskForm({ tasks, setTasks }: Props) {
  const [isPseudoTask, setIsPseudoTask] = useState<boolean>(false)
  
  return (
    <div className="mt-2">
      {isPseudoTask 
        ? <PseudoTask setTasks={setTasks} tasks={tasks} setIsPseudoTask={setIsPseudoTask}/> 
        : <AddTaskButton setIsPseudoTask={setIsPseudoTask}/>
      }
    </div>
  )
}