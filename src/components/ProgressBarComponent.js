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
    this.refs.progressBar.style.WebkitTransition = 'none';
    this.refs.progressBar.style.transition = 'none';
    this.refs.progressBar.style.width = '0';
  }

  setNewTimer() {
    this.refs.progressBar.style.WebkitTransition = 'width ' + (this.props.duration / 1000) +  's';
    this.refs.progressBar.style.transition = 'width ' + (this.props.duration / 1000) +  's';
    this.refs.progressBar.style.width = '100%';
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
      <div ref="progressBar"
        className="porgressbar-component"
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
