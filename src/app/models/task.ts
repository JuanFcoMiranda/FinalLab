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
  Low,
  Medium,
  High
}

export enum TaskStatus {
  Pending,
  InProgress,
  Completed
}

export enum TaskCategory {
  Work,
  Personal,
  Other
}
