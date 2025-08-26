import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatInput, MatLabel, MatSuffix} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {TaskCategory, TaskPriority, TaskStatus} from "../../models/task";
import {TaskService} from "../../services/task-service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-task',
    imports: [
        ReactiveFormsModule,
        CdkTextareaAutosize,
        MatDatepicker,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatFabButton,
        MatFormField,
        MatIcon,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        MatSuffix
    ],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css'
})
export class AddTask {
    private readonly taskService = inject(TaskService);
    protected snackBar = inject(MatSnackBar);
    priorities = Object.values(TaskPriority);
    statuses = Object.values(TaskStatus);
    categories = Object.values(TaskCategory);
    taskForm: FormGroup = new FormGroup({
        id: new FormControl(0, Validators.required),
        title: new FormControl("", Validators.minLength(3)),
        description: new FormControl("", Validators.minLength(5)),
        expirationDate: new FormControl<Date | null>(null, Validators.required),
        priority: new FormControl("", Validators.required),
        status: new FormControl("", Validators.required),
        category: new FormControl("", Validators.required)
    });

    onSubmit() {
        if (this.taskForm.valid) {
            console.log(this.taskForm.value);
            this.taskService.addTask(this.taskForm.value);
            this.snackBar.open('Message sent successfully!', 'Dismiss', {
                panelClass: ['snackbar-success'],
            });
        } else {
            console.log("Form is not valid");
            this.snackBar.open('Please fill in all required fields.', 'OK', {
                panelClass: ['snackbar-error'],
            });
        }
    }
}
