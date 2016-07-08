require('normalize.css');
require('styles/App.css');

import React from 'react';
import RotatorComponent from './RotatorComponent';
import SettingsComponent from './SettingsComponent';

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

      <div>
          {this.renderIfSlidesAreDefined()}
          <SettingsComponent
            slides={this.props.slides}
            settings={this.props.settings}
            actionEditSettings={this.props.actions.editSettings}
            actionAddSlide={this.props.actions.addSlide}
            actionEditSlide={this.props.actions.editSlide}
            actionDeleteSlide={this.props.actions.deleteSlide}
          />
      </div>

    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
