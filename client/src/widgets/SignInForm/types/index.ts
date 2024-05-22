import { Input } from "valibot";
import { SignInSchema } from "../lib/validation";

export type ISignInForm = Input<typeof SignInSchema>