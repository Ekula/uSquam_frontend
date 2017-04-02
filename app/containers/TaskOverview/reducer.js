/*
 *
 * TaskOverview reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_TASKS_SUCCESS, GET_TASKS_ERROR,
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
    default:
      return state;
  }
}

export default taskOverviewReducer;
