interface AuthData {
  accessToken: string,
  refreshToken: string,
  user: UserDto
}

interface UserDto {
  userId: string,
  name: string,
  email: string
}

interface ApiError {
  statusCode: number,
  message: string
}