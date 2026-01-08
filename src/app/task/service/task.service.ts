import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../model/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  api = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(status?: string, sort?: string) {
    return this.http.get<Task[]>(`${this.api}?status=${status || ''}&sort=${sort || ''}`);
  }

  finish(id: string) {
    return this.http.patch(`${this.api}/${id}/finish`, {});
  }
}
