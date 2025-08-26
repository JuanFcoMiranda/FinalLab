import {Component, inject, OnInit} from '@angular/core';
import {TaskService} from '../../services/task-service';
import {DatePipe} from '@angular/common';
import {PriorityColor} from "../../shared/directives/priority-color";
import {Task} from "../../models/task";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {MatLabel} from "@angular/material/form-field";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialog} from "../confirm-dialog/confirm-dialog";

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
export class TasksList implements OnInit {
    private readonly router = inject(Router);
    private readonly taskService: TaskService = inject(TaskService)
    tasks: Task[] = [];

    private readonly dialog: MatDialog;

    constructor(dialog: MatDialog) {
        this.dialog = dialog;
    }

    ngOnInit(): void {
        this.tasks = this.taskService.getTasks();
    }

    onModifyTask(task: Task) {
        console.log(`The size is ${task.description}.`);
        this.router.navigate(['/tasks', task.id]).then();
    }

    onAddTask() {
        console.log(`Add a new task.`);
        this.router.navigate(['/add-task']).then();
    }

    onDeleteTask(task: Task) {
        console.log(`Delete task with id ${task.id}.`);
        this.taskService.deleteTask(task.id);
        this.tasks = this.taskService.getTasks();
    }

    openDialog(task: Task) {
        const dialogRef = this.dialog.open(ConfirmDialog, {
            data: {
                title: 'Confirm Deletion',
                message: 'Do you want to delete the task?'
            }
        });

        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {
                this.onDeleteTask(task);
            }
        });
    }
}
