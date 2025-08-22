import {Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TaskPriority} from "../../models/task";

@Directive({
    selector: '[appPriorityColor]'
})
export class PriorityColor implements OnInit, OnChanges {
    @Input("appPriorityColor") priority: TaskPriority | undefined;

    priorityColors: { [key in TaskPriority]: string } = {
        [TaskPriority.Low]: '#28a745', // Green color
        [TaskPriority.Medium]: '#ffc107', // Yellow color
        [TaskPriority.High]: '#dc3545' // Red color
    };

    constructor(private readonly el: ElementRef) {}

    ngOnInit(): void {
        this.updateColor();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateColor();
    }

    private updateColor(): void {
        console.log(this.priority);
        if (this.priority) {
            console.log(this.priority);
            const color = this.priorityColors[this.priority];
            this.el.nativeElement.style.bodeLeft = `4px solid ${color}`;
            this.el.nativeElement.style.background = `${color}55`;
        }
    }
}
