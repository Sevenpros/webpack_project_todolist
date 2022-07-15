import Storage from './localStorage.js';

const display = () => {
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
};

export default display;