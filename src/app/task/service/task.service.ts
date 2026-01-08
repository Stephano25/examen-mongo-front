import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';


@Injectable({ providedIn: 'root' })
export class TaskService {
    api = 'http://localhost:3000/tasks';

    constructor(private http: HttpClient) {}

    getTasks(status?: string, sort?: string) {
        return this.http.get<Task[]>(`${this.api}?status=${status || ''}&sort=${sort || ''}`);
    }

    add(task: Task) {
        return this.http.post(this.api, task);
    }

    finish(id: string) {
        return this.http.patch(`${this.api}/${id}/finish`, {});
    }

    delete(id: string) {
        return this.http.delete(`${this.api}/${id}`);
    }
}