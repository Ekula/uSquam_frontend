/*
 *
 * TaskOverview reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_TASKS_SUCCESS, GET_TASKS_ERROR,
  CREATE_TASK_SUCCESS, CREATE_TASK_ERROR,
} from './constants';

const initialState = fromJS({
  tasks: [],
});

function taskOverviewReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS_SUCCESS:
      return state.set('tasks', action.tasks).set('error', undefined);
    case GET_TASKS_ERROR:
      return state.set('error', action.error);
    case CREATE_TASK_SUCCESS:
      return state.update('tasks', (arr) => arr.concat(action.task)).set('error', undefined);
    case CREATE_TASK_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default taskOverviewReducer;
