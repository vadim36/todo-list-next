"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import {createTask} from '../api/createTask'
import { ICreateTask } from "../types";
import { CreateTaskSchema } from "../lib/validation";
import { ValiError, parse } from "valibot";
import { ValidationErrors } from "@/shared";
import { ITask } from "@/entity/Task";

interface Props {
  setIsPseudoTask: Dispatch<SetStateAction<boolean>>,
  setTasks: Dispatch<SetStateAction<ITask[]>>,
  tasks: ITask[]
}

const INITIAL_STATE: Omit<ICreateTask, 'userId'> = {
  name: '',
  body: ''
}

export function PseudoTask({setIsPseudoTask, setTasks, tasks}: Props) {
  const [formData, setFormData] = useState<Omit<ICreateTask, 'userId'>>(INITIAL_STATE)
  const user: UserDto = JSON.parse(localStorage.getItem('user')!)
  const {userId} = user
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  function cancelTask(event: FormEvent) {
    event.preventDefault()
    return setIsPseudoTask(false)
  }

  async function create(event: FormEvent) {
    event.preventDefault()
    const createTaskData = validateForm()
    if (!createTaskData) return
    const newTask = await createTask({...createTaskData, userId})
    setIsPseudoTask(false) 
    return setTasks([...tasks, {...newTask}])
  }

  function validateForm():Omit<ICreateTask, 'userId'> | void {
    try {
      setValidationErrors([])
      return parse(CreateTaskSchema, formData)
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
      }}/>
      <Input placeholder="Task body...(optional)" onChange={(event: ChangeEvent<HTMLInputElement>) => {
        return setFormData({...formData, body: event.target.value || ''})
      }}/>
      <ValidationErrors validationArray={validationErrors}/>
      <div className="flex gap-1">
        <Button variant="outline" onClick={cancelTask}>Отмена</Button>
        <Button onClick={create}>Создать</Button>
      </div>
    </form>
  )
}