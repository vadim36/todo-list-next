"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { EditableAccount } from "./EditableAccount"

export function AccountInfo() {
  const user: UserDto = JSON.parse(localStorage.getItem('user')!)
  const {email, name} = user
  const [editMode, setEditMode] = useState<boolean>(false)

  return (
    <>
      {editMode ? <EditableAccount setEditMode={setEditMode}/> : (
        <div className="flex flex-col">
          <ul className="flex flex-col gap-1">
            <li>Profile <strong className="text-slate-700">{name}</strong></li>
            <li>Email <strong className="text-slate-700">{email}</strong></li>
          </ul>
          <Button size="sm" className="mt-2 self-center" onClick={() => setEditMode(true)}>
            Edit Profile
          </Button>
        </div>
      )}
    </>
  )
}