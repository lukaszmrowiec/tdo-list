import { TodoService } from './to-do-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.less'],
  providers: [TodoService ]
})
export class ToDoListComponent implements OnInit {
  toDoListArray: any[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getToDoList().snapshotChanges()
    .subscribe(item => {
      this.toDoListArray = [];
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['$key'] = element.key;
        this.toDoListArray.push(x);
      });
      this.toDoListArray.sort((a, b) => {
        return a.isChecked - b.isChecked;
      });
    });
  }

  adding(task) {
    this.todoService.addTask(task.value);
    task.value = null;
  }

  alterCheck($key: string, isChecked) {
    this.todoService.checkOrUnCheckTask($key, !isChecked);
  }

  deleting($key: string) {
    this.todoService.removeTask($key);
  }

}
