/*
 *
 * Results actions
 *
 */

import {
  GET_SESSIONS,
  GET_SESSIONS_ERROR,
  GET_SESSIONS_SUCCESS,
} from './constants';

export function getSessions(taskId) {
  return {
    type: GET_SESSIONS,
    taskId
  };
}

export function getSessionsSuccess(sessions) {
  return {
    type: GET_SESSIONS_SUCCESS,
    sessions
  };
}

export function getSessionsError(error) {
  return {
    type: GET_SESSIONS_ERROR,
    error
  };
}
