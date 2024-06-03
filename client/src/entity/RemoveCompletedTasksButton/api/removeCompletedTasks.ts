"use client"

import { $apiClient, ApiMethods } from "@/shared/http";

export async function removeCompletedTasks() {
  const userId: string = (JSON.parse(localStorage.getItem('user')!) as UserDto).userId

  return await $apiClient({path: `/tasks/completed/${userId}`, method: ApiMethods.DELETE})
}