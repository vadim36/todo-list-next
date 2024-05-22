import { $api } from "@/shared";
import { ISignInForm } from "../types";

export default async function signIn(data: ISignInForm) {
  try {
    return await $api.post<AuthData>('/auth/signin', {...data})
      .then((response) => response.data)
  } catch (error: unknown) {
    alert(error)
  }
}