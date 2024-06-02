"use client"

import { $apiClient, ApiMethods } from "@/shared/http";
import { ICreateTask } from "../types";
import { ITask } from "@/entity/Task";

export async function createTask(createTaskData: ICreateTask):Promise<any> {
  return await $apiClient<ICreateTask, ITask>(
    {path: '/tasks', method: ApiMethods.POST, data: createTaskData}
  ).then((response) => response.data)
}