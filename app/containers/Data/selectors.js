import { createSelector } from 'reselect';

/**
 * Direct selector to the data state domain
 */
const selectDataDomain = () => (state) => state.get('data');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Data
 */

const makeSelectData = () => createSelector(
  selectDataDomain(),
  (substate) => substate.toJS()
);

export default makeSelectData;
export {
  selectDataDomain,
  makeSelectData,
};
