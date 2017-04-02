/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';




export const GET_DATA = 'usquam/App/GET_DATA';
export const GET_DATA_SUCCESS = 'usquam/App/GET_DATA_SUCCESS';
export const GET_DATA_ERROR = 'usquam/App/GET_DATA_ERROR';

export const REGISTER = 'usquam/App/REGISTER';
export const REGISTER_SUCCESS = 'usquam/App/REGISTER_SUCCESS';
export const REGISTER_ERROR = 'usquam/App/REGISTER_ERROR';
