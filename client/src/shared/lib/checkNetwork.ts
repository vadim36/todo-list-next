import { API_URL } from "../http";

export async function checkNetwork():Promise<boolean> {
  return await fetch(`${API_URL}/test`).then(() => true).catch(() => false)
} 