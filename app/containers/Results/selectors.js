import { createSelector } from 'reselect';

/**
 * Direct selector to the results state domain
 */
const selectResultsDomain = () => (state) => state.get('results');
const selectTaskOverviewDomain = () => (state) => state.get('taskOverview');

/**
 * Other specific selectors
 */

const selectSessions = () => createSelector(
  selectResultsDomain,
  (state) => state.get('sessions')
);

const selectError = () => createSelector(
  selectResultsDomain,
  (state) => state.get('error')
);

const makeSelectTaskOverview = () => createSelector(
  selectTaskOverviewDomain(),
  (substate) => substate.toJS()
);


/**
 * Default selector used by Results
 */

const makeSelectResults = () => createSelector(
  selectResultsDomain(),
  (substate) => substate.toJS()
);

export default makeSelectResults;
export {
  selectResultsDomain,
  makeSelectResults,
  selectSessions,
  selectError,
  makeSelectTaskOverview
};
