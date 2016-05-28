/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import React from 'react';
import { shallow } from 'enzyme';
import RotatorComponent from 'components//RotatorComponent.js';

describe('RotatorComponent', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <RotatorComponent
        slides={[
          {
            url: 'http://www.example.com',
            duration: 5000
          }
        ]}
      />
    );
  });

  it('should have its component name as default className', () => {
    expect(component.prop('className')).to.equal('rotator-component');
  });
});
