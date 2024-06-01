"use server"

import { $apiServer, ApiMethods } from "@/shared/http";
import { ICreateTask } from "../types";
import { ITask } from "@/entity/Task";
import { revalidatePath } from "next/cache";

export async function createTask(createTaskData: ICreateTask):Promise<any> {
  await $apiServer<ICreateTask, ITask>(
    {path: '/tasks', method: ApiMethods.POST, data: createTaskData}
  )

  return revalidatePath('/')
}