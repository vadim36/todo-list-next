"use client"

import axios, { AxiosError, AxiosHeaders, AxiosResponse } from "axios";
import { API_URL, ApiMethods, ApiProps } from "./helpers";

export async function $apiClient<TRequestBody, TResponse>({
  method = ApiMethods.GET,
  path,
  data
}: ApiProps<TRequestBody>):Promise<AxiosResponse<TResponse>> {
  const url: string = `${API_URL}${path}`
  const authHeaders = new AxiosHeaders({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  })

  switch (method) {
    case ApiMethods.POST:
      return await axios.post(url, {...data || {}}, { 
        withCredentials: true,
        headers: authHeaders
      }).catch(handleError<TResponse>)
    case ApiMethods.PUT:
      return await axios.put(url, {...data || {}}, { 
        withCredentials: true,
        headers: authHeaders
      }).catch(handleError<TResponse>)
    case ApiMethods.DELETE:
      return await axios.delete(url, { 
        withCredentials: true,
        headers: authHeaders
      }).catch(handleError<TResponse>)  
    default:
      return await axios.get(url, { 
        withCredentials: true,
        headers: authHeaders
      }).catch(handleError<TResponse>)
  }
}

async function handleError<TResponse>(error: AxiosError):Promise<AxiosResponse<TResponse>> {
  const originalRequest: any = error.config
        
  if (error.response?.status === 401 && originalRequest && !originalRequest._isRetry) {
    originalRequest._isRetry = true
    try {
      await axios.post(`${API_URL}/auth/refresh`, {
        refreshToken: localStorage.getItem('refreshToken')
      }, { withCredentials: true })
    
      originalRequest.headers!.Authorization = localStorage.getItem('accessToken')
      return axios.request(originalRequest!)
    } catch {
      console.log('Do not auth')
    }
  }

  throw error
}