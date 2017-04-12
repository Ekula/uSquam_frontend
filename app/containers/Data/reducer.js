/*
 *
 * Data reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_DATA_SUCCESS, GET_DATA_ERROR,
  GET_PIPELINE_DATA_SUCCESS, GET_PIPELINE_DATA_ERROR,
  CREATE_DATA_SUCCESS, CREATE_DATA_ERROR,
} from './constants';

const initialState = fromJS({
  data: [],
  pipeline: {
    crawlTwitter: {
      results: [],
    },
    crawlFlickr: {
      results: [],
    },
    crawlImgur: {
      results: [],
    },
  },
});

function dataReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_SUCCESS:
      return state.set('data', action.data).set('error', undefined);
    case GET_DATA_ERROR:
      return state.set('error', action.error);
    case CREATE_DATA_SUCCESS:
      return state.update('data', (arr) => arr.concat(action.data)).set('error', undefined);
    case CREATE_DATA_ERROR:
      return state.set('error', action.error);
    case GET_PIPELINE_DATA_SUCCESS:
      return state
        .setIn(['pipeline', action.service, 'results'], action.data.results)
        .setIn(['pipeline', action.service, 'url'], action.url)
        .set('error', undefined);
    case GET_PIPELINE_DATA_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default dataReducer;
