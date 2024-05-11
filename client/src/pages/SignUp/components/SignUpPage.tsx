"use client"

import { Button } from "@/components/ui/button"
import { AuthContext } from "@/shared"
import { SignUpForm } from "@/widgets/SignUpForm"
import { useRouter } from "next/navigation"
import { useContext } from "react"

export function SignUpPage() {
  const {back} = useRouter()
  const {isAuth} = useContext(AuthContext)

  return (
    <div className="p-2 flex flex-col gap-2">
      {isAuth && <Button size="sm" className="self-start" onClick={back}>Назад</Button>}
      <SignUpForm/>
    </div>
  )
}