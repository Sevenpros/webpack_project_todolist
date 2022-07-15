/**
 * @jest-environment jsdom
 */

import Task from './taskManager.js';
import display from './displayTask.js';

describe('Adding task to the list', () => {
  it('empty funtion to throw error', () => {
    const task = new Task('');
    expect(task.addTask()).toBe('invalid task entered');
  });
  it('save task to local storage', () => {
    const task = new Task('Task1');
    task.addTask();
    expect(JSON.parse(localStorage.getItem('task'))[0].desc).toEqual('Task1');
  });
  it('should add new list item', () => {
    const task = new Task('List_item');
    task.addTask();
    const list = display().querySelectorAll('li');
    expect(list[list.length - 2].textContent.includes('List_item')).toBe(true);
  });
  it('checks if stored data is object', () => {
    const task = new Task('Task2');
    task.addTask();
    expect(typeof JSON.parse(localStorage.getItem('task'))).toEqual('object');
  });
});

describe('Removing Task from list', () => {
  it('empty funtion to throw error', () => {
    expect(Task.removeTask()).toBe('can not remove task with invalid id');
  });
  it('remove task from local storage', () => {
    const task = new Task('Test_Task');
    task.addTask();
    expect(Task.removeTask(JSON.parse(localStorage.getItem('task'))[2].index)).toEqual('Test_Task');
  });
  it('remove task from list', () => {
    const task = new Task('onlyfortest');
    task.addTask();
    Task.removeTask(JSON.parse(localStorage.getItem('task'))[3].index);
    const list = display().querySelectorAll('li');

    expect(list[list.length - 2].textContent.includes('onlyfortest')).toBe(false);
  });
});
describe('Editing Task', () => {
  it('empty funtion to throw error', () => {
    expect(Task.editTask()).toBe('invalid request');
  });
  it('edit task  in storage', () => {
    const task = new Task('Test_ToEdit');
    const id = task.addTask();
    const newTask = 'Task_Edited';
    expect(Task.editTask(id, newTask)).toEqual('Task_Edited');
  });
  it('Edit task on list', () => {
    const task = new Task('toEdit');
    const id = task.addTask();
    const taskToEdit = 'editedTask';
    Task.editTask(id, taskToEdit);
    const list = display().querySelectorAll('li');

    expect(list[list.length - 2].textContent.includes('editedTask')).toBe(true);
  });
});