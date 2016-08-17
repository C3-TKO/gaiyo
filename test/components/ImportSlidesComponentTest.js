/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { mountWithIntl, shallowWithIntl } from 'helpers/intl-enzyme-test-helper.js';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ImportSlidesComponent from 'components//ImportSlidesComponent.js';

describe('ImportSlidesComponent', () => {
  let wrapper;
  const mockStore = configureStore();
  const store = mockStore({
    slides: []
  });

  beforeEach(() => {
    wrapper = mountWithIntl(
      <Provider store={store}>
        <ImportSlidesComponent
          slides={[]}
          goto={() => {}}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
        />
      </Provider>
    );
  });

  it('should have its component name as default className for the containing div', () => {
    expect(wrapper.find('div.importslides-component')).to.have.length(1);
  });
});
