import { Input } from "valibot";
import { SignUpSchema } from "../lib/validation";

export type TSignUp = 
  Omit<Input<typeof SignUpSchema>, 'repeatedPassword'> 
  & Partial<Input<typeof SignUpSchema>>