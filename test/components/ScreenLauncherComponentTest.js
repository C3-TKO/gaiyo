/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import ScreenLauncherComponent from 'components//ScreenLauncherComponent.js';

describe('ScreenLauncherComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(ScreenLauncherComponent);
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('screenlauncher-component');
  });
});
