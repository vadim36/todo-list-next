export enum ApiMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

export interface ApiProps<T> {
  method?: ApiMethods,
  path: string,
  data?: T
}

export const API_URL: string = 'http://localhost:7000'