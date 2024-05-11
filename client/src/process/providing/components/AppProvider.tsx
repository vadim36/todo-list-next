"use client"
import { AuthContext, INITIAL_USER_STATE } from "@/shared"
import { ReactNode, useEffect, useState } from "react"
import checkIsAuth from "../lib/checkIsAuth"
import { SignUpPage } from "@/pages/SignUp"
import { usePathname } from "next/navigation"

interface props {
  children: ReactNode
}

export function AppProvider({ children }: props) {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [userDto, setUserDto] = useState<IAuthPayload>(INITIAL_USER_STATE)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const pathname = usePathname()

  useEffect(() => {
    console.log(123)
    checkIsAuth(setIsAuth, setUserDto)
    setIsLoading(false)
  }, [])

  if (isLoading) return <h1>Loading</h1>
  if (!isLoading && !isAuth && pathname !== '/signin') return <SignUpPage/>

  return (
    <AuthContext.Provider value={{
      isAuth, setIsAuth, userDto, setUserDto, isLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}