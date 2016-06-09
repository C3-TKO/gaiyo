/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import SlideListEditorComponent from 'components//SlideListEditorComponent.js';

describe.skip('SlideListEditorComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(SlideListEditorComponent, Object.assign({},
      {
        slides: [
          {
            url: 'http://www.example.com',
            duration: 5000
          }
        ],
        onDelete: () => {},
        onEdit: () => {},
        onAdd: () => {}
      })
    )
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('slidelisteditor-component');
  });
});
