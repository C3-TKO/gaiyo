/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import React from 'react';
import { shallow } from 'enzyme';
import IframeComponent from 'components//IframeComponent.js';

describe('IframeComponent', () => {
  let component;

  describe('with urlOut equals urlIn', () => {
    beforeEach(() => {
      component = shallow(
        <IframeComponent
          urlOut='http://www.example.com'
          urlIn='http://www.example.com'
        />
      )
    });

    it('should have a single iframe', () => {
      expect(component.prop('children').type).to.equal('iframe')
    });
  });

  describe('with urlOut not equals urlIn', () => {
    beforeEach(() => {
      component = shallow(
        <IframeComponent
          urlOut='http://www.example.com'
          urlIn='http://www.example2.com'
        />
      )
    });

    it('should have two iframes', () => {
      expect(component.prop('children').props.children.length).to.equal(2)
    });
  });
});
