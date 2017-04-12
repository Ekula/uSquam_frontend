import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { apiUrl, pipelineUrl, hardcodedRequesterId } from 'config';
import { GET_DATA, GET_PIPELINE_DATA, CREATE_DATA } from './constants';
import { getDataError, getDataSuccess, getPipelineDataError, getPipelineDataSuccess, createDataError, createDataSuccess } from './actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';

// Individual exports for testing
export function* getDataSaga() {
  // Select username from store
  const requesterId = hardcodedRequesterId; // yield select(makeSelectUsername()); // deploy: 58dd5bc49f2f16068742f7e0
  const requestURL = `${apiUrl}/requesters/${requesterId}/data`;

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL);
    yield put(getDataSuccess(data));
  } catch (err) {
    yield put(getDataError(err));
  }
}

export function* getPipelineDataSaga(action) {
  // Build url
  let params = '?';
  Object.keys(action.params).forEach((param, id) => { if (action.params[param] !== '') params += `${id === 0 ? '' : '&'}${param}=${action.params[param]}`; });
  const requestURL = `${pipelineUrl}/requesters/${action.service}/${params}`;

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL);
    yield put(getPipelineDataSuccess(action.service, data, requestURL));
  } catch (err) {
    yield put(getPipelineDataError(err));
  }
}

// Individual exports for testing
export function* createDataCollectionSaga(action) {
  // Select username from store
  const requesterId = '58cea6fa0427244eac32c484'; // yield select(makeSelectUsername());
  const requestURL = `${apiUrl}/requesters/${requesterId}/data`;

  const data = action.data;
  data.requester_id = requesterId;

  try {
    // Call our request helper (see 'utils/request')
    const dataRes = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    yield put(createDataSuccess(dataRes));
  } catch (err) {
    yield put(createDataError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* getDataData() {
  // Watches actions and calls saga when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(GET_DATA, getDataSaga);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getPipelineDataData() {
  // Watches actions and calls saga when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(GET_PIPELINE_DATA, getPipelineDataSaga);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* createDataCollectionData() {
  // Watches actions and calls saga when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(CREATE_DATA, createDataCollectionSaga);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  getDataData,
  getPipelineDataData,
  createDataCollectionData,
];
