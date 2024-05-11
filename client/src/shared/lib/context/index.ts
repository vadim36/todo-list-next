"use client"

import { createContext } from "react";

export const INITIAL_USER_STATE = { 
  accessToken: '', 
  refreshToken: '',
  user: { userId: '', email: '', name: '' }
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  setIsAuth: () => undefined,
  userDto: INITIAL_USER_STATE,
  setUserDto: () => undefined,
  isLoading: true
})