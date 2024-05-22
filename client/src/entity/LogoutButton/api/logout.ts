import { $api } from "@/shared";
import { AxiosResponse } from "axios";

export default async function logout():Promise<void | AxiosResponse> {
  return await $api.post('/auth/logout').catch(() => alert('Something went wrong'))
}