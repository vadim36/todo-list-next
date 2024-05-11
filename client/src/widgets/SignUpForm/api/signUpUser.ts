import { TSignUp } from "../types";
import { $api } from "@/shared";

export default async function signUpUser(userDto: TSignUp):Promise<IAuthPayload> {
  return await $api.post<IAuthPayload>('/auth/signup', {...userDto})
    .then(response => response.data)
}