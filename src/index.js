import './style.css';
import Task from './taskManager.js';
import Status from './taskStatus.js';
import display from './displayTask.js';

const todoList = document.querySelector('.todo-list');
todoList.innerHTML = '';
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
