/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { mountWithIntl, shallowWithIntl } from 'helpers/intl-enzyme-test-helper.js';

import ReloaderComponent from 'components//ReloaderComponent.js';

describe('ExportSlidesComponent', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = mountWithIntl(
      <ReloaderComponent
        pointer={1}
        durationLastScreen={5000}
        indexOfLastSlide={5}
      />
    );
  });

  it('should have its component name as default className for the containing div', () => {
    expect(wrapper.find('div.reloader-component')).to.have.length(1);
  });
});
