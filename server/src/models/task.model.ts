import { $Enums, Task } from "@prisma/client";
import UserModel from "./user.model";

export default class TaskModel implements Task {
  taskId: string;
  title: string;
  status: $Enums.Statuses;
  content: string;
  userId: string;
  user: Omit<UserModel, 'tasks'>;
}