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

        'screenlauncherSubHeader': 'Click to select',

        'editslideformLabelUrl': 'Url (required)',
        'editslideformErrorUrl': 'Please enter a valid url',
        'editslideformLabelDuration': 'Duration in seconds (required)',
        'editslideformErrorDuration': 'Please enter a valid duration',

        'screenlauncherTitle': 'Go to screen',
        'screenlauncherClose': 'Close',

        'editslideformTitle': 'Edit slide',
        'editslideformSubHeader': 'Screen rotation list',
        //'editslideformSecondaryText': '(slide.duration / 1000) seconds',
        'editslideformButtonUpdate': 'Update',
        'editslideformButtonCancel': 'Cancel',
        'editslideformButtonDelete': 'Delete',
        'editslideformButtonEdit': 'Edit',
        'editslideformButtonMore': 'more'
      }
    }>
      <App />
    </IntlProvider>
  </Provider>,
  document.getElementById('app')
);
