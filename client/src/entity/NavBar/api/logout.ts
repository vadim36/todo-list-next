import { $api } from "@/shared"

export async function logout():Promise<void> {
  try {
    const authPayload: IAuthPayload = JSON.parse(localStorage.getItem('user')!)
    return await $api.post('/auth/logout', { userId: authPayload.user.userId })
  } catch (error: unknown) {
    console.log(error)
    alert(error as Error)
  }
}