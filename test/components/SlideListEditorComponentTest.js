/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { mountWithIntl, shallowWithIntl } from 'helpers/intl-enzyme-test-helper.js';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import * as SyncStates from '../../src/constants/SyncStates.js'
import SlideListEditorComponent from 'components//SlideListEditorComponent.js';

describe('SlideListEditorComponent', () => {
  let wrapper;
  const mockStore = configureStore();
  const store = mockStore({
    slides: [],
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
        <SlideListEditorComponent />
      </Provider>
    );
  });

  it('should have its component name as default className for the containing div', () => {
    expect(wrapper.find('div.slidelisteditor-component')).to.have.length(1);
  });
});
