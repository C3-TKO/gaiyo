'use strict';

import React from 'react';

require('styles//ProgessBar.scss');

class ProgessBarComponent extends React.Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.timeout !== this.props.timeout) {
      this.reset();
      if(nextProps.isPlaying) {
        setTimeout(() => this.setNewTimer(nextProps.duration), 50);
      }
    }
  }

  reset() {
    this.progressBarRef.style.WebkitTransition = 'none';
    this.progressBarRef.style.transition = 'none';
    this.progressBarRef.style.width = '0';
  }

  setNewTimer() {
    this.progressBarRef.style.WebkitTransition = 'width ' + (this.props.duration / 1000) +  's';
    this.progressBarRef.style.transition = 'width ' + (this.props.duration / 1000) +  's';
    this.progressBarRef.style.width = '100%';
  }

  render() {
    const style = {
      'background': this.context.muiTheme.palette.accent1Color,
      'WebkitTransition': 'width ' + (this.props.duration / 1000) +  's',
      'transition': 'width ' + (this.props.duration / 1000) + 's',
      'width': '100%',
      'height': '4px',
      'position': 'absolute'
    };

    return (
      <div
        ref={(c) => this.progressBarRef = c}
        className='progressbar-component'
        style={style}
      />
    );
  }
}

ProgessBarComponent.displayName = 'ProgressBarComponent';

ProgessBarComponent.propTypes = {
  isPlaying: React.PropTypes.bool.isRequired,
  timeout: React.PropTypes.number,
  duration: React.PropTypes.any
};

ProgessBarComponent.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

export default ProgessBarComponent;
