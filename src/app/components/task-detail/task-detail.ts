import {Component, inject, signal} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Task, TaskCategory, TaskPriority, TaskStatus} from "../../models/task";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {ActivatedRoute} from "@angular/router";
import {TaskService} from "../../services/task-service";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatError, MatFormField, MatInput, MatLabel, MatSuffix} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-task-detail',
    imports: [
        ReactiveFormsModule,
        MatFabButton,
        MatIcon,
        MatDatepickerInput,
        MatDatepicker,
        MatInput,
        MatDatepickerToggle,
        MatSuffix,
        MatFormField,
        MatSelect,
        MatOption,
        MatLabel,
        CdkTextareaAutosize,
        MatError
    ],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css'
})
export class TaskDetail {
    priorities = Object.values(TaskPriority);
    statuses = Object.values(TaskStatus);
    categories = Object.values(TaskCategory);
    taskForm= new FormGroup({
        id: new FormControl(0, Validators.required),
        title: new FormControl("", Validators.minLength(3)),
        description: new FormControl("", Validators.minLength(5)),
        expirationDate: new FormControl<Date>(new Date(), Validators.required),
        priority: new FormControl("", Validators.required),
        status: new FormControl("", Validators.required),
        category: new FormControl("", Validators.required)
    });
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly taskService = inject(TaskService);
    taskId = signal('');
    private readonly task: Task | undefined;
    protected snackBar = inject(MatSnackBar);

    constructor() {
        this.activatedRoute.params.subscribe((params) => { this.taskId.set(params['id']); });
        this.task = this.taskService.getTaskById(Number(this.taskId()));
        if (this.task) {
            this.taskForm.setValue({
                id: this.task.id,
                title: this.task.title,
                description: this.task.description,
                expirationDate: new Date(this.task.expirationDate),
                priority: this.task.priority,
                status: this.task.status,
                category: this.task.category
            });
        }
    }

    get formControls(): any {
        return this.taskForm['controls'];
    }

    onSubmit() {
        if (this.taskForm.valid) {
            console.log("Form Submitted!", this.taskForm.value);
            const task : Task = {
                id: this.taskForm.value.id!,
                title: this.taskForm.value.title!,
                description: this.taskForm.value.description!,
                expirationDate: new Date(this.taskForm.value.expirationDate!),
                priority: this.taskForm.value.priority as TaskPriority,
                status: this.taskForm.value.status as TaskStatus,
                category: this.taskForm.value.category as TaskCategory
            };
            this.taskService.updateTask(Number(this.taskId()), task);
            this.snackBar.open('Message sent successfully!', 'Dismiss', {
                panelClass: ['snackbar-success'],
            });
        }
        else {
            this.snackBar.open('Please fill in all required fields.', 'OK', {
                panelClass: ['snackbar-error'],
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
