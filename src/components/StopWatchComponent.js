'use strict';

import React from 'react';

require('styles//StopWatch.scss');

class StopWatchComponent extends React.Component {

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps, this.props)
    if(nextProps.timeout !== this.props.timeout) {
      this.reset();
      setTimeout(() => this.setNewTimer(nextProps.duration), 50);
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
      'background': 'red',
      'WebkitTransition': 'width ' + (this.props.duration / 1000) +  's',
      'transition': 'width ' + (this.props.duration / 1000) + 's',
      'width': '100%',
      'height': '4px'
    };

    return (
      <div ref="progressBar" className="stopwatch-component" style={style}/>
    );
  }
}

StopWatchComponent.displayName = 'StopWatchComponent';

StopWatchComponent.propTypes = {
  timeout: React.PropTypes.number,
  duration: React.PropTypes.any
};

export default StopWatchComponent;
