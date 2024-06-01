import { Input } from "valibot";
import { CreateTaskSchema } from "../lib/validation";

export type ICreateTask = { userId: string } & Input<typeof CreateTaskSchema>