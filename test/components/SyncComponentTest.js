/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { mountWithIntl, shallowWithIntl } from 'helpers/intl-enzyme-test-helper.js';
import * as SyncStates from '../../src/constants/SyncStates.js'
import SyncComponent from 'components//SyncComponent.js';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('SyncComponent', () => {

  let wrapper;
  const mockStore = configureStore();

  const store = mockStore({
    settings: {
      remoteDbUrl: undefined,
      remoteDbUser: undefined,
      remoteDbPassword: undefined,
      syncMode: 1,
      enabled: false
    },
    syncState: {
      status: SyncStates.NOT_CONNECTED
    }
  });

  beforeEach(() => {
    wrapper = mountWithIntl(
      <Provider store={store}>
        <SyncComponent />
      </Provider>
    );
  });

  it('should have its component name as default className for the containing div', () => {
    expect(wrapper.find('div.sync-component')).to.have.length(1);
  });
});
