"use client"

import { $apiClient, ApiMethods } from "@/shared/http";
import { IUpdatingData } from "../types";
import { ITask } from "@/entity/Task";

export async function updateTask(updatingTaskData: IUpdatingData):Promise<ITask> {
  return await $apiClient<IUpdatingData, ITask>(
    {path: '/tasks', method: ApiMethods.PUT, data: updatingTaskData}
  ).then((response) => response.data)
}