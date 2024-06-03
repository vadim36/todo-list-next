"use client"

import { $apiClient, ApiMethods } from "@/shared/http";
import { Statuses, TaskRequest } from "../types";

export async function checkTask(currentStatus: Statuses, taskId: string) {
  const userId: string = (JSON.parse(localStorage.getItem('user')!) as UserDto).userId

  const updatingData: TaskRequest = { 
    status: currentStatus === Statuses.Todo || currentStatus === Statuses.InProgress 
      ? Statuses.Completed : Statuses.Todo,
    userId,
    taskId
  }

  return await $apiClient<TaskRequest, {}>(
    { path: '/tasks', method: ApiMethods.PUT, data: updatingData}
  )
}