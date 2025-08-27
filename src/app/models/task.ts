export interface Task {
  id: number;
  userId: number;
  title: string;
  completed: TaskCompletion;
}

export enum TaskCompletion {
  Undefined = "Undefined",
  Completed = "Completed",
  Pending = "Pending"
}