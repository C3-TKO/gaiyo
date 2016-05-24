/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import RotatorComponent from 'components//RotatorComponent.js';

describe('RotatorComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(RotatorComponent, Object.assign({},
      {
        slides: [
          {
            url: 'http://www.example.com',
            duration: 5000
          }
        ]
      })
    )
  });


  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('rotator-component');
  });
});
