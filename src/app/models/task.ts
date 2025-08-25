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
  Low = "Low",
  Medium = "Medium",
  High = "High"
}

export enum TaskStatus {
  Pending = "Pending",
  InProgress = "In Progress",
  Completed = "Completed"
}

export enum TaskCategory {
  Work = "Work",
  Personal = "Personal",
  Other = "Other"
}
