import { object, string, minLength, maxLength, length } from "valibot";

export const CreateTaskSchema = object({
  name: string('Name must be a string', [
    minLength(3, 'Name must be longer than 3'),
    maxLength(48, 'Name must be less than 48')
  ]),
  body: string('Body must be a string', [
    minLength(0, 'Body must be there'),
    maxLength(512,'Body must be less than 512')
  ])
})