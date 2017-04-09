
import { fromJS } from 'immutable';
import dataReducer from '../reducer';

describe('dataReducer', () => {
  it('returns the initial state', () => {
    expect(dataReducer(undefined, {})).toEqual(fromJS({}));
  });
});
