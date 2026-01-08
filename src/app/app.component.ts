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
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatIconModule, MatSelectModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: Task[] = [];
  filter: string = '';
  sort: string = 'title';

  constructor(private service: TaskService) {
    this.load();
  }

  load() {
    this.service.getTasks(this.filter, this.sort).subscribe((res: Task[]) => {
      this.tasks = res;
    });
  }

  finish(id: string) {
    this.service.finish(id).subscribe(() => this.load());
  }

  setFilter(status: string) {
    this.filter = status;
    this.load();
  }

  sortByName() {
    this.sort = 'title';
    this.load();
  }
}
