'use strict';

import React from 'react';
import LinearProgress from 'material-ui/lib/linear-progress';

require('styles//StopWatch.scss');

class StopWatchComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.progress(10), this.props.watchTimeout);
  }

  componentWillUnmount() {
    console.log('GOVNO');
    clearTimeout(this.timer);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.slides.isPlaying && this.props.slides.pointer != nextProps.slides.pointer) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.progress(10), this.props.watchTimeout);
    }
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({completed: 100});
      this.for
    } else {
      this.setState({completed});
      this.timer = setTimeout(() => this.progress(completed + 5), this.props.watchTimeout);
    }
  }

  render() {
    return (
      <div className="stopwatch-component">
        <LinearProgress mode="determinate" value={this.state.completed} />
      </div>
    );
  }
}

StopWatchComponent.displayName = 'StopWatchComponent';

StopWatchComponent.propTypes = {
  slides : React.PropTypes.object.isRequired,
  watchTimeout : React.PropTypes.number.isRequired
};

StopWatchComponent.defaultProps = {
  watchTimeout: 250
};

export default StopWatchComponent;
