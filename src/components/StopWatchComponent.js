'use strict';

import React from 'react';
import LinearProgress from 'material-ui/lib/linear-progress';

require('styles//StopWatch.scss');

class StopWatchComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
      steps: 0
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.progress(this.state.steps * 2), this.props.watchTimeout);
    this.state.steps = this.getPercentageSteps(this.props.slides.collection[this.props.slides.pointer].timeout);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.slides.isPlaying && this.props.slides.pointer != nextProps.slides.pointer) {
      clearTimeout(this.timer);
      this.setState({steps: this.getPercentageSteps(nextProps.slides.collection[nextProps.slides.pointer].timeout)});

      this.timer = setTimeout(() => this.progress(this.state.steps * 2), this.props.watchTimeout);
    }
  }

  getPercentageSteps(totalDurationOfSlide) {
    return Math.round(100 / ( totalDurationOfSlide / this.props.watchTimeout) );
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({completed: 100});
    } else {
      this.setState({completed});
      this.timer = setTimeout(() => this.progress(completed + this.state.steps), this.props.watchTimeout);
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
