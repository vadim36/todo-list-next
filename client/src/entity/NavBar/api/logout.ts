import { $api } from "@/shared"

export async function logout():Promise<void> {
  try {
    const user: IUserPayload = JSON.parse(localStorage.getItem('user')!)
    return await $api.post('/auth/logout', { userId: user.userId })
  } catch (error: unknown) {
    alert(error as Error)
  }
}