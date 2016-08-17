/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { mountWithIntl, shallowWithIntl } from 'helpers/intl-enzyme-test-helper.js';

import SettingsComponent from 'components//SettingsComponent.js';

describe('ExportSlidesComponent', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = mountWithIntl(
      <SettingsComponent
        slides={[]}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
      />
    );
  });

  it('should have its component name as default className for the containing div', () => {
    expect(wrapper.find('div.settings-component')).to.have.length(1);
  });
});
