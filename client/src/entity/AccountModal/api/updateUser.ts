import { $apiClient, ApiMethods } from "@/shared/http";
import { IUpdatingRequest } from "../types";

export default async function updateUser(data: IUpdatingRequest):Promise<UserDto> {
  return await $apiClient<IUpdatingRequest, UserDto>({
    path: '/users', method: ApiMethods.PUT, data 
  }).then((response) => {return response.data})
}