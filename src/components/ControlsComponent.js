'use strict';

import React from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import AvSkipPrevious from 'material-ui/lib/svg-icons/av/skip-previous';
import AvPause from 'material-ui/lib/svg-icons/av/pause';
import AvPlayArrow from 'material-ui/lib/svg-icons/av/play-arrow';
import AvSkipNext from 'material-ui/lib/svg-icons/av/skip-next';

require('styles//Controls.scss');

class ControlsComponent extends React.Component {

  componentDidMount() {
    this.props.play();
  }

  render() {
    return (
      <div className="controls-component">

        <div className="controls-button-container">
          <FloatingActionButton mini={true} onMouseDown={() => this.props.previous()} >
            <AvSkipPrevious />
          </FloatingActionButton>
        </div>

        <div className="controls-button-container" style={!this.props.isPlaying ? {display: 'none'} : {display: 'block'}}>
          <FloatingActionButton mini={true} onMouseDown={() => this.props.stop()}>
            <AvPause />
          </FloatingActionButton>
        </div>

        <div className="controls-button-container" style={this.props.isPlaying ? {display: 'none'} : {display: 'block'}}>
          <FloatingActionButton mini={true} onMouseDown={() => this.props.play()}>
            <AvPlayArrow />
          </FloatingActionButton>
        </div>

        <div className="controls-button-container">
          <FloatingActionButton mini={true} onMouseDown={() => this.props.next()}>
            <AvSkipNext />
          </FloatingActionButton>
        </div>

      </div>
    );
  }
}

ControlsComponent.displayName = 'ControlsComponent';
ControlsComponent.propTypes = {
  slides: React.PropTypes.array.isRequired,
  isPlaying: React.PropTypes.bool.isRequired,
  play: React.PropTypes.func.isRequired,
  stop: React.PropTypes.func.isRequired,
  next: React.PropTypes.func.isRequired,
  previous: React.PropTypes.func.isRequired
};

export default ControlsComponent;
