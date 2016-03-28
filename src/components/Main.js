require('normalize.css');
require('styles/App.css');

import React from 'react';
import IframeComponent from './IframeComponent';
import ControlsComponent from './ControlsComponent';

class AppComponent extends React.Component {
  render() {
    debugger;
    return (
      <div className="index">
        <IframeComponent slide={this.props.slides.collection[this.props.slides.pointer]}/>
        <ControlsComponent slides={this.props.slides}/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
