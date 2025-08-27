import {Component, inject, OnInit} from '@angular/core';
import {TaskService} from '../../services/task-service';
import {CompletionColor} from "../../shared/directives/completion-color.directive";
import {Task, TaskCompletion,} from "../../models/task";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialog} from "../confirm-dialog/confirm-dialog";
import {FormsModule} from "@angular/forms";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
    selector: 'app-tasks-list',
    imports: [
        CompletionColor,
        MatIcon,
        MatFabButton,
        MatLabel,
        FormsModule,
        MatFormField,
        MatSelect,
        MatOption
    ],
    templateUrl: './tasks-list.html',
    styleUrl: './tasks-list.css'
})
export class TasksList implements OnInit {
    private readonly router = inject(Router);
    private readonly taskService: TaskService = inject(TaskService)
    tasks: Task[] = [];

    completedOptions = Object.values(TaskCompletion);
    private readonly dialog: MatDialog;
    selectedCompleted: TaskCompletion | undefined = undefined;

    constructor(dialog: MatDialog) {
        this.dialog = dialog;
    }

    ngOnInit(): void {
        this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
    }

    onModifyTask(task: Task) {
        this.router.navigate(['/tasks', task.id]).then();
    }

    onAddTask() {
        console.log(`Add a new task.`);
        this.router.navigate(['/add-task']).then();
    }

    onDeleteTask(task: Task) {
        console.log(`Delete task with id ${task.id}.`);
        this.taskService.deleteTask(task.id);
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

    get filteredTasks() {
        return this.tasks.filter(task => !this.selectedCompleted || task.completed === this.selectedCompleted);
    }
}
