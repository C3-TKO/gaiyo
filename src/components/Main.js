require('normalize.css');
require('styles/App.css');

import React from 'react';
import RotatorComponent from './RotatorComponent';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class AppComponent extends React.Component {
  render() {
    const {actions, slides, settings} = this.props;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()} className="index">
      <div>
        <RotatorComponent
          actions={actions}
          slides={slides}
          settings={settings}
        />
      </div>
      </MuiThemeProvider>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
