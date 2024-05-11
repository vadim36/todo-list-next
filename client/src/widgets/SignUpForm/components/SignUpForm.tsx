"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, useState, useContext } from "react";
import { TSignUp } from "../types";
import { AuthContext, ValidationErrors } from "@/shared";
import { useRouter } from "next/navigation";
import { SchemaIssue, ValiError, parse, safeParse } from "valibot";
import { SignUpSchema } from "../lib/validation";
import signUpUser from "../api/signUpUser";
import Link from "next/link";

const INITIAL_STATE:TSignUp = {
  name: '',
  email: '',
  password: '',
  repeatedPassword: ''
}

export function SignUpForm() {
  const [formData, setFormData] = useState<TSignUp>(INITIAL_STATE)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const {setIsAuth} = useContext(AuthContext)
  const {replace} = useRouter()

  async function submitHandler(event: FormEvent):Promise<void> {
    event.preventDefault()
  
    try {
      setValidationErrors([])
      const {repeatedPassword, ...signUpData} = parse(SignUpSchema, formData)
      const authData: IAuthPayload = await signUpUser(signUpData)
  
      localStorage.setItem('user', JSON.stringify(authData.user))
      localStorage.setItem('token', authData.accessToken)
      
      setIsAuth(true)
      setFormData(INITIAL_STATE)

      replace('/')
      return window.location.reload()
    } catch (error: unknown) {
      if (error instanceof ValiError) {
        const messages: string[] = safeParse(SignUpSchema, formData)
          .issues!.map((issue: SchemaIssue):string => issue.message)

        return setValidationErrors([...messages])
      }

      return alert(error as Error)
    }
  }

  return (
    <form
      onSubmit={submitHandler}
      className="border border-black rounded-md self-center p-2 flex flex-col gap-1"
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
        <Link href="/signin">Войти</Link>
      </Button>
    </form>
  )
}