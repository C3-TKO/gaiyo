/**
 * @see: https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl#enzyme
 */
import React from 'react';
import { IntlProvider, intlShape } from 'react-intl';
import { mount, shallow } from 'enzyme';
//import messages from './intl/en';

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

export default {
  shallowWithIntl(node) {
    return shallow(nodeWithIntlProp(node), { context: { intl } });
  },

  mountWithIntl(node) {
    return mount(nodeWithIntlProp(node), {
      context: { intl },
      childContextTypes: { intl: intlShape }
    });
  }
};
