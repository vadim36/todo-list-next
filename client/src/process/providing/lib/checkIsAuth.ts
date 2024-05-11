import { INITIAL_USER_STATE } from "@/shared/lib/context"

export default function checkIsAuth(setIsAuth: Function, setUserDto: Function) {
  const accessToken = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  if (!accessToken || !user) {
    setIsAuth(false)
    return setUserDto(INITIAL_USER_STATE)
  } 

  
  setIsAuth(true)
  setUserDto(JSON.parse(user))
}