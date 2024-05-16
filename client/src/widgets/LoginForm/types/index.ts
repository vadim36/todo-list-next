import { Input } from "valibot";
import { LoginSchema } from "../lib/validation";

export type ILoginForm = Input<typeof LoginSchema>