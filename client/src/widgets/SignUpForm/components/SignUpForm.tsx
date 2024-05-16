"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ChangeEvent, FormEvent, useState } from "react"
import { INITIAL_STATE } from "../consts"
import { ISignUpForm } from "../types"
import { PAGES, ValidationErrors, mapValidationErrors } from "@/shared"
import { ValiError, parse } from "valibot"
import { SignUpSchema } from "../lib/validation"
import signUpUser from "../api/signUpUser"
import { useRouter } from "next/navigation"

export function SignUpForm() {
  const [formData, setFormData] = useState<ISignUpForm>(INITIAL_STATE)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const {replace} = useRouter()

  async function submitHandler(event: FormEvent) {
    event.preventDefault()

    try {
      setValidationErrors([])
      const {repeatedPassword, ...signUpData} = parse(SignUpSchema, formData)
      const authData = await signUpUser(signUpData)
      
      localStorage.setItem('user', JSON.stringify(authData.user))
      setFormData(INITIAL_STATE)
      return replace('/')
    } catch (error: unknown) {
      if (error instanceof ValiError) {
        const messages: string[] = mapValidationErrors<ISignUpForm>(SignUpSchema, formData)
        return setValidationErrors([...messages])
      }
    }
  }

  return (
    <form 
      className="border border-black rounded-md self-center p-2 flex flex-col gap-1"
      onSubmit={submitHandler}
    >
      <strong>Зарегистрироваться</strong>
      <Input 
        value={formData.name}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          return setFormData({...formData, name: event.target.value})
        }}
        placeholder="Введите имя..."/>
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
      <Input 
        value={formData.repeatedPassword}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          return setFormData({...formData, repeatedPassword: event.target.value})
        }}
        type="password" placeholder="Повторите пароль..."/>
      <Button>Создать аккаунт</Button>
      <ValidationErrors validationArray={validationErrors}/>
      <strong className="text-sm inline">Уже есть аккаунт?</strong>
      <Button asChild size="sm" className="self-start" variant="outline">
        <Link href={PAGES.LOG_IN}>Войти</Link>
      </Button>
    </form>
  )
}