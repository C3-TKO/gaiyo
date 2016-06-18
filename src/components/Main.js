require('normalize.css');
require('styles/App.css');

import React from 'react';
import RotatorComponent from './RotatorComponent';
import SettingsComponent from './SettingsComponent';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class AppComponent extends React.Component {

  renderIfSlidesAreDefined() {
    if (this.props.slides.length > 0) {
      return (
        <RotatorComponent
          slides={this.props.slides}
        />
      )
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()} className="index">
      <div>
          {this.renderIfSlidesAreDefined()}
          <SettingsComponent
            slides={this.props.slides}
            settings={this.props.settings}
            actionAddSlide={this.props.actions.addSlide}
            actionEditSlide={this.props.actions.editSlide}
            actionDeleteSlide={this.props.actions.deleteSlide}
          />
      </div>
      </MuiThemeProvider>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
