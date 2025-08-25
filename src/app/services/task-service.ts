import { Injectable } from '@angular/core';
import {Task, TaskCategory, TaskPriority, TaskStatus} from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'Description for Task 1', category: TaskCategory.Work,
      priority: TaskPriority.High, status: TaskStatus.Pending, expirationDate: new Date('2025-12-31') },
    { id: 2, title: 'Task 2', description: 'Description for Task 2', category: TaskCategory.Personal,
      priority: TaskPriority.Medium, status: TaskStatus.InProgress, expirationDate: new Date('2025-11-30') },
    { id: 3, title: 'Task 3', description: 'Description for Task 3', category: TaskCategory.Other,
      priority: TaskPriority.Low, status: TaskStatus.Completed, expirationDate: new Date('2025-10-15') }
  ];

    getTaskById(id: number): Task | undefined {
        return this.tasks.find(task => task.id === id);
    }

    updateTask(id: number, updatedTask: Task): void {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            this.tasks[index] = { ...updatedTask, id }; // Ensure the ID remains unchanged
        }
    }
}
