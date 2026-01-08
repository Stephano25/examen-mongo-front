import { Component } from '@angular/core';
import { Task } from './task/model/task.model';
import { TaskService } from './task/service/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tasks: Task[] = [];
  filter = '';

  constructor(private service: TaskService) {
    this.load();
  }

  load() {
    this.service
      .getTasks(this.filter, 'title')
      .subscribe((res: Task[]) => {
        this.tasks = res;
      });
  }

  finish(id: string) {
    this.service.finish(id).subscribe(() => this.load());
  }
}
