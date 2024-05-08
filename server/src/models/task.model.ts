import { $Enums, Task } from "@prisma/client";

export default class TaskModel implements Task {
  taskId: string;
  title: string;
  status: $Enums.Statuses;
  content: string;
  userId: string;
}