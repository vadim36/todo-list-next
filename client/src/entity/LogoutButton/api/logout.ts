import { $apiClient, ApiMethods } from "@/shared/http";

export default async function logout() {
  return await $apiClient({ path: '/auth/logout', method: ApiMethods.POST})
}