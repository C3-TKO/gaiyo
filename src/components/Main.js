require('normalize.css');
require('styles/App.css');

import React from 'react';
import RotatorComponent from './RotatorComponent';
import SettingsComponent from './SettingsComponent';

class AppComponent extends React.Component {

  renderWithFilledCollection() {
    if (this.props.slides.length > 0) {
      return (
        <div>
          <RotatorComponent slides={this.props.slides}/>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="index">
        {this.renderWithFilledCollection()}
        <SettingsComponent
          slides={this.props.slides}
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
