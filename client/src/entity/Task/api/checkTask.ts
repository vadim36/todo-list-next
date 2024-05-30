"use server"

import { $apiServer, ApiMethods } from "@/shared/http";
import { Statuses, TaskRequest } from "../types";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function checkTask(currentStatus: Statuses, taskId: string) {
  const updatingData: TaskRequest = { 
    status: currentStatus === Statuses.Todo || currentStatus === Statuses.InProgress 
      ? Statuses.Completed : Statuses.Todo,
    userId: cookies().get('userId')?.value!,
    taskId
  }

  await $apiServer<TaskRequest, {}>(
    { path: '/tasks', method: ApiMethods.PUT, data: updatingData}
  )

  return revalidatePath('/')
}