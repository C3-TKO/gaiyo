/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import React from 'react';
import { shallow } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MenuComponent from 'components//MenuComponent.js';

describe('MenuComponent', () => {
  const muiTheme = getMuiTheme();
  let component;

  beforeEach(() => {
    component = shallow(
      <MenuComponent
        slides={[
          {
            url: 'http://www.example.com',
            duration: 5000
          }
        ]}
        play={() => {}}
        stop={() => {}}
        next={() => {}}
        prev={() => {}}
        goto={() => {}}
        isPlaying={true}
      />, { context: { muiTheme } }
    )
  });

  it('should have its component name as default className', () => {
    expect(component.prop('className')).to.equal('menu-component');
  });
});
