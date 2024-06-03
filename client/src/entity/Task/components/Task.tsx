"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { ITask, Statuses } from "../types"
import { checkTask } from "../api/checkTask"
import { Button } from "@/components/ui/button"
import { Trash } from 'lucide-react';
import { deleteTask } from "../api/deleteTask"
import { Pen } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from "react"
import { PseudoTask, PseudoTaskMethods } from "@/entity/PseudoTask"

interface Props {
  data: ITask,
  setTasks: Dispatch<SetStateAction<ITask[]>>,
  tasks: ITask[]
}

export function Task({ data, setTasks, tasks }: Props) {
  const {name, body, status, taskId} = data
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const isChecked: boolean = status === Statuses.Completed

  async function removeTask() {
    await deleteTask(taskId)
    return setTasks(tasks.filter((task: ITask) => task.taskId !== taskId))
  }

  if (isEditMode) {
    return <PseudoTask 
      setIsPseudoTask={setIsEditMode}
      setTasks={setTasks}
      tasks={tasks}
      method={PseudoTaskMethods.UPDATE}
      taskData={data}
    />
  }

  async function check() {
    await checkTask(status, taskId)
    return setTasks([...tasks].map((task: ITask) => {
      if (task.taskId !== taskId) return task
      return {...task, status: isChecked ? Statuses.Todo : Statuses.Completed}
    }))
  }

  return (
    <li className="border border-black p-1 rounded-md flex items-center gap-4 px-4">
      <Checkbox className="self-center size-6" onClick={check}
        defaultChecked={isChecked}/>
      <article className="flex items-center flex-1 gap-2">
        <div className="flex-1">
          <strong className="text-lg">{name}</strong>
          <p className="text-slate-700">{body}</p>
        </div>
        <Button variant="outline" size="icon" onClick={() => setIsEditMode(true)}>
          <Pen/>
        </Button>
        <Button variant="destructive" size="icon" onClick={removeTask}>
          <Trash/>
        </Button>
      </article>
    </li>
  )
}