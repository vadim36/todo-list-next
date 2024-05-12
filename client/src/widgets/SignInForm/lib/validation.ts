import { object, string, email, minLength, maxLength } from "valibot";

export const SignInSchema = object({
  email: string('Email must be a string', [
    email('Email must be correct')
  ]),
  password: string('Password must be a string', [
    minLength(3, 'Password must be longer than 3'),
    maxLength(24, 'Password must be less than 24')
  ])
})