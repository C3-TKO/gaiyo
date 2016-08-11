const { createStore, applyMiddleware, compose} = require('redux');
const reducers = require('../reducers');

import {persistStore, autoRehydrate} from 'redux-persist'
import localForage from 'localforage'
import PouchMiddleware from 'pouch-redux-middleware'
import PouchDB from 'pouchdb';
import PouchDBAuthentication from 'pouchdb-authentication';
PouchDB.plugin(PouchDBAuthentication);
import updateSyncStateAction from '../actions/updateSyncState.js'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || undefined;
}

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
    const remoteDbSettingsFromStore = store.getState().settings;

    const remoteDbSettingsFromUrl = {
      remoteDbUrl: getURLParameter('remoteDbUrl'),
      remoteDbUser: parseInt(getURLParameter('remoteDbUser')),
      remoteDbPassowrd: parseInt(getURLParameter('remoteDbPassword')),
      syncMode: parseInt(getURLParameter('syncMode')),
      enabled: true
    }

    let remoteDbSettings = remoteDbSettingsFromStore;

    // Checking if there are url parameters in order to override the remote database settings from the store
    // Note: Only url and syncMode need to be set, as user and password are optional and only be used with remote
    // databases with restricted access
    if (typeof remoteDbSettingsFromUrl.remoteDbUrl !== 'undefined' &&
        typeof remoteDbSettingsFromUrl.syncMode !== 'undefined' ) {
      remoteDbSettings = remoteDbSettingsFromUrl;
    }

    if (remoteDbSettings.enabled) {
      const remoteDb = new PouchDB(remoteDbSettings.remoteDbUrl, {skipSetup: true});
      // Clearing a previously created session
      remoteDb.logout();

      //var db = new PouchDB('http://localhost:5984/mydb', {skipSetup: true});
      // Trying to authenticate against the remote database if necessary
      if (typeof remoteDbSettings.remoteDbUser !== 'undefined' &&
        typeof remoteDbSettings.remoteDbPassword !== 'undefined' ) {
        remoteDb.login(remoteDbSettings.remoteDbUser, remoteDbSettings.remoteDbPassword, function (err, response) {
          if (err) {
            if (err.name === 'unauthorized') {
              // name or password incorrect
            } else {
              // cosmic rays, a meteor, etc.
            }
          }
        });
      }

      switch (remoteDbSettings.syncMode) {
        case 1:
          db.replicate.from(remoteDb, {
            live: true,
            retry: true
          })
            .on('change', function (change) {
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
          })
            .on('change', function (change) {
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
          })
          .on('change', function () {
            store.dispatch(updateSyncStateAction('CHANGE'));
            console.log('yo, something changed!');
          }).on('paused', function () {
            store.dispatch(updateSyncStateAction('PAUSED'));
            console.log('replication was paused, usually because of a lost connection');
          }).on('active', function () {
            store.dispatch(updateSyncStateAction('ACTIVE'));
            console.log('replication was resumed');
          }).on('error', function () {
            store.dispatch(updateSyncStateAction('ERROR'));
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
