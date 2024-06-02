"use server"

import { cookies } from "next/headers"
import { $apiServer, ApiMethods } from "../http"

export async function refreshTokens():Promise<boolean>  {
  return await $apiServer({
    path: '/auth/refresh',
    data: { refreshToken: cookies().get('refreshToken')?.value },
    method: ApiMethods.POST
  }).then(() => true).catch(() => false)
}