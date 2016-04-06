const redux = require('redux');
const reducers = require('../reducers');

import PouchMiddleware from 'pouch-redux-middleware'
import PouchDB from 'pouchdb';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

module.exports = function(initialState) {

  const db = new PouchDB('slides');

  const pouchMiddleware = PouchMiddleware({
    path: '/slides',
    db,
    actions: {
      remove: doc => store.dispatch({type: 'DELETE_SLIDE', id: doc._id}),
      insert: doc => store.dispatch({type: 'INSERT_SLIDE', todo: doc}),
      update: doc => store.dispatch({type: 'UPDATE_SLIDE', todo: doc})
    }
  })

  const store = redux.createStore(reducers, initialState, redux.applyMiddleware(pouchMiddleware));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
