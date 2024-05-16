import { $api } from "@/shared";
import { ISignUpForm } from "../types";

export default async function signUpUser(data: ISignUpForm):Promise<AuthData> {
  return await $api.post<AuthData>('/auth/signup', {...data})
    .then((response) => response.data)
}