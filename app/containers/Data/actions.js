/*
 *
 * Data actions
 *
 */

import {
  GET_DATA,
  GET_DATA_ERROR,
  GET_DATA_SUCCESS,
  CREATE_DATA,
  CREATE_DATA_ERROR,
  CREATE_DATA_SUCCESS,
  GET_PIPELINE_DATA,
  GET_PIPELINE_DATA_ERROR,
  GET_PIPELINE_DATA_SUCCESS,
} from './constants';

export function getData() {
  return {
    type: GET_DATA,
  };
}
export function getDataSuccess(data) {
  return {
    type: GET_DATA_SUCCESS,
    data,
  };
}
export function getDataError(error) {
  return {
    type: GET_DATA_ERROR,
    error,
  };
}

export function createData(data) {
  return {
    type: CREATE_DATA,
    data,
  };
}
export function createDataSuccess(data) {
  return {
    type: CREATE_DATA_SUCCESS,
    data,
  };
}
export function createDataError(error) {
  return {
    type: CREATE_DATA_ERROR,
    error,
  };
}

export function getPipelineData(service, params) {
  return {
    type: GET_PIPELINE_DATA,
    service,
    params,
  };
}
export function getPipelineDataSuccess(service, data, url) {
  return {
    type: GET_PIPELINE_DATA_SUCCESS,
    service,
    data,
    url,
  };
}
export function getPipelineDataError(error) {
  return {
    type: GET_PIPELINE_DATA_ERROR,
    error,
  };
}
