import { email, maxLength, minLength, object, optional, string } from "valibot";

export const UpdateUserSchema = object({
  userId: string('UserId must be a string'),
  name: optional(string('Name must be a string', [
    minLength(3, 'Name must be longer than 3'),
    maxLength(24, 'Name must be less than 24'),
  ])),
  email: optional(string('Email must be a string', [
    email('Email must be correct')
  ]))
})