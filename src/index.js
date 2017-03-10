import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import { IntlProvider } from 'react-intl';
import App from './containers/App';
import messages from './intl/en';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store = configureStore();

const MuiTheme = getMuiTheme({
  palette: {
    primary1Color: '#005e34',
    accent1Color: '#ffa800',
    textColor: '#005e34'
  }
});

render(
  <Provider store={store}>
    <IntlProvider locale='en' messages={messages}>
      <MuiThemeProvider muiTheme={MuiTheme}>
        <App />
      </MuiThemeProvider>
    </IntlProvider>
  </Provider>,
  document.getElementById('app')
);
