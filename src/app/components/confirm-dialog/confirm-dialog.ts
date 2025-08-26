import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {ConfirmDialogData} from "../../shared/interfaces/confirm-dialog-data";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-confirm-dialog',
    imports: [
        MatDialogClose,
        MatIcon,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogTitle,
        MatIconButton
    ],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css'
})
export class ConfirmDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {}
}
