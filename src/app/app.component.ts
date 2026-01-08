import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from './task/service/task.service';
import { Task } from './task/model/task.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tasks: Task[] = [];

  constructor(private service: TaskService) {
    this.load();
  }

  load() {
    this.service.getTasks('', 'title').subscribe((res: Task[]) => {
      this.tasks = res;
    });
  }

  finish(id: string) {
    this.service.finish(id).subscribe(() => this.load());
  }
}
