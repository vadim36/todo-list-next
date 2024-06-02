import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import {PAGES, checkNetwork} from './shared'
import {validateAccessToken} from "./shared"
import { refreshTokens } from "./shared"

export default async function middleware(request: NextRequest) {
  const {url} = request

  const isNetwork: boolean = await checkNetwork()
  const isNetworkPage: boolean = url.includes(PAGES.BAD_NETWORK)

  if (!isNetwork && !isNetworkPage) {
    return NextResponse.redirect(new URL(PAGES.BAD_NETWORK, url))
  }

  if (!isNetwork && isNetworkPage) return NextResponse.next()

  const isAuthPage: boolean = url.includes(PAGES.SIGN_UP) || url.includes(PAGES.SIGN_IN)
  const accessToken: string | null = cookies().get('accessToken')?.value || null
  const isTokenValid = await validateAccessToken(accessToken)
  
  if (!isTokenValid) { 
    const isRefreshTokenValid = await refreshTokens()
    if (isRefreshTokenValid) return NextResponse.next()
  }    

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