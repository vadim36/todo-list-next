import { Input } from "valibot";
import { TaskSchema } from "../lib/validation";

export type IPseudoTask = Input<typeof TaskSchema>
export type IRequestingData = { userId: string } & IPseudoTask
export type IUpdatingData = { taskId: string } & IRequestingData