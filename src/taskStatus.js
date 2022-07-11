import Storage from './localStorage.js';

export default class Status {
  constructor(index) {
    this.index = index;
  }

  completeTask() {
    const tasks = Storage.getData();
    if (tasks && !tasks[this.index - 1].completed) {
      tasks[this.index - 1].completed = true;
      const nstorage = new Storage(tasks);
      nstorage.storedData();
    } else if (tasks && tasks[this.index - 1]) {
      tasks[this.index - 1].completed = false;
      const nstorage = new Storage(tasks);
      nstorage.storedData();
    }
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
  }
}
