"use client"

import { $apiClient, ApiMethods } from "@/shared/http";
import { TaskRequest } from "../types";

export async function deleteTask(taskId: string) {
  const userId: string = (JSON.parse(localStorage.getItem('user')!) as UserDto).userId

  await $apiClient<TaskRequest, {}>({ path: `/tasks/${userId}/${taskId}`, method: ApiMethods.DELETE})
}