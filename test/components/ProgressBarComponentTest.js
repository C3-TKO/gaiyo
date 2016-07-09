/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import ProgressBarComponent from 'components//ProgressBarComponent.js';

describe('ProgressBarComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(ProgressBarComponent, Object.assign({},
      {
        isPlaying: true
      })
    )
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('progressbar-component');
  });
});
