import { $api } from "@/shared";
import { ISignUpForm } from "../types";

export default async function signUp(data: ISignUpForm) {
  return await $api.post<AuthData>('/auth/signup', {...data})
    .then((response) => response.data)
    .catch((error) => console.log(error))
}