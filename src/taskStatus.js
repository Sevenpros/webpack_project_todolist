import Storage from './localStorage.js';

export default class Status {
  constructor(index) {
    this.index = index;
  }

  completeTask() {
    if (!this.index) return 'invalid request';
    const tasks = Storage.getData();
    if (!tasks[this.index - 1].completed) {
      tasks[this.index - 1].completed = true;
      const nstorage = new Storage(tasks);
      nstorage.storedData();
    } else if (tasks[this.index - 1]) {
      tasks[this.index - 1].completed = false;
      const nstorage = new Storage(tasks);
      nstorage.storedData();
    }
    return tasks[this.index - 1].completed;
  }

  static clearCompletedTask() {
    const tasks = Storage.getData();
    if (tasks) {
      const uncompletedTasks = tasks.filter((task) => task.completed === false);
      uncompletedTasks.map((task, i) => {
        task.index = i + 1;
        return uncompletedTasks;
      });
      const storage = new Storage(uncompletedTasks);
      storage.storedData(storage);
    }
    const completedTasks = Storage.getData().filter((task) => task.completed === true);

    return completedTasks.length;
  }
}
