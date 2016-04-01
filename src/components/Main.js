require('normalize.css');
require('styles/App.css');

import React from 'react';
import IframeComponent from './IframeComponent';
import ControlsComponent from './ControlsComponent';
import StopWatchComponent from './StopWatchComponent';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <IframeComponent slide={this.props.slides.collection[this.props.slides.pointer]}/>
        <ControlsComponent slides={this.props.slides} {...this.props.actions}/>
        <StopWatchComponent slides={this.props.slides}/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
