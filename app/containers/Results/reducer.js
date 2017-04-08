/*
 *
 * Results reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_ERROR,
} from './constants';

const initialState = fromJS({
  sessions: [],
});

function resultsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SESSIONS_SUCCESS:
      return state.set('sessions', action.sessions).set('error', undefined);
    case GET_SESSIONS_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default resultsReducer;
