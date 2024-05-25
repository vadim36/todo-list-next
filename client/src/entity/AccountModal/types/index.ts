import { Input } from "valibot";
import { UpdateUserSchema } from "../lib/validation";

export type IUpdatingRequest = Input<typeof UpdateUserSchema>

export interface IUpdateUser {
  name?: string,
  email?: string
}