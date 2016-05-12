require('normalize.css');
require('styles/App.css');

import React from 'react';
import RotatorComponent from './RotatorComponent';
import SettingsComponent from './SettingsComponent';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class AppComponent extends React.Component {

  renderWithFilledCollection() {
    if (this.props.slides.length > 0) {
      return (
        <div>
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <RotatorComponent slides={this.props.slides}/>
          </MuiThemeProvider>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="index">
        {this.renderWithFilledCollection()}
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <SettingsComponent
            slides={this.props.slides}
            actionAddSlide={this.props.actions.addSlide}
            actionEditSlide={this.props.actions.editSlide}
            actionDeleteSlide={this.props.actions.deleteSlide}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
