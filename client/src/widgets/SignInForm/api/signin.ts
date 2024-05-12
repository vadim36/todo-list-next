import { $api } from "@/shared";
import { ISignIn } from "../types";

export async function signIn(formData: ISignIn):Promise<IAuthPayload> {
  const response = await $api.post('/auth/signin', {...formData})
  return response.data
}