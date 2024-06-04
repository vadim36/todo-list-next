"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, FormEvent, ChangeEvent, Dispatch, SetStateAction } from "react"
import updateUser from "../api/updateUser"
import { IUpdatingRequest, IUpdateUser } from "../types"
import { UpdateUserSchema } from "../lib/validation"
import { ValiError, parse } from "valibot"

const user: UserDto = JSON.parse(localStorage.getItem('user') || '{}')
const {userId, name, email} = user

const INITIAL_STATE: IUpdateUser = { name, email }

interface Props {
  setEditMode: Dispatch<SetStateAction<boolean>>
}

export function EditableAccount({ setEditMode }: Props) {
  const [formData, setFormData] = useState<IUpdateUser>(INITIAL_STATE)

  async function submitHandler(event: FormEvent) {
    event.preventDefault()
    const updateUserData: IUpdatingRequest | null = validateForm()
    if (!updateUserData) return

    const userDto = await updateUser(updateUserData)
    localStorage.setItem('user', JSON.stringify(userDto))

    return setEditMode(false)
  }

  function validateForm():IUpdatingRequest | null {
    try {
      return parse(UpdateUserSchema, {...formData, userId})
    } catch (error) {
      if (error instanceof ValiError) alert(`Something went wrong ${error}`)
      return null
    }
  }

  return (
    <form className="flex flex-col gap-1" onSubmit={submitHandler}>
      <Input placeholder="Change a name..." value={formData.name} 
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          return setFormData({...formData, name: event.target.value})
        }}/>
      <Input placeholder="Change an email..." value={formData.email} 
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          return setFormData({...formData, email: event.target.value})
        }}/>
      <div className="mt-2 flex justify-center gap-2">
        <Button size="sm">Save Changes</Button>
        <Button size="sm" type="button" onClick={() => setEditMode(false)}>Cancel</Button>
      </div>
    </form>
  )
}