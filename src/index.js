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
        'settingsClose': 'Close',
        'settingsTitle': 'Settings',
        'settingsSnackbar': 'Please add at least one screen to the rotation list!',

        'screenlauncherSubHeader': 'Click to select'
      }
    }>
      <App />
    </IntlProvider>
  </Provider>,
  document.getElementById('app')
);
