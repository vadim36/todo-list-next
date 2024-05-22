import { $api } from "@/shared";
import { ISignInForm } from "../types";

export default async function signIn(data: ISignInForm) {
  return await $api.post<AuthData>('/auth/signin', {...data})
    .then((response) => response.data)
    .catch((error) => console.log(error))
}