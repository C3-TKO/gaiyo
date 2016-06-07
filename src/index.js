import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import {IntlProvider} from 'react-intl';
import App from './containers/App';
import messages from './intl/en';

const store = configureStore();

render(
  <Provider store={store}>
    <IntlProvider locale='en' messages={messages}>
      <App />
    </IntlProvider>
  </Provider>,
  document.getElementById('app')
);
