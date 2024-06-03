"use client"

import { $apiClient, ApiMethods } from "@/shared/http";

export async function removeTasks() {
  const userId: string = (JSON.parse(localStorage.getItem('user')!) as UserDto).userId

  return await $apiClient({path: `/tasks/${userId}`, method: ApiMethods.DELETE})
}