"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { signIn } from "../api/signin";
import { ISignIn } from "../types";
import { SchemaIssue, ValiError, parse, safeParse } from "valibot";
import { SignInSchema } from "../lib/validation";
import { AuthContext, ValidationErrors } from "@/shared";
import { useRouter } from "next/navigation";

const INITIAL_FORM_STATE = {
  email: '',
  password: ''
}

export function SignInForm() {
  const [formData, setFormData] = useState<ISignIn>(INITIAL_FORM_STATE)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const {setIsAuth, setUserDto, isAuth} = useContext(AuthContext)
  const {replace} = useRouter()

  async function formHandler(event: FormEvent) {
    event.preventDefault()

    try {
      setValidationErrors([])
      const signInData = parse(SignInSchema, formData)
      const authPayload = await signIn({...signInData})

      setIsAuth(true)
      setUserDto(authPayload)
      
      localStorage.setItem('token', authPayload.accessToken)
      localStorage.setItem('user', JSON.stringify(authPayload.user))
      
      setFormData(INITIAL_FORM_STATE)
      return window.location.reload()
    } catch (error: unknown) {
      if (error instanceof ValiError) {
        const messages: string[] = safeParse(SignInSchema, formData)
          .issues!.map((issue: SchemaIssue):string => issue.message)

        return setValidationErrors([...messages])
      }
      alert(error as Error)
    }
  }

  return (
    <form 
      onSubmit={formHandler}
      className="border border-black rounded-md self-center p-2 flex flex-col gap-1"
    >
      <strong>Войти {String(isAuth)}</strong>
      <Input type="email" placeholder="Введите email..."
        value={formData.email}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          return setFormData({...formData, email: event.target.value})
        }}
      />
      <Input type="password" placeholder="Введите пароль..."
        value={formData.password}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          return setFormData({...formData, password: event.target.value})
        }}
      />
      <ValidationErrors validationArray={validationErrors}/>
      <Button>Войти</Button>
    </form>
  )
}