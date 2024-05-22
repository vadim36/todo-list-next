import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import {PAGES} from './shared'
import {validateAccessToken} from "./shared"

export default async function middleware(request: NextRequest) {
  const {url} = request
  const isAuthPage: boolean = url.includes(PAGES.SIGN_UP) || url.includes(PAGES.SIGN_IN)
  const accessToken: string | null = cookies().get('accessToken')?.value || null
  const isTokenValid = await validateAccessToken(accessToken)

  if (!isAuthPage && !isTokenValid) {
    return NextResponse.redirect(new URL(PAGES.SIGN_UP, url))
  }

  if (isAuthPage && isTokenValid) {
    return NextResponse.redirect(new URL(PAGES.HOME, url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next|static|public|favicon.ico).*)'
}