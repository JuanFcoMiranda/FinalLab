import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome',
    imports: [
        MatButton
    ],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css'
})
export class Welcome {
    private readonly router : Router = inject(Router);

    navigateToList() {
        this.router.navigate(['/tasks']).then();
    }
}