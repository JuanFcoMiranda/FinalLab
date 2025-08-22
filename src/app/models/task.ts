export interface Task {
  id: number;
  title: string;
  description: string;
  expirationDate: Date;
  priority: TaskPriority;
  status: TaskStatus;
  category: TaskCategory;
}

export enum TaskPriority {
  Low= 1,
  Medium,
  High
}

export enum TaskStatus {
  Pending = 1,
  InProgress,
  Completed
}

export enum TaskCategory {
  Work = 1,
  Personal,
  Other
}
