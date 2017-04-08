// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage/reducer'),
          import('containers/HomePage/sagas'),
          import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('home', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/tasks',
      name: 'taskOverview',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/TaskOverview/reducer'),
          import('containers/TaskOverview/sagas'),
          import('containers/TaskOverview'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('taskOverview', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/results',
      name: 'results',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/TaskOverview/reducer'),
          import('containers/TaskOverview/sagas'),
          import('containers/Results/reducer'),
          import('containers/Results/sagas'),
          import('containers/Results'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([taskReducer, taskSagas, reducer, sagas, component]) => {
          injectReducer('taskOverview', taskReducer.default);
          injectSagas(taskSagas.default);
          injectReducer('results', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
