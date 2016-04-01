'use strict';

import React from 'react';

require('styles//Controls.scss');

class ControlsComponent extends React.Component {

  componentDidMount() {
    this.props.play(setTimeout(() => this.props.next(), this.props.slides.collection[this.props.slides.pointer].timeout));
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props.slides, nextProps.slides);
    if(nextProps.slides.isPlaying && this.props.slides.pointer != nextProps.slides.pointer) {
      clearTimeout(this.props.slides.timeout);
      this.props.play(setTimeout(() => this.props.next(), nextProps.slides.collection[nextProps.slides.pointer].timeout));
    }
  }


  renderStopButton() {
    if (this.props.slides.isPlaying) {
      return <button id="stop" onClick={() => this.props.stop()}>Stop</button>
    }

    return <button id="stop" style={{display: 'none'}} onClick={() => this.props.stop()}>Stop</button>

  }

  renderPlayButton() {
    if (this.props.slides.isPlaying) {
      return <button id="play" style={{display: 'none'}} onClick={() => this.props.play()}>Play</button>
    }

    return <button id="play" onClick={() => this.props.play()}>Play</button>
  }

  render() {
    return (
      <div className="controls-component">
          <button id="previous" onClick={() => this.props.previous()}>Previous</button>
          {this.renderStopButton()}
          {this.renderPlayButton()}
          <button id="next" onClick={() => this.props.next()}>Next</button>
      </div>
    );
  }
}

ControlsComponent.displayName = 'ControlsComponent';

ControlsComponent.propTypes = {
  slides :   React.PropTypes.object.isRequired,
  previous : React.PropTypes.func,
  stop :     React.PropTypes.func,
  play :     React.PropTypes.func,
  next :     React.PropTypes.func
};

export default ControlsComponent;
