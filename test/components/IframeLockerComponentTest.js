/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { mountWithIntl, shallowWithIntl } from 'helpers/intl-enzyme-test-helper.js';

import IframeLockerComponent from 'components//IframeLockerComponent.js';

describe('IframeLockerComponent', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = mountWithIntl(
      <IframeLockerComponent
        next={() => {}}
        prev={() => {}}
        handleMenuVisibility={() => {}}
      />
    );
  });

  it('should have its component name as default className for the containing div', () => {
    expect(wrapper.find('div.iframelocker-component')).to.have.length(1);
  });

  it.skip('should display a snackbar on touch tap', () => {
    expect(component.state('open')).to.be.false;
    component.find('div').simulate('touchTap');
    expect(component.state('open')).to.be.true;
  });

  it.skip('should go to the previous screen after swipe left', () => {
    expect(prev).calledOnce;
  });

  it.skip('should go to the next screen after swipe right', () => {
    expect(next).calledOnce;
  });

  it.skip('should go to the previous screen after arrow key left pressed', () => {
    expect(prev).calledOnce;
  });

  it.skip('should go to the previous screen after arrow key right pressed', () => {
    expect(next).calledOnce;
  });
});
