export enum ApiMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

export interface ApiProps<TRequestBody> {
  method?: ApiMethods,
  path: string,
  data?: TRequestBody,
  cache?: RequestCache,
  revalidate?: number | false
}

export const API_URL: string = 'http://localhost:7000'