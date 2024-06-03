"use client"

import { Button } from "@/components/ui/button";
import { ITask, Statuses } from "@/entity/Task";
import { Dispatch, SetStateAction } from "react";
import {removeCompletedTasks} from '../api/removeCompletedTasks'

interface Props {
  tasks: ITask[],
  setTasks: Dispatch<SetStateAction<ITask[]>>
}

export function RemoveCompletedTasksButton({ tasks, setTasks }: Props) {
  async function removeTasks() {
    await removeCompletedTasks()
    return setTasks([...tasks].filter((task: ITask) => {
      return task.status !== Statuses.Completed
    }))
  }
  
  return <Button variant='destructive' onClick={removeTasks}>
    Remove all completed tasks
  </Button>
}