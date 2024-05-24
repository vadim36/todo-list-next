import {$apiClient} from "@/shared/http";
import { ISignInForm } from "../types";
import { ApiMethods } from "@/shared/http/helpers";

export default async function signIn(signInData: ISignInForm):Promise<AuthData> {
  return await $apiClient<ISignInForm, AuthData>({ 
    path: '/auth/signin', method: ApiMethods.POST, data: signInData 
  }).then((response) => response.data)
}