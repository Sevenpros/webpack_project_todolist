/**
 * @jest-environment jsdom
 */

import Task from './taskManager.js';
import Status from './taskStatus.js';
import display from './displayTask.js';

describe('Complete task', () => {
  it('empty funtion to throw error', () => {
    const taskStatus = new Status();
    expect(taskStatus.completeTask()).toBe('invalid request');
  });
  it('complete task in local storage', () => {
    const task = new Task('Test_ToComplete');
    const id = task.addTask();
    const taskStatus = new Status(id);
    expect(taskStatus.completeTask(id)).toBe(true);
  });
  it('checked on the list', () => {
    const task = new Task('toCheck');
    const id = task.addTask();
    const taskStatus = new Status(id);
    taskStatus.completeTask(id);
    const list = display().querySelectorAll('li');
    const input = list[list.length - 2].querySelector('input');
    expect(input.checked).toBe(true);
  });
});

describe('Clear Completed task', () => {
  it('clear completed tasks from local storage', () => {
    const task = new Task('toCheck');
    const id = task.addTask();
    const taskStatus = new Status(id);
    taskStatus.completeTask(id);
    expect(Status.clearCompletedTask()).toBe(0);
  });
  it('cleared on the list', () => {
    const task = new Task('toCheck');
    const id = task.addTask();
    const taskStatus = new Status(id);
    taskStatus.completeTask(id);
    Status.clearCompletedTask();
    const list = display().querySelectorAll('li');
    const input = list[list.length - 2].querySelector('input');
    expect(input.checked).toBe(false);
  });
});