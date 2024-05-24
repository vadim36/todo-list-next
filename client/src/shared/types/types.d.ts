interface AuthData {
  accessToken: string,
  refreshToken: string,
  payload: UserDto
}

interface UserDto {
  userId: string,
  name: string,
  email: string
}