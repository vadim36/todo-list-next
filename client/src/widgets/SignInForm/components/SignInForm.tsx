"use client"

import { Input } from "@/components/ui/input"
import { ChangeEvent, FormEvent, useState } from "react"
import { INITIAL_STATE } from "../consts"
import { Button } from "@/components/ui/button"
import { ValidationErrors, mapValidationErrors } from "@/shared"
import {ISignInForm} from '../types'
import { ValiError, parse } from "valibot"
import { SignInSchema } from "../lib/validation"
import signIn from "../api/signIn"
import { useRouter } from "next/navigation"

export function SignInForm() {
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const {replace} = useRouter()

  async function submitHandler(event: FormEvent) {
    event.preventDefault()
    const signInData = validateForm()
    if (!signInData) return

    const authData = await signIn(signInData)
    localStorage.setItem('accessToken', authData!.accessToken)
    localStorage.setItem('refreshToken', authData!.refreshToken)

    setFormData(INITIAL_STATE)
    return replace('/')
  }

  function validateForm():ISignInForm | void {
    try {
      setValidationErrors([])
      return parse(SignInSchema, formData)
    } catch (error: unknown) {
      if (error instanceof ValiError) {
        const messages: string[] = mapValidationErrors<ISignInForm>(SignInSchema, formData)
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
    </form>
  )
}