import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import { IntlProvider } from 'react-intl';
import App from './containers/App';
import messages from './intl/en';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = configureStore();

render(
  <Provider store={store}>
    <IntlProvider locale='en' messages={messages}>
      <MuiThemeProvider muiTheme={getMuiTheme()} className="index">
        <App />
      </MuiThemeProvider>
    </IntlProvider>
  </Provider>,
  document.getElementById('app')
);
