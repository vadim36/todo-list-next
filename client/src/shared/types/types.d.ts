interface IAuthContext {
  isAuth: boolean,
  setIsAuth: Function,
  userDto: IAuthPayload,
  setUserDto: Function,
  isLoading: boolean
}

type IAuthPayload = {
  accessToken: string,
  refreshToken: string,
  user: IUserPayload
}

interface IUserPayload {
  userId: string
  name: string
  email: string
}