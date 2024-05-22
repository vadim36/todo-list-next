import { API_URL } from "../http";

export async function validateAccessToken(token: string | null):Promise<boolean> {
  if (!token) return false
  return await fetch(`${API_URL}/auth/validate/${token}`)
    .then((response: Response):Promise<boolean> => response.json())
}