// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
}

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default)
}

import { connect } from 'react-redux'

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  const loadContainer = (name, reducerName) => {
    const importModules = Promise.all([
      import(`containers/${name}/reducer`),
      import(`containers/${name}/sagas`)
    ])

    importModules.then(([reducer, sagas]) => {
      injectReducer(reducerName, reducer.default)
      injectSagas(sagas.default)
    })

    importModules.catch(errorLoading)
    return importModules
  }


  const loadModule2 = cb => componentModule => {
    const Component = componentModule.default
    if (store.getState().get('animation').animating) {
      let unsubscribe
      const callback = (...args) => {
        if (store.getState().get('animation').animating === false) {
          cb(null, Component)
          unsubscribe()
        }
      }
      unsubscribe = store.subscribe(callback)
    } else {
      return cb(null, Component)
    }
  }

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          loadContainer('Animation', 'animation').then(() => import('containers/HomePage').then(loadModule(cb)))
        ]);

        importModules.catch(errorLoading);
      },
    }, {
      path: 'joke/:id',
      name: 'joke',
      getComponent(location, cb) {
        loadContainer('Animation', 'animation')
          .then(_ =>
            import('containers/JokePage')
              .then(loadModule2(cb))
              .catch(errorLoading)
            )
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
