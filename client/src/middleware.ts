import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { API_URL, PAGES } from "./shared";

const badGatewayObject: ApiError = {statusCode: 500, message: 'Bad gateway'}

export default async function middleware(request: NextRequest) {
  const {url} = request
  const isAuthPage: boolean = url.includes(PAGES.SIGN_UP) || url.includes(PAGES.LOG_IN)
  const token: string | null = cookies().get('refreshToken')?.value || null
  
  const validateToken: ApiError | UserDto = 
    token 
      ? await fetch(`${API_URL}/tokens/validate/${token}`)
        .then((response: Response) => response.json())
        .catch(():ApiError => {
          return {...badGatewayObject}
        })
      : {...badGatewayObject}

  const isValidToken: boolean = !('statusCode' in validateToken)

  const isAuth: boolean = token !== null && isValidToken

  if (!isAuthPage && !isAuth) {
    return NextResponse.redirect(new URL(PAGES.SIGN_UP, url))
  }

  if (isAuthPage && isAuth) {
    return NextResponse.redirect(new URL(PAGES.HOME, url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next|static|public|favicon.ico).*)'
}