import './style.css';
import Storage from './localStorage.js';
import Task from './taskManager.js';
import Status from './taskStatus.js';

const todoList = document.querySelector('.todo-list');

function display() {
  todoList.innerHTML = '';
  const taskList = document.createElement('ul');
  const listItem1 = document.createElement('li');
  listItem1.innerHTML += '<span>Today\'s To Do</span> <span class=\'fa fa-refresh refreshData\'></span>';
  taskList.appendChild(listItem1);
  const listItem2 = document.createElement('li');
  listItem2.innerHTML += '<input type=\'text\' class=\'input\' id=\'input\'   placeholder=\'Add to Your List\'>';
  taskList.appendChild(listItem2);
  const tasks = Storage.getData();
  if (tasks) {
    const sortedTasks = tasks.sort((a, b) => a.index - b.index);
    sortedTasks.forEach((task) => {
      const listItem = document.createElement('li');
      listItem.id = `task${task.index}`;
      listItem.classList.add('taskDescription');
      if (task.completed === false) {
        listItem.innerHTML = `<div><input class='checkbox' type="checkbox" id="${task.index}">
        <label for="${task.index}" class='label'>${task.desc}</label></div> 
        <span class=' icons fa fa-ellipsis-v' target='task${task.index}' status='${task.completed}' index='${task.index}'></span>`;
        taskList.appendChild(listItem);
      } else {
        listItem.innerHTML = `<div><input class='checkbox' type="checkbox" checked id="${task.index}">
        <label for="${task.index}" class='label checked'>${task.desc}</label></div> 
        <span class=' icons fa fa-ellipsis-v' target='task${task.index}' status='${task.completed}' index='${task.index}'></span>`;
        taskList.appendChild(listItem);
      }
    });
  }
  const clearButton = document.createElement('li');
  clearButton.id = 'clear-button';
  clearButton.textContent = 'Clear All Completed';
  taskList.appendChild(clearButton);
  return taskList;
}

todoList.addEventListener('change', (e) => {
  if (e.target.classList.contains('input')) {
    const input = e.target.value;
    const activity = new Task(input);
    activity.addTask();
    todoList.appendChild(display());
  }
});
todoList.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-trash')) {
    const id = e.target.getAttribute('index');
    Task.removeTask(id);
    todoList.appendChild(display());
  }
});

function makeItemEditable(id) {
  const items = document.querySelectorAll('.taskDescription');
  items.forEach((item) => {
    if (item.id === id) {
      const itemLabel = item.querySelector('label');
      item.classList.add('editable');
      itemLabel.contentEditable = true;
      itemLabel.focus();
    } else {
      item.classList.remove('editable');
      item.contentEditable = false;
    }
  });
  const icons = document.querySelectorAll('.icons');
  icons.forEach((icon) => {
    if (icon.getAttribute('target') === id) {
      icon.classList.remove('fa-ellipsis-v');
      icon.classList.add('fa-trash');
    } else {
      icon.classList.add('fa-ellipsis-v');
      icon.classList.remove('fa-trash');
    }
  });
}

todoList.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-ellipsis-v')) {
    const target = e.target.getAttribute('target');
    const status = e.target.getAttribute('status');
    if (status === 'false') makeItemEditable(target);
  }
});

todoList.addEventListener('input', (e) => {
  if (e.target.classList.contains('label')) {
    const desc = e.target.textContent;
    const index = e.target.getAttribute('for');
    Task.editTask(index, desc);
  }
});
todoList.addEventListener('click', (e) => {
  if (e.target.classList.contains('refreshData')) {
    todoList.appendChild(display());
  }
});
todoList.addEventListener('change', (e) => {
  if (e.target.classList.contains('checkbox')) {
    const { id } = e.target;
    const taskStatus = new Status(id);
    taskStatus.completeTask();
    todoList.appendChild(display());
  }
});

todoList.addEventListener('click', (e) => {
  if (e.target.id === 'clear-button') {
    Status.clearCompletedTask();
    todoList.appendChild(display());
  }
});

todoList.appendChild(display());