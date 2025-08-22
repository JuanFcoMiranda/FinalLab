import {Component, inject, signal} from '@angular/core';
import {TaskService} from '../../services/task-service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-tasks-list',
  imports: [
    DatePipe
  ],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.css'
})
export class TasksList {
  private taskService: TaskService = inject(TaskService)
  tasks = this.taskService.tasks;


}
