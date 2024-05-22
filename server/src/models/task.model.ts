import { ApiProperty } from "@nestjs/swagger";
import { $Enums, Task } from "@prisma/client";

export default class TaskModel implements Task {
  @ApiProperty({description: 'a task indetifier', example: 'uuid'})
  taskId: string;
  @ApiProperty({description: 'a task name', example: 'test'})
  name: string;
  @ApiProperty({description: 'a task body', example: 'text about something...'})
  body: string;
  @ApiProperty({description: 'a task status', example: $Enums.Statuses.InProgress})
  status: $Enums.Statuses;
  @ApiProperty({description: 'an owner id', example: 'uuid'})
  userId: string;
}