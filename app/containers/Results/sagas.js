import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOCATION_CHANGE } from 'react-router-redux';
import { apiUrl } from 'config';
import { GET_SESSIONS } from './constants';
import { getSessionsSuccess, getSessionsError } from './actions';


// Individual exports for testing
export function* getSessionsSaga(action) {
  // Select username from store
  const taskId = action.taskId; // yield select(makeSelectUsername());
  const requestURL = `${apiUrl}/tasks/${taskId}/sessions`;

  try {
    // Call our request helper (see 'utils/request')
    const sessions = yield call(request, requestURL);
    yield put(getSessionsSuccess(sessions));
  } catch (err) {
    yield put(getSessionsError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* getSessionsData() {
  // Watches actions and calls saga when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(GET_SESSIONS, getSessionsSaga);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  getSessionsData,
];
