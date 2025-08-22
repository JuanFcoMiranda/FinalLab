import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', loadComponent: () => import('./layout/welcome/welcome').then(m => m.Welcome) },
  { path: 'tasks', loadComponent: () => import('./components/tasks-list/tasks-list').then(m => m.TasksList) },
  { path: 'tasks/:id', loadComponent: () => import('./components/task-detail/task-detail').then(m => m.TaskDetail) },
  { path: 'add-task', loadComponent: () => import('./components/add-task/add-task').then(m => m.AddTask) },
  { path: '**', redirectTo: 'welcome' } // Wildcard route for a 404 page (optional
];
