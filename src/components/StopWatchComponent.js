'use strict';

import React from 'react';
import LinearProgress from 'material-ui/lib/linear-progress';

require('styles//StopWatch.scss');

class StopWatchComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      completed : 0,
      steps     : 0,
      timer     : undefined
    };
  }

  componentWillUnmount() {
    this.reset();
  }

  componentWillReceiveProps(nextProps) {
    /* console.log('wrp', nextProps.isPlaying, this.props.slides.pointer, nextProps.slides.pointer); */
    if(!nextProps.slides.isPlaying) {
      this.reset();
    }

    if(nextProps.slides.isPlaying) {
      if (this.props.slides.pointer != nextProps.slides.pointer) {
        this.reset();
      }
      this.setState({
        steps : this.getPercentageSteps(nextProps.slides.collection[nextProps.slides.pointer].timeout),
        timer : setTimeout(() => this.progress(this.state.steps * 2), this.props.watchTimeout)
      });
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
      this.setState({timer : setTimeout(() => this.progress(completed + this.state.steps), this.props.watchTimeout)});
    }
  }

  reset() {
    clearTimeout(this.state.timer);
    this.setState({completed: 0});
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
  slides       : React.PropTypes.object.isRequired,
  watchTimeout : React.PropTypes.number.isRequired
};

StopWatchComponent.defaultProps = {
  watchTimeout: 250
};

export default StopWatchComponent;
