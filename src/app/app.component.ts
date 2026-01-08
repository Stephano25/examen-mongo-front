import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { TaskService } from './task/service/task.service';
import { Task } from './task/model/task.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tasks: Task[] = [];
  filter: string = '';
  sort: string = 'title';

  newTask: Task = { title: '', description: '', status: 'EN_COURS' };

  constructor(private service: TaskService) {
    this.load();
  }

  // 🔄 Chargement
  load() {
    this.service.getTasks(this.filter, this.sort).subscribe((res: Task[]) => {
      this.tasks = res;
    });
  }

  // ✅ Statistiques
  get total() {
    return this.tasks.length;
  }

  get done() {
    return this.tasks.filter(t => t.status === 'TERMINEE').length;
  }

  get progress() {
    return this.tasks.filter(t => t.status === 'EN_COURS').length;
  }

  // ➕ Ajouter
  addTask() {
    if (!this.newTask.title) return;

    this.service.add(this.newTask).subscribe(() => {
      this.newTask = { title: '', description: '', status: 'EN_COURS' };
      this.load();
    });
  }

  // ✔ Terminer
  finish(id: string) {
    this.service.finish(id).subscribe(() => this.load());
  }

  // ❌ Supprimer
  deleteTask(id: string) {
    this.service.delete(id).subscribe(() => this.load());
  }

  // 🔍 Filtre
  setFilter(status: string) {
    this.filter = status;
    this.load();
  }

  // 🔠 Tri
  sortByName() {
    this.sort = 'title';
    this.load();
  }
}
