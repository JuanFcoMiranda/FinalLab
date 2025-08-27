import {Component, inject} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatError, MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {TaskService} from "../../services/task-service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TitleCasePipe} from "@angular/common";
import {TaskCompletion} from "../../models/task";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-add-task',
    imports: [
        ReactiveFormsModule,
        MatFabButton,
        MatFormField,
        MatIcon,
        MatInput,
        MatLabel,
        MatError,
        TitleCasePipe,
        MatOption,
        MatSelect
    ],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css'
})
export class AddTask {
    completedOptions = Object.values(TaskCompletion);
    private readonly taskService = inject(TaskService);
    protected snackBar = inject(MatSnackBar);

    taskForm: FormGroup = new FormGroup({
        id: new FormControl(0),
        title: new FormControl("", [Validators.minLength(3), Validators.required]),
        completed: new FormControl(false)
    });

    get formControls(): any {
        return this.taskForm['controls'];
    }

    onSubmit() {
        if (this.taskForm.valid) {
            console.log(this.taskForm.value);
            this.taskService.addTask(this.taskForm.value);
            this.snackBar.open('Task created successfully!', 'Dismiss', {
                panelClass: ['snackbar-success'],
                duration: 3000
            });
        } else {
            this.snackBar.open('Please fill in all required fields.', 'OK', {
                panelClass: ['snackbar-error'],
                duration: 3000
            });
        }
    }

    checkForErrorsIn = (formControl: AbstractControl) => {
        if (!formControl.hasError('required')) {
            if (formControl.hasError('minlength')) {
                let controlName = Object.keys(this.formControls).find(key => this.formControls[key] === formControl);
                let requiredLength = formControl.getError('minlength').requiredLength;
                return `${controlName} length must be at least ${requiredLength} characters`;
            }
            return '';
        } else {
            let controlName = Object.keys(this.formControls).find(key => this.formControls[key] === formControl);
            return `${controlName} value is required`;
        }
    };
}
