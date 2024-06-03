"use client"

import { ITask } from "@/entity/Task"
import { $apiClient } from "@/shared/http"

export default async function getTasks():Promise<ITask[]> {
  const userId: string = (JSON.parse(localStorage.getItem('user')!) as UserDto).userId

  return await $apiClient<{}, ITask[]>({ 
    path: `/tasks/${userId}`
  }).then((response) => response.data)
}