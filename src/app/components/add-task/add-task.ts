import {Component, inject} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatError, MatFormField, MatInput, MatLabel, MatSuffix} from "@angular/material/input";
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
        MatSuffix,
        MatError
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
        id: new FormControl(0),
        title: new FormControl("", [Validators.minLength(3), Validators.required]),
        description: new FormControl(""),
        expirationDate: new FormControl<Date | null>(null, Validators.required),
        priority: new FormControl("", Validators.required),
        status: new FormControl("", Validators.required),
        category: new FormControl("", Validators.required)
    });

    get formControls(): any {
        return this.taskForm['controls'];
    }

    onSubmit() {
        if (this.taskForm.valid) {
            console.log(this.taskForm.value);
            this.taskService.addTask(this.taskForm.value);
            this.snackBar.open('Message sent successfully!', 'Dismiss', {
                panelClass: ['snackbar-success'],
            });
        } else {
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
