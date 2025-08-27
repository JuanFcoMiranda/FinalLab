import {inject, Injectable} from '@angular/core';
import {Task, TaskCompletion} from '../models/task';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private readonly httpClient = inject(HttpClient);

    getTasks(): Observable<Task[]> {
        return this.httpClient.get<Task[]>('https://jsonplaceholder.typicode.com/todos').pipe(
            map(tasks => tasks.map(task => ({
                ...task,
                completed: task.completed ? TaskCompletion.Completed : TaskCompletion.Pending
            })))
        );
    }

    getTaskById(id: number): Observable<Task> {
        return this.httpClient.get<Task>(`https://jsonplaceholder.typicode.com/todos/${id}`).pipe(
            map(task => ({
                ...task,
                completed: task.completed ? TaskCompletion.Completed : TaskCompletion.Pending
            }))
        );
    }

    addTask(newTask: Task): void {
        const apiTask = {
            ...newTask,
            completed: newTask.completed === TaskCompletion.Completed
        };
        this.httpClient.post<Task>('https://jsonplaceholder.typicode.com/todos', apiTask).subscribe();
    }

    updateTask(id: number, updatedTask: Task): void {
        this.httpClient.put<Task>(
            `https://jsonplaceholder.typicode.com/todos/${id}`,
            {
                ...updatedTask,
                completed: updatedTask.completed === TaskCompletion.Completed
            }
        ).subscribe();
    }

    deleteTask(id: number): void {
        this.httpClient.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).subscribe();
    }
}
