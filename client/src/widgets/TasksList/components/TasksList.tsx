import { $apiServer } from "@/shared/http/index"
import { ITask, Task } from "@/entity/Task"
import { cookies } from "next/headers"

export async function TasksList() {
  const userId = cookies().get('userId')?.value
  const tasks = await $apiServer<{}, ITask[]>({ 
    path: `/tasks/${userId}`
  }).then((response) => response.data)

  return (
    <>
      <h2 className="font-semibold text-xl">Your tasks:</h2>
      <ul>{tasks.map((task: ITask) => <Task data={task}/>)}</ul>
    </>
  )
}