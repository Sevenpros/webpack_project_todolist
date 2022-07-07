import './style.css';

const tasks = [
  {
    description: 'Preparing breakfast',
    completed: false,
    index: 2,
  },
  {
    description: 'Study',
    completed: false,
    index: 3,
  },
  {
    description: 'Taking Lunch',
    completed: false,
    index: 1,
  },
];
const todoList = document.querySelector('.todo-list');

function display() {
  todoList.innerHTML = '';
  const taskList = document.createElement('ul');
  const listItem1 = document.createElement('li');
  listItem1.innerHTML += '<span>Today\'s To Do</span> <span class=\'fa fa-refresh\'></span>';
  taskList.appendChild(listItem1);
  const listItem2 = document.createElement('li');
  listItem2.innerHTML += '<input type=\'text\' class=\'input\' placeholder=\'Add to Your List\'>';
  taskList.appendChild(listItem2);

  const sortedTasks = tasks.sort((a, b) => a.index - b.index);
  sortedTasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<div><input type="checkbox" id="${task.index}">
        <label for="${task.index}">${task.description}</label></div> <span class='fa fa-ellipsis-v'><span>`;
    taskList.appendChild(listItem);
  });
  return taskList;
}

todoList.appendChild(display());