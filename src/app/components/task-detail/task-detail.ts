import {Component, inject, signal} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Task, TaskCompletion} from "../../models/task";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {ActivatedRoute} from "@angular/router";
import {TaskService} from "../../services/task-service";
import {MatError, MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TitleCasePipe} from "@angular/common";
import {MatSelect, MatOption} from "@angular/material/select";

@Component({
  selector: 'app-task-detail',
    imports: [
        ReactiveFormsModule,
        MatFabButton,
        MatIcon,
        MatInput,
        MatFormField,
        MatLabel,
        MatError,
        TitleCasePipe,
        MatSelect,
        MatOption
    ],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css'
})
export class TaskDetail {
    completedOptions = Object.values(TaskCompletion);
    taskForm= new FormGroup({
        id: new FormControl(0, Validators.required),
        title: new FormControl("", Validators.minLength(3)),
        completed: new FormControl(TaskCompletion.Undefined)
    });
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly taskService = inject(TaskService);
    taskId = signal('');
    private task: Task | undefined;
    protected snackBar = inject(MatSnackBar);

    constructor() {
        this.activatedRoute.params.subscribe((params) => { this.taskId.set(params['id']); });
        this.taskService.getTaskById(Number(this.taskId())).subscribe(task => {
            this.task = task;
            if (this.task) {
                this.taskForm.setValue({
                    id: this.task.id,
                    title: this.task.title,
                    completed: this.task.completed
                });
            }
        });
    }

    get formControls(): any {
        return this.taskForm['controls'];
    }

    onSubmit() {
        if (this.taskForm.valid) {
            console.log("Form Submitted!", this.taskForm.value);
            const task : Task = {
                id: this.taskForm.value.id!,
                userId: this.task?.userId || 0,
                title: this.taskForm.value.title!,
                completed: this.taskForm.value.completed!
            };
            this.taskService.updateTask(Number(this.taskId()), task);
            this.snackBar.open('Task updated successfully!', 'Dismiss', {
                panelClass: ['snackbar-success'],
                duration: 3000
            });
        }
        else {
            this.snackBar.open('Please fill in all required fields.', 'OK', {
                panelClass: ['snackbar-error'],
                duration: 3000
            });
        }
    }

    checkForErrorsIn(formControl: AbstractControl) {
        if (formControl.hasError('required')) {
            let controlName = Object.keys(this.formControls).find(key => this.formControls[key] === formControl);
            return `${controlName} value is required`;
        }

        if (formControl.hasError('minlength')) {
            let controlName = Object.keys(this.formControls).find(key => this.formControls[key] === formControl);
            let requiredLength = formControl.getError('minlength').requiredLength;
            return `${controlName} length must be at least ${requiredLength} characters`;
        }
        return '';
    }
}
