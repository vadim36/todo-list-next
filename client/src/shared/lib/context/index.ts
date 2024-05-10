"use client"

import { createContext } from "react";

export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  setIsAuth: () => undefined,
  userDto: {}
})