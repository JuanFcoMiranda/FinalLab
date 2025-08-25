import {Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TaskPriority} from "../../models/task";

@Directive({
    selector: '[appPriorityColor]'
})
export class PriorityColor implements OnInit, OnChanges {
    @Input("appPriorityColor") priority: TaskPriority | undefined;

    priorityColors: { [key in TaskPriority]: string } = {
        [TaskPriority.Low]: '#6ce888', // Green color
        [TaskPriority.Medium]: '#cfb05e', // Yellow color
        [TaskPriority.High]: '#fa596b' // Red color
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
