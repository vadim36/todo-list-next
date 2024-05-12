"use client"

import { Button } from "@/components/ui/button"
import { AuthContext } from "@/shared"
import { useRouter } from "next/navigation"
import { useContext } from "react"

export function AccountPage() {
  const {userDto} = useContext(AuthContext)
  const {back} = useRouter()
  const {name, email} = userDto.user

  return (
    <div className="px-2 py-1">
      <Button size="sm" onClick={back}>Назад</Button>
      <h1 className="font-semibold text-2xl">Ваш аккаунт</h1>
      <dl>
        <dt className="font-semibold text-lg">Имя:</dt>
        <dd>{name}</dd>
        <dt className="font-semibold text-lg">Email:</dt>
        <dd>{email}</dd>
      </dl>
    </div>
  )
}