/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import IframeComponent from 'components//IframeComponent.js';

describe('IframeComponent', () => {
  let component;

  describe('with urlOut equals urlIn', () => {
    beforeEach(() => {
      component = createComponent(IframeComponent, Object.assign({},
        {
          urlOut: 'http://www.example.com',
          urlIn: 'http://www.example.com'
        })
      )
    });

    it('should have single iframe', () => {
      expect(component.props.children.props.className).to.equal('iframe-component')
    });
  });

  describe('with urlOut not equals urlIn', () => {
    beforeEach(() => {
      component = createComponent(IframeComponent, Object.assign({},
        {
          urlOut: 'http://www.example.com',
          urlIn: 'http://www.example2.com'
        })
      )
    });

    it('should have two iframes', () => {
      expect(component.props.children.length).to.equal(2)
    });
  });
});
