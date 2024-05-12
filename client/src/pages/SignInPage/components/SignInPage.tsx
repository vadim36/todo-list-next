"use client"

import { Button } from "@/components/ui/button"
import { SignInForm } from "@/widgets/SignInForm"
import { useRouter } from "next/navigation"

export function SignInPage() {
  const {back} = useRouter()

  return (
    <div className="p-2 flex flex-col gap-2">
      <Button size="sm" className="self-start" onClick={back}>Назад</Button>
      <SignInForm/>
    </div>
  )
}