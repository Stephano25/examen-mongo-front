import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private api = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  // 🔄 Récupérer les tâches avec filtre et tri
  getTasks(status?: string, sort?: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.api}?status=${status || ''}&sort=${sort || ''}`);
  }

  // ➕ Ajouter une tâche
  add(task: Task): Observable<Task> {
    return this.http.post<Task>(this.api, task);
  }

  // ✔ Terminer une tâche
  finish(id: string): Observable<Task> {
    return this.http.patch<Task>(`${this.api}/${id}/finish`, {});
  }

  // ❌ Supprimer une tâche
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
