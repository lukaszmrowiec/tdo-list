import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class TodoService {
  toDoList: AngularFireList<any>;

  constructor(private firebasedb: AngularFireDatabase) { }

  getToDoList() {
    this.toDoList = this.firebasedb.list('titles');
    return this.toDoList;
  }

  addTask(title: string) {
    this.toDoList.push({
      title: title,
      isChecked: false
    });
  }

  checkOrUnCheckTask($key: string, flag: boolean) {
    this.toDoList.update($key, {isChecked: flag});
  }

  removeTask($key: string) {
    this.toDoList.remove($key);
  }

}
