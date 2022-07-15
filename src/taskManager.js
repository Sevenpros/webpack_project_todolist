/* eslint-disable import/prefer-default-export */
import Storage from './localStorage.js';

export default class Task {
  constructor(desc, index = 0, completed = false) {
    this.desc = desc;
    this.index = index;
    this.completed = completed;
  }

  addTask() {
    let tasks = Storage.getData();
    if (!tasks) tasks = [];
    const index = tasks.length;
    const task = new Task(this.desc, this.index, this.completed);
    if (task.desc) {
      tasks.push(task);
      tasks[index].index = tasks.length;
      const newStorage = new Storage(tasks);
      newStorage.storedData();
      return tasks.length;
    }
    return 'invalid task entered';
  }

  static removeTask(id) {
    if (!id) return 'can not remove task with invalid id';
    const tasks = Storage.getData();
    tasks.splice(id - 1, 1);
    tasks.map((task, i) => {
      task.index = i + 1;
      return tasks;
    });
    const remainingStorage = new Storage(tasks);
    remainingStorage.storedData();
    return tasks[tasks.length - 1].desc;
  }

  static editTask(id, desc) {
    if (!id || !desc) return 'invalid request';
    const tasks = Storage.getData();
    tasks[id - 1].desc = desc;
    const remainingStorage = new Storage(tasks);
    remainingStorage.storedData();
    return desc;
  }
}
