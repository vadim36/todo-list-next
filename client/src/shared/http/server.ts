"use server"

import axios, { AxiosError, AxiosHeaders, AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { API_URL, ApiMethods, ApiProps } from "./helpers";

export async function $apiServer<T, R>({
  method = ApiMethods.GET,
  path,
  data
}: ApiProps<T>):Promise<AxiosResponse<R>> {
  const url: string = `${API_URL}${path}`
  const authHeaders = new AxiosHeaders({
    Authorization: `Bearer ${cookies().get('accessToken')?.value}`
  })

  switch (method) {
    case ApiMethods.POST:
      return await axios.post(url, {...data || {}}, { 
        withCredentials: true,
        headers: authHeaders
      }).catch(handleError<R>)
    case ApiMethods.PUT:
      return await axios.put(url, {...data || {}}, { 
        withCredentials: true,
        headers: authHeaders
      }).catch(handleError<R>)
    case ApiMethods.DELETE:
      return await axios.delete(url, { 
        withCredentials: true,
        headers: authHeaders
      }).catch(handleError<R>)      
    default:
      return await axios.get(url, { 
        withCredentials: true,
        headers: authHeaders
      }).catch(handleError<R>)
  }
}

async function handleError<T>(error: AxiosError):Promise<AxiosResponse<T>> {
  const originalRequest: any = error.config
        
  if (error.response?.status === 401 && originalRequest && !originalRequest._isRetry) {
    originalRequest._isRetry = true
    try {
      await axios.post(`${API_URL}/auth/refresh`, {
        refreshToken: cookies().get('refreshToken')?.value
      }, { withCredentials: true })
    
      originalRequest.headers!.Authorization = cookies().get('accessToken')?.value!
      return axios.request(originalRequest!)
    } catch {
      console.log('Do not auth')
    }
  }

  throw error
}