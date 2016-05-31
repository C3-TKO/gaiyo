import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import {IntlProvider} from 'react-intl';
import App from './containers/App';

const store = configureStore();

render(
  <Provider store={store}>
    <IntlProvider locale='en' messages={
      {
        'close': 'Close-I18n',
        'settingsTitle': 'Settings-I18n',
        'settingsSnackbar': 'Please add at least one screen to the rotation list!-I18n'
      }
    }>
      <App />
    </IntlProvider>
  </Provider>,
  document.getElementById('app')
);
