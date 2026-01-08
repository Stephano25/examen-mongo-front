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
  load(): void {
    this.service.getTasks(this.filter, this.sort).subscribe({
      next: (res: Task[]) => this.tasks = res,
      error: err => console.error('Erreur lors du chargement des tâches', err)
    });
  }

  // ✅ Statistiques
  get total(): number {
    return this.tasks.length;
  }

  get done(): number {
    return this.tasks.filter(t => t.status === 'TERMINEE').length;
  }

  get progress(): number {
    return this.tasks.filter(t => t.status === 'EN_COURS').length;
  }

  // ➕ Ajouter
  addTask(): void {
    if (!this.newTask.title.trim()) return;

    this.service.add(this.newTask).subscribe({
      next: () => {
        this.newTask = { title: '', description: '', status: 'EN_COURS' };
        this.load();
      },
      error: err => console.error('Erreur lors de l’ajout', err)
    });
  }

  // ✔ Terminer
  finish(id: string): void {
    this.service.finish(id).subscribe({
      next: () => this.load(),
      error: err => console.error('Erreur lors de la finalisation', err)
    });
  }

  // ❌ Supprimer
  deleteTask(id: string): void {
    this.service.delete(id).subscribe({
      next: () => this.load(),
      error: err => console.error('Erreur lors de la suppression', err)
    });
  }

   // 🔍 Filtre
  setFilter(status: string): void {
    this.filter = status;
    this.load();
  }

  // 🔠 Tri
  sortByName(): void {
    this.sort = 'title';
    this.load();
  }
}
