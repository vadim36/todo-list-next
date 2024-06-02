"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { ITask, Statuses } from "../types"
import { checkTask } from "../api/checkTask"
import { Button } from "@/components/ui/button"
import { Trash } from 'lucide-react';
import { deleteTask } from "../api/deleteTask"
import { Pen } from 'lucide-react';
import { Dispatch, SetStateAction } from "react"

interface Props {
  data: ITask,
  setTasks: Dispatch<SetStateAction<ITask[]>>,
  tasks: ITask[]
}

export function Task({ data, setTasks, tasks }: Props) {
  const {name, body, status, taskId} = data

  async function removeTask() {
    await deleteTask(taskId)
    return setTasks(tasks.filter((task: ITask) => task.taskId !== taskId))
  }

  return (
    <li className="border border-black p-1 rounded-md flex items-center gap-4 px-4">
      <Checkbox className="self-center size-6" onClick={() => checkTask(status, taskId)}
        defaultChecked={status === Statuses.Completed}/>
      <article className="flex items-center flex-1 gap-2">
        <div className="flex-1">
          <strong className="text-lg">{name}</strong>
          <p className="text-slate-700">{body}</p>
        </div>
        <Button variant="outline" size="icon" onClick={() => undefined}>
          <Pen/>
        </Button>
        <Button variant="destructive" size="icon" onClick={removeTask}>
          <Trash/>
        </Button>
      </article>
    </li>
  )
}