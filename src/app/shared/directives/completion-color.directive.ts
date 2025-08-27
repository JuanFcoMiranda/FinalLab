import {Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TaskCompletion} from "../../models/task";

@Directive({
    selector: '[appPriorityColor]'
})
export class CompletionColor implements OnInit, OnChanges {
    @Input("appPriorityColor") completed: TaskCompletion | undefined;

    completionColors: { [key in TaskCompletion]: string } = {
        [TaskCompletion.Completed]: '#6ce888', // Green color
        [TaskCompletion.Undefined]: '#cfb05e', // Yellow color
        [TaskCompletion.Pending]: '#fa596b' // Red color
    };

    constructor(private readonly el: ElementRef) {}

    ngOnInit(): void {
        this.updateColor();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateColor();
    }

    private updateColor(): void {
        console.log(this.completed);
        if (this.completed) {
            console.log(this.completed);
            const color = this.completionColors[this.completed];
            this.el.nativeElement.style.bodeLeft = `4px solid ${color}`;
            this.el.nativeElement.style.background = `${color}55`;
        }
    }
}
