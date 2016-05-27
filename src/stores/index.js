const { createStore, applyMiddleware, compose} = require('redux');
const reducers = require('../reducers');

import PouchMiddleware from 'pouch-redux-middleware'
import PouchDB from 'pouchdb';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

module.exports = function(initialState) {

  const db = new PouchDB('slides');

  const pouchMiddleware = PouchMiddleware({
    path: '/slides',
    db,
    actions: {
      remove: doc => store.dispatch({type: 'DELETE_SLIDE', id: doc._id}),
      insert: doc => store.dispatch({type: 'INSERT_SLIDE', slide: doc}),
      update: doc => store.dispatch({type: 'UPDATE_SLIDE', slide: doc})
    }
  })

  const finalCreateStore = compose(
    applyMiddleware(pouchMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = finalCreateStore(reducers, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
