"use client"

import { Button } from "@/components/ui/button"
import { AuthContext } from "@/shared"
import { useContext } from "react"
import Link from "next/link"
import { logout } from "../api/logout"

export function NavBar() {
  const {isAuth, setIsAuth, setUserDto} = useContext(AuthContext)

  async function logoutHandler() {
    await logout()
    setIsAuth(false)
    setUserDto(false)
    localStorage.removeItem('token')
    return localStorage.removeItem('user')
  }

  return (
    <nav className="flex gap-2">
      {isAuth 
        ? <>
            <Button size="sm" asChild>
              <Link href="/account">Ваш аккаунт</Link>
            </Button>
            <Button size="sm" onClick={logoutHandler}>Выйти</Button>
        </> 
        : <>
            <Button size="sm" onClick={() => setIsAuth(true)}>Войти</Button>
            <Button size="sm" asChild>
              <Link href="/signup">Зарегистрироваться</Link>
            </Button>
        </>
      }
    </nav>
  )
}