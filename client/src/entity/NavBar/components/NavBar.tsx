"use client"

import { Button } from "@/components/ui/button"
import { AuthContext, INITIAL_USER_STATE } from "@/shared"
import { useContext } from "react"
import Link from "next/link"
import { logout } from "../api/logout"

export function NavBar() {
  const {setIsAuth, setUserDto} = useContext(AuthContext)

  async function logoutHandler() {
    await logout()
    setIsAuth(false)
    setUserDto(INITIAL_USER_STATE)
    localStorage.removeItem('token')
    return localStorage.removeItem('user')
  }

  return (
    <nav className="flex gap-2">
      <Button size="sm" asChild>
        <Link href="/account">Ваш аккаунт</Link>
      </Button>
      <Button size="sm" onClick={logoutHandler}>Выйти</Button>
    </nav>
  )
}