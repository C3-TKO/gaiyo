/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import React from 'react';
import { mount } from 'enzyme';
import ControlsComponent from 'components//ControlsComponent.js';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { IntlProvider, intlShape } from 'react-intl';

const messages = {};

// Create the IntlProvider to retrieve context for wrapping around.
const intlProvider = new IntlProvider({ locale: 'en', messages }, {});
const { intl } = intlProvider.getChildContext();

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
function nodeWithIntlProp(node) {
  return React.cloneElement(node, { intl });
}


describe.skip('ControlsComponent', () => {
  let component;

  /*
  beforeEach(() => {
    component = createComponent(ControlsComponent, Object.assign({},
      {
        slides: [
          {
            url: 'http://www.example.com',
            duration: 5000
          }
        ],
        isPlaying: true,

        play: () => {},
        stop: () => {},
        next: () => {},
        prev: () => {},
        goto: () => {}
      })
    )
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('controls-component');
  });
  */

  /*
  beforeEach(() => {
    component = shallow(
      nodeWithIntlProp(
        <ControlsComponent
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
        />
      ), { context: { intl } })
  });
  */
  const muiTheme = getMuiTheme();

  beforeEach(() => {
    component = mount(
      <ControlsComponent
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
      />, { context: { intl, muiTheme } }
    )
  });


  it('should have its component name as default className', () => {
    console.log(component.prop('className'));
    expect(component.prop('className')).to.equal('controls-component');
  });
});
