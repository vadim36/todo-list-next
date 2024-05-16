import { custom, email, maxLength, minLength, object, string } from "valibot";

export const SignUpSchema = object({
  name: string('Name must be a string', [
    minLength(3, 'Name must be longer than 3'),
    maxLength(24, 'Name must be less than 24')
  ]),
  email: string('Email must be a string', [
    email('Email must be correct')
  ]),
  password: string('Password must be a string', [
    minLength(3, 'Password must be longer than 3'),
    maxLength(24, 'Password must be less than 24')
  ]),
  repeatedPassword: string([minLength(1, 'Please repeat the password once.')]),
}, 
[
  custom(
    ({ password, repeatedPassword }) => password === repeatedPassword,
    'The passwords do not match.'
  ),
]
)