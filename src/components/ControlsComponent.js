'use strict';

import React from 'react';

require('styles//Controls.scss');

class ControlsComponent extends React.Component {

  renderStopButton() {
    if (this.props.isPlaying) {
      return <button id="stop">Stop</button>
    }

    return <button id="stop" style={{display: 'none'}}>Stop</button>

  }

  renderPlayButton() {
    if (this.props.isPlaying) {
      return <button id="play" style={{display: 'none'}}>Play</button>
    }

    return <button id="play">Play</button>
  }

  render() {
    return (
      <div className="controls-component">
          <button id="rewind">Rewind</button>
          {this.renderStopButton()}
          {this.renderPlayButton()}
          <button id="forward">Forward</button>
      </div>
    );
  }
}

ControlsComponent.displayName = 'ControlsComponent';

ControlsComponent.propTypes = {
  isPlaying : React.PropTypes.bool
};

ControlsComponent.defaultProps = {
  isPlaying : true
};

export default ControlsComponent;
