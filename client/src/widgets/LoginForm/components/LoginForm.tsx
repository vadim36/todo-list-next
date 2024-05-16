"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ChangeEvent, FormEvent, useState } from "react"
import { INITIAL_STATE } from "../consts"
import { ILoginForm } from "../types"
import { PAGES, ValidationErrors, mapValidationErrors } from "@/shared"
import { ValiError, parse } from "valibot"
import { LoginSchema } from "../lib/validation"
import loginUser from "../api/loginUser"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const [formData, setFormData] = useState<ILoginForm>(INITIAL_STATE)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const {replace} = useRouter()

  async function submitHandler(event: FormEvent) {
    event.preventDefault()

    try {
      setValidationErrors([])
      const loginData = parse(LoginSchema, formData)
      const authData = await loginUser(loginData)
      
      localStorage.setItem('user', JSON.stringify(authData.user))
      setFormData(INITIAL_STATE)
      return replace('/')
    } catch (error: unknown) {
      if (error instanceof ValiError) {
        const messages: string[] = mapValidationErrors<ILoginForm>(LoginSchema, formData)
        return setValidationErrors([...messages])
      }
    }
  }

  return (
    <form 
      className="border border-black rounded-md self-center p-2 flex flex-col gap-1"
      onSubmit={submitHandler}
    >
      <strong>Войти</strong>
      <Input 
        value={formData.email}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          return setFormData({...formData, email: event.target.value})
        }}
        type="email" placeholder="Введите email..."/>
      <Input 
        value={formData.password}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          return setFormData({...formData, password: event.target.value})
        }}
        type="password" placeholder="Введите пароль..."/>
      <Button>Войти</Button>
      <ValidationErrors validationArray={validationErrors}/>
      <Button asChild size="sm" className="self-start" variant="outline">
        <Link href={PAGES.SIGN_UP}>Зарегистрироваться</Link>
      </Button>
    </form>
  )
}