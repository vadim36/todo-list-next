"use client"
import { AuthContext, INITIAL_USER_STATE } from "@/shared"
import { ReactNode, useEffect, useState } from "react"
import checkIsAuth from "../lib/checkIsAuth"
import { SignUpPage } from "@/pages/SignUp"
import { usePathname, useRouter } from "next/navigation"

interface props {
  children: ReactNode
}

export function AppProvider({ children }: props) {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [userDto, setUserDto] = useState<IAuthPayload>(INITIAL_USER_STATE)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const pathname = usePathname()
  const {replace} = useRouter()

  useEffect(() => {
    checkIsAuth(setIsAuth, setUserDto)
    setIsLoading(false)
  }, [])

  if (isLoading) return <h1>Loading</h1>
  if (!isLoading && !isAuth && pathname !== '/signin') return <SignUpPage/>
  if (!isLoading && isAuth && pathname === '/signin' || pathname === '/signup') {
    return replace('/')
  }

  return (
    <AuthContext.Provider value={{
      isAuth, setIsAuth, userDto, setUserDto, isLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}