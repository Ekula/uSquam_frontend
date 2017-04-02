/*
 *
 * TaskOverview actions
 *
 */

import {
  GET_TASKS, GET_TASKS_ERROR, GET_TASKS_SUCCESS,
  CREATE_TASK, CREATE_TASK_ERROR, CREATE_TASK_SUCCESS,
  UPDATE_TASK, UPDATE_TASK_ERROR, UPDATE_TASK_SUCCESS,
  DELETE_TASK, DELETE_TASK_ERROR, DELETE_TASK_SUCCESS,
} from './constants';

export function getTasks(requesterId) {
  return {
    type: GET_TASKS,
    requesterId,
  };
}

export function getTasksError(error) {
  return {
    type: GET_TASKS_ERROR,
    error,
  };
}
export function getTasksSuccess(tasks) {
  return {
    type: GET_TASKS_SUCCESS,
    tasks,
  };
}

export function createTask(task) {
  return {
    type: CREATE_TASK,
    task,
  };
}
export function createTaskError(error) {
  return {
    type: CREATE_TASK_ERROR,
    error,
  };
}
export function createTaskSuccess(task) {
  return {
    type: CREATE_TASK_SUCCESS,
    task,
  };
}
