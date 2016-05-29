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

  it('should reset the slide pointer if it is out bounds after deletion of a slide', () => {

  });

  describe('Screen rotator controls', () => {
    let component;

    beforeEach(() => {
      component = shallow(
        <RotatorComponent
          slides={[
            {
              url: 'http://www.example.com',
              duration: 5000
            },
            {
              url: 'http://smash.cologne',
              duration: 5000
            },
            {
              url: 'http://127.0.0.1',
              duration: 5000
            }
        ]}
        />
      );
    });

    it('should start the timeouted display of the current screen on play()', () => {

    });

    it('should pause the screen rotation on stop()', () => {

    });

    it('should show the following screen in list on next()', () => {

    });

    it('should show the previous screen in list on prev()', () => {

    });

    it('should go to a specific screen on goto() call using the slide id', () => {

    });

    describe('Inifinite looping', () => {

      let component;

      beforeEach(() => {
        component = shallow(
          <RotatorComponent
            ref='test'
            slides={[
            {
              url: 'http://www.example.com',
              duration: 5000
            },
            {
              url: 'http://smash.cologne',
              duration: 5000
            },
            {
              url: 'http://127.0.0.1',
              duration: 5000
            }
        ]}
          />
        ), component.instance().next();
      });

      it.only('should start over with the first screen in list after the last one has been displayed', () => {
        component.setState({
          pointer: 2
        });
        component.next();
        console.log(component.state());
      });

      it('should load last screen of list if using prev() while displaying the very first screen', () => {

      });
    });
  });
});
