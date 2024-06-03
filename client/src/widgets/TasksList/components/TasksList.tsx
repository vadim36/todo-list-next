"use client"

import { ITask, Task } from "@/entity/Task"
import { AddTaskForm } from "@/entity/AddTaskForm"
import getTasks from "../api/getTasks"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Loader } from "@/shared"

export function TasksList() {
  const [tasks, setTasks] = useState<ITask[]>([])

  const {isLoading, error, data} = useQuery({
    queryKey: ['todos'],
    queryFn: async() => {
      const response = await getTasks()
      setTasks(response)
      return response
    }
  })

  return (
    <>
      <h2 className="font-semibold text-xl">Your tasks:</h2>
      {isLoading && <Loader/>}
      {error && <h2>Something went wrong...</h2>}
      <ul className="gap-2 flex flex-col">
        {tasks.map((task: ITask) => <Task 
          tasks={tasks}
          setTasks={setTasks}
          key={task.taskId} 
          data={task}/>)}
      </ul>
      <AddTaskForm tasks={tasks} setTasks={setTasks}/>
    </>
  )
}