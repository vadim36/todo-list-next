"use client"

import { ITask, Task } from "@/entity/Task"
import { AddTaskForm } from "@/entity/AddTaskForm"
import getTasks from "../api/getTasks"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Loader } from "@/shared"
import { RemoveCompletedTasksButton } from "@/entity/RemoveCompletedTasksButton"
import { RemoveTasksButton } from "@/entity/RemoveTasksButton"

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

  const isTasks = Boolean(tasks.length && !isLoading)

  return (
    <>
      <div className="flex justify-between p-2 items-center">
        <h2 className="font-semibold text-2xl">
          {isTasks
            ? 'Your tasks:'
            : 'You do not have any tasks yet'
          }
        </h2>
        {isTasks && <RemoveCompletedTasksButton setTasks={setTasks} tasks={tasks}/>}
      </div>
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
      {isTasks && <RemoveTasksButton setTasks={setTasks}/>}
    </>
  )
}