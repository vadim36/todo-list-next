import { $apiServer } from "@/shared/http/index"

export async function TasksList() {
  const tasks: any = await $apiServer({ 
    path: '/tasks/bb95f47b-531d-4e24-9833-6a0bdac53b76' 
  }).then((response) => response.data)

  return (
    <>
      <h2 className="font-semibold text-xl">Your tasks:</h2>
      <p>TASKS HERE ====== {JSON.stringify(tasks)}</p>
    </>
  )
}