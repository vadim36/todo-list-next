"use client"

import { Button } from "@/components/ui/button";
import logout from "../api/logout";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const {replace} = useRouter()
  
  return <Button onClick={async () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')

    await logout()
    return await replace('/signup')
  }} size="sm">Log out</Button>
}