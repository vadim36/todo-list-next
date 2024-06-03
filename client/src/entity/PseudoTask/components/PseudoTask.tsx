"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import {createTask} from '../api/createTask'
import {updateTask} from '../api/updateTask'
import type { IPseudoTask } from "../types";
import { TaskSchema } from "../lib/validation";
import { ValiError, parse } from "valibot";
import { ValidationErrors } from "@/shared";
import { ITask } from "@/entity/Task";
import { PseudoTaskMethods } from "../lib/helpers";

interface Props {
  setIsPseudoTask: Dispatch<SetStateAction<boolean>>,
  setTasks: Dispatch<SetStateAction<ITask[]>>,
  tasks: ITask[],
  method?: PseudoTaskMethods,
  taskData?: Omit<ITask, 'status'>
}

export function PseudoTask({
  setIsPseudoTask, 
  setTasks, 
  tasks,
  method = PseudoTaskMethods.CREATE,
  taskData = { name: '', body: '', taskId: '' }
}: Props) {
  const user: UserDto = JSON.parse(localStorage.getItem('user')!)
  const {userId} = user
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const {name, body, taskId} = taskData
  const INITIAL_STATE: IPseudoTask = { name, body }
  const [formData, setFormData] = useState<IPseudoTask>(INITIAL_STATE)

  function cancelTask(event: FormEvent) {
    event.preventDefault()
    return setIsPseudoTask(false)
  }

  async function update(event: FormEvent) {
    event.preventDefault()
    const updatingTaskData = validateForm()
    if (!updatingTaskData) return

    const updatedTask = await updateTask({...updatingTaskData, userId, taskId})

    setIsPseudoTask(false) 

    return setTasks(tasks.map((task: ITask) => {
      if (task.taskId !== taskId) return task
      return updatedTask
    }))
  }

  async function create(event: FormEvent) {
    event.preventDefault()
    const createTaskData = validateForm()
    if (!createTaskData) return
    const newTask = await createTask({...createTaskData, userId})
    setIsPseudoTask(false)
    return setTasks([...tasks, {...newTask}])
  }

  function validateForm():IPseudoTask | void {
    try {
      setValidationErrors([])
      return parse(TaskSchema, formData)
    } catch (error) {
      if (error instanceof ValiError) {
        return setValidationErrors([error.message])
      }
      return console.log(error)
    }
  }

  return (
    <form className="border border-black p-1 rounded-md flex flex-col items-start gap-2">
      <Input placeholder="Task name..." onChange={(event: ChangeEvent<HTMLInputElement>) => {
        return setFormData({...formData, name: event.target.value})
      }} value={formData.name}/>
      <Input placeholder="Task body...(optional)" onChange={(event: ChangeEvent<HTMLInputElement>) => {
        return setFormData({...formData, body: event.target.value || ''})
      }} value={formData.body}/>
      <ValidationErrors validationArray={validationErrors}/>
      <div className="flex gap-1">
        <Button variant="outline" onClick={cancelTask}>Cancel</Button>
        {method === PseudoTaskMethods.CREATE && <Button onClick={create}>Create</Button>}
        {method === PseudoTaskMethods.UPDATE && <Button onClick={update}>Update</Button>}
      </div>
    </form>
  )
}