import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { API_URL, PAGES } from "./shared";

export default async function middleware(request: NextRequest) {
  const {url} = request
  const isAuthPage: boolean = url.includes(PAGES.SIGN_UP) || url.includes(PAGES.LOG_IN)
  const token: string | null = cookies().get('refreshToken')?.value || null
  
  const validateToken: ApiError | UserDto = 
    await fetch(`${API_URL}/tokens/validate/${token}`)
      .then((response: Response) => response.json())
  const isValidToken: boolean = !('statusCode' in validateToken)

  const isAuth: boolean = token !== null && isValidToken

  if (!isAuthPage && !isAuth) {
    return NextResponse.redirect(new URL(PAGES.SIGN_UP, url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next|static|public|favicon.ico).*)'
}