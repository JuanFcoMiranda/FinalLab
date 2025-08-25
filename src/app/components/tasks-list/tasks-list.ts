import {Component, inject } from '@angular/core';
import {TaskService} from '../../services/task-service';
import {DatePipe} from '@angular/common';
import {PriorityColor} from "../../shared/directives/priority-color";
import {Task} from "../../models/task";

@Component({
  selector: 'app-tasks-list',
    imports: [
        DatePipe,
        PriorityColor
    ],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.css'
})
export class TasksList {
  private readonly taskService: TaskService = inject(TaskService)
  tasks = this.taskService.tasks;


    modify(task: Task) {}
}
