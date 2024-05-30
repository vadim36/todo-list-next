"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { ITask, Statuses } from "../types"
import { checkTask } from "../api/checkTask"
import { Button } from "@/components/ui/button"
import { Trash } from 'lucide-react';
import { deleteTask } from "../api/deleteTask"
import { Pen } from 'lucide-react';

interface Props {
  data: ITask
}

export function Task({ data }: Props) {
  const {name, body, status, taskId} = data

  return (
    <li className="border border-black p-1 rounded-md flex items-center gap-4 px-4">
      <Checkbox className="self-center size-6" onClick={() => checkTask(status, taskId)}
        defaultChecked={status === Statuses.Completed}/>
      <div className="flex-1">
        <strong className="text-lg">{name}</strong>
        <p className="text-slate-700">{body}</p>
      </div>
      <Button variant="outline" size="icon" onClick={() => undefined}>
        <Pen/>
      </Button>
      <Button variant="destructive" size="icon" onClick={() => deleteTask(taskId)}>
        <Trash/>
      </Button>
    </li>
  )
}