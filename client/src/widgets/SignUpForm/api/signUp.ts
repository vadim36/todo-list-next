import { $apiClient, ApiMethods } from "@/shared/http";
import { ISignUpForm } from "../types";

export default async function signUp(data: ISignUpForm):Promise<AuthData> {
  return await $apiClient<ISignUpForm, AuthData>({ 
    path: '/auth/signin', method: ApiMethods.POST, data
  }).then((response) => response.data)
}