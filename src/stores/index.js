const { createStore, applyMiddleware, compose} = require('redux');
const reducers = require('../reducers');

import {persistStore, autoRehydrate} from 'redux-persist'
import localForage from 'localForage'
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
    autoRehydrate(),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = finalCreateStore(reducers, initialState);

  const persistStoreConfig = {
    whitelist: ['settings'],
    storage: localForage
  }
  persistStore(store, persistStoreConfig,() => {
    const remoteDbSettings = store.getState().settings;
    const remoteDb = new PouchDB(remoteDbSettings.remoteDbUrl);

    if (remoteDbSettings.enabled) {
      switch (remoteDbSettings.syncMode) {
        case 1:
          db.replicate.from(remoteDb, {
            live: true,
            retry: true
          }).on('change', function (change) {
            console.log('yo, something changed!');
          }).on('paused', function (info) {
            console.log('replication was paused, usually because of a lost connection');
          }).on('active', function (info) {
            console.log('replication was resumed');
          }).on('error', function (err) {
            console.log('totally unhandled error (shouldn\'t happen)');
          });
          break;
        case 2:
          db.replicate.to(remoteDb, {
            live: true,
            retry: true
          }).on('change', function (change) {
            console.log('yo, something changed!');
          }).on('paused', function (info) {
            console.log('replication was paused, usually because of a lost connection');
          }).on('active', function (info) {
            console.log('replication was resumed');
          }).on('error', function (err) {
            console.log('totally unhandled error (shouldn\'t happen)');
          });
          break;
        case 3:
          db.sync(remoteDb, {
            live: true,
            retry: true
          }).on('change', function (change) {
            console.log('yo, something changed!');
          }).on('paused', function (info) {
            console.log('replication was paused, usually because of a lost connection');
          }).on('active', function (info) {
            console.log('replication was resumed');
          }).on('error', function (err) {
            console.log('totally unhandled error (shouldn\'t happen)');
          });
          break;
      }
    }
  });

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
