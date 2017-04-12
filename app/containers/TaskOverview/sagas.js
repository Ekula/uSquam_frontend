import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { apiUrl, hardcodedRequesterId } from 'config';
import { GET_TASKS, CREATE_TASK } from './constants';
import { getTasksError, getTasksSuccess, createTaskError, createTaskSuccess } from './actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';


// Individual exports for testing
export function* getTasksSaga() {
  // Select username from store
  const requesterId = hardcodedRequesterId; // yield select(makeSelectUsername());
  const requestURL = `${apiUrl}/tasks`;

  try {
    // Call our request helper (see 'utils/request')
    const tasks = yield call(request, requestURL);
    yield put(getTasksSuccess(tasks));
  } catch (err) {
    yield put(getTasksError(err));
  }
}

// Individual exports for testing
export function* createTaskSaga(action) {
  // Select username from store
  const requesterId = hardcodedRequesterId; //yield select(makeSelectUsername());
  const requestURL = `${apiUrl}/tasks`;

  const task = action.task;
  delete task._id;
  task.requester_id = requesterId;

  try {
    // Call our request helper (see 'utils/request')
    const taskRes = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(task),
    });
    yield put(createTaskSuccess(taskRes));
  } catch (err) {
    yield put(createTaskError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* getTasksData() {
  // Watches actions and calls saga when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(GET_TASKS, getTasksSaga);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
export function* createTaskData() {
  // Watches actions and calls saga when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(CREATE_TASK, createTaskSaga);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  getTasksData,
  createTaskData,
];
