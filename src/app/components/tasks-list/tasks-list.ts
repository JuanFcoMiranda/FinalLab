import {Component, inject} from '@angular/core';
import {TaskService} from '../../services/task-service';
import {DatePipe} from '@angular/common';
import {PriorityColor} from "../../shared/directives/priority-color";
import {Task} from "../../models/task";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {MatLabel} from "@angular/material/form-field";

@Component({
    selector: 'app-tasks-list',
    imports: [
        DatePipe,
        PriorityColor,
        MatIcon,
        MatFabButton,
        MatLabel
    ],
    templateUrl: './tasks-list.html',
    styleUrl: './tasks-list.css'
})
export class TasksList {
    private readonly router = inject(Router);
    private readonly taskService: TaskService = inject(TaskService)
    tasks = this.taskService.tasks;

    onModifyTask(task: Task) {
        console.log(`The size is ${task.description}.`);
        this.router.navigate(['/tasks', task.id]).then();
    }

    onAddTask() {
        console.log(`Add a new task.`);
        this.router.navigate(['/add-task']).then();
    }
}
