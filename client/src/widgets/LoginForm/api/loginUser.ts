import { $api } from "@/shared";
import { ILoginForm } from "../types";

export default async function loginUser(data: ILoginForm):Promise<AuthData> {
  return await $api.post<AuthData>('/auth/signin', {...data})
    .then((response) => response.data)
}