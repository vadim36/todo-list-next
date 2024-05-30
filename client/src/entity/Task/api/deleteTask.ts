"use server"

import { $apiServer, ApiMethods } from "@/shared/http";
import { TaskRequest } from "../types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteTask(taskId: string) {
  const userId = cookies().get('userId')?.value

  await $apiServer<TaskRequest, {}>({ path: `/tasks/${userId}/${taskId}`, method: ApiMethods.DELETE})

  return revalidatePath('/')
}