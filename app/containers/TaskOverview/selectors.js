import { createSelector } from 'reselect';

/**
 * Direct selector to the taskOverview state domain
 */
const selectTaskOverviewDomain = () => (state) => state.get('taskOverview');
const selectDataDomain = () => (state) => state.get('data');

/**
 * Other specific selectors
 */

const selectTasks = () => createSelector(
  selectTaskOverviewDomain,
  (state) => state.get('tasks')
);

const selectError = () => createSelector(
  selectTaskOverviewDomain,
  (state) => state.get('error')
);

const makeSelectData = () => createSelector(
  selectDataDomain(),
  (substate) => substate.toJS()
);


/**
 * Default selector used by TaskOverview
 */

const makeSelectTaskOverview = () => createSelector(
  selectTaskOverviewDomain(),
  (substate) => substate.toJS()
);

export default makeSelectTaskOverview;
export {
  selectTaskOverviewDomain,
  selectTasks,
  selectError,
  makeSelectTaskOverview,
  makeSelectData,
};
