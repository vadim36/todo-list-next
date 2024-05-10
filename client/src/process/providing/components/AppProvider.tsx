"use client"
import { AuthContext } from "@/shared/lib/context"
import { ReactNode, useState } from "react"

interface props {
  children: ReactNode
}

export function AppProvider({ children }: props) {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  
  return (
    <AuthContext.Provider value={{
      isAuth, setIsAuth, userDto: {}
    }}>
      {children}
    </AuthContext.Provider>
  )
}