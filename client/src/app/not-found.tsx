"use client"

import { useRouter } from "next/navigation"

export default function NotFound() {
  const {push} = useRouter()
  return push('/')
}