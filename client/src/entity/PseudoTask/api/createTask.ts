"use client"

import { $apiClient, ApiMethods } from "@/shared/http";
import { IRequestingData } from "../types";
import { ITask } from "@/entity/Task";

export async function createTask(createTaskData: IRequestingData):Promise<ITask> {
  return await $apiClient<IRequestingData, ITask>(
    {path: '/tasks', method: ApiMethods.POST, data: createTaskData}
  ).then((response) => response.data)
}