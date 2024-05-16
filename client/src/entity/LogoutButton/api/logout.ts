import { $api } from "@/shared";
import { AxiosResponse } from "axios";

export default async function logout():Promise<void | AxiosResponse> {
  const user: UserDto = JSON.parse(localStorage.getItem('user')!) || {
    userId: '',
    name: '',
    email: ''
  }
  
  return await $api.post('/auth/logout', { userId: user.userId })
    .catch(() => alert('Something went wrong'))
}