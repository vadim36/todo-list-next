"use client"

import { Input } from "@/components/ui/input"
import { ChangeEvent, FormEvent, useState } from "react"
import { INITIAL_STATE } from "../consts"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PAGES } from "@/shared"
import { ISignUpForm } from "../types"
import { ValidationErrors } from "@/shared"
import { SignUpSchema } from "../lib/validation"
import { ValiError, parse } from "valibot"
import { mapValidationErrors } from "@/shared"
import signUp from "../api/signUp"
import { useRouter } from "next/navigation"

export function SignUpForm() {
  const [formData, setFormData] = useState<ISignUpForm>(INITIAL_STATE)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const {replace} = useRouter()

  async function submitHandler(event: FormEvent) {
    event.preventDefault()
    const signUpData = validateForm()
    if (!signUpData) return

    const authData = await signUp(signUpData)
    localStorage.setItem('accessToken', authData!.accessToken)
    localStorage.setItem('refreshToken', authData!.refreshToken)

    setFormData(INITIAL_STATE)
    return replace('/')
  }

  function validateForm():ISignUpForm | void {
    try {
      setValidationErrors([])
      const {repeatedPassword, ...signUpData} = parse(SignUpSchema, formData)
      return signUpData
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
      <strong>Sign Up</strong>
      <Input 
        value={formData.name}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          return setFormData({...formData, name: event.target.value})
        }}
        placeholder="Your name..."/>
      <Input 
        value={formData.email}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          return setFormData({...formData, email: event.target.value})
        }}
        type="email" placeholder="Your email..."/>
      <Input 
        value={formData.password}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          return setFormData({...formData, password: event.target.value})
        }}
        type="password" placeholder="Your password..."/>
      <Input 
        value={formData.repeatedPassword}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          return setFormData({...formData, repeatedPassword: event.target.value})
        }}
        type="password" placeholder="Repeat password..."/>
      <Button>Create an account</Button>
      <ValidationErrors validationArray={validationErrors}/>
      <strong className="text-sm inline">Have you already had an account?</strong>
      <Button asChild size="sm" className="self-start" variant="outline">
        <Link href={PAGES.SIGN_IN}>Sign In</Link>
      </Button>
    </form>
  )
}