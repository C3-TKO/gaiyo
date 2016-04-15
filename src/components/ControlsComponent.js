'use strict';

import React from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import AvSkipPrevious from 'material-ui/lib/svg-icons/av/skip-previous';
import AvPause from 'material-ui/lib/svg-icons/av/pause';
import AvPlayArrow from 'material-ui/lib/svg-icons/av/play-arrow';
import AvSkipNext from 'material-ui/lib/svg-icons/av/skip-next';

require('styles//Controls.scss');

class ControlsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pointer: 0,
      isPlaying: false,
      timeout: undefined
    };
  }

  componentDidMount() {
    this.play();
  }

  /*
  componentWillReceiveProps(nextProps) {
    if(nextProps.slides.isPlaying && this.props.slides.pointer != nextProps.slides.pointer) {
      this.props.play(setTimeout(() => this.props.next(), nextProps.slides[nextProps.control.pointer].duration));
    }
  }
  */

  play = () => {
    clearTimeout(this.state.timeout);
    this.setState({
      isPlaying: true,
      timeout: undefined
    })
    //nextState.timeout = action.timeout;
  }

  stop = () => {
    clearTimeout(this.state.timeout);
    this.setState({
      isPlaying: false,
      timeout: undefined
    })
  }

  next = () => {
    let nextPointer = this.state.pointer
    if(++nextPointer >= this.props.slides.length) {
      this.setState({pointer: 0})
    }
    else {
      this.setState({pointer: nextPointer})
    }
  }

  previous = () => {
    let nextPointer = this.state.pointer
    if(--nextPointer < 0) {
      this.setState({pointer: this.props.slides.length - 1})
    }
    else {
      this.setState({pointer: nextPointer})
    }
  }

  render() {
    return (
      <div className="controls-component">

        <div className="controls-button-container">
          <FloatingActionButton mini={true} onMouseDown={() => this.previous} >
            <AvSkipPrevious />
          </FloatingActionButton>
        </div>

        <div className="controls-button-container" style={!this.state.isPlaying ? {display: 'none'} : {display: 'block'}}>
          <FloatingActionButton mini={true} onMouseDown={() => this.stop()}>
            <AvPause />
          </FloatingActionButton>
        </div>

        <div className="controls-button-container" style={this.state.isPlaying ? {display: 'none'} : {display: 'block'}}>
          <FloatingActionButton mini={true} onMouseDown={() => this.play()}>
            <AvPlayArrow />
          </FloatingActionButton>
        </div>

        <div className="controls-button-container">
          <FloatingActionButton mini={true} onMouseDown={() => this.next()}>
            <AvSkipNext />
          </FloatingActionButton>
        </div>

      </div>
    );
  }
}

ControlsComponent.displayName = 'ControlsComponent';

ControlsComponent.propTypes = {
  slides:   React.PropTypes.array.isRequired
};

export default ControlsComponent;
