/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import React from 'react';
import { shallow } from 'enzyme';

import ProgressBarComponent from 'components//ProgressBarComponent.js';

describe.only('ProgressBarComponent', () => {
  const muiTheme = getMuiTheme();

  let component;

  beforeEach(() => {

    component = shallow(
      <ProgressBarComponent
        isPlaying={true}
      />,
      {context: {muiTheme}}
    )
  });

  it('should have its component name as default className', () => {
    expect(component.prop('className')).to.equal('progressbar-component');
  });
});
