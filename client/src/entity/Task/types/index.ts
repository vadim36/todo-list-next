export interface ITask {
  name: string
  body: string
  status: Statuses,
  taskId: string
}

export enum Statuses {
  Todo = 'Todo',
  InProgress = 'InProgress',
  Completed = 'Completed'
}

export type TaskRequest = { 
  userId: string,
  taskId: string
} & Pick<ITask, 'status'>