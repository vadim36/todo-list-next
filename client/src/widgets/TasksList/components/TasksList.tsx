import { $apiServer } from "@/shared/http/index"
import { ITask, Task } from "@/entity/Task"
import { cookies } from "next/headers"
import { AddTaskForm } from "@/entity/AddTaskForm"

export async function TasksList() {
  const userId = cookies().get('userId')?.value
  const tasks = await $apiServer<{}, ITask[]>({ 
    path: `/tasks/${userId}`
  }).then((response) => response.data)

  return (
    <>
      <h2 className="font-semibold text-xl">Your tasks:</h2>
      <ul className="gap-2 flex flex-col">
        {tasks.map((task: ITask) => <Task key={task.taskId} data={task}/>)}
      </ul>
      <AddTaskForm/>
    </>
  )
}