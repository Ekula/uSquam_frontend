
import { fromJS } from 'immutable';
import taskOverviewReducer from '../reducer';

describe('taskOverviewReducer', () => {
  it('returns the initial state', () => {
    expect(taskOverviewReducer(undefined, {})).toEqual(fromJS({}));
  });
});
