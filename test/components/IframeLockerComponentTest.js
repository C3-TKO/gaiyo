/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import React from 'react';
import { shallow } from 'enzyme';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import IframeLockerComponent from 'components//IframeLockerComponent.js';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

describe('IframeLockerComponent', () => {
  let component;
  const next = sinon.spy();
  const prev = sinon.spy();

  beforeEach(() => {
    component = shallow(
      <IframeLockerComponent
        next={next}
        prev={prev}
      />
    );
  });

  it('should have its component name as default className', () => {
    expect(component.prop('className')).to.equal('iframelocker-component');
  });

  it('should display a snackbar on touch tap', () => {
    expect(component.state('open')).to.be.false;
    component.find('div').simulate('touchTap');
    expect(component.state('open')).to.be.ture;
  });

  it.skip('should go to the previous screen after swipe left', () => {
    expect(prev).calledOnce;
  });

  it.skip('should go to the next screen after swipe right', () => {
    expect(next).calledOnce;
  });
});
