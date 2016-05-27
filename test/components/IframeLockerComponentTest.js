/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import React from 'react';
import { shallow } from 'enzyme';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import IframeLockerComponent from 'components//IframeLockerComponent.js';

describe.only('IframeLockerComponent', () => {
  const wrapper = shallow(<IframeLockerComponent />);

  let component;

  beforeEach(() => {
    component = createComponent(IframeLockerComponent, Object.assign({},
      {
        next: () => {},
        prev: () => {}
      })
    )
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('iframelocker-component');
  });
  it('should display a snackbar on touch tap', () => {

  });
  it('should go to the previous screen after swipe left', () => {

  });
  it('should go to the next screen after swipe right', () => {

  });
});
