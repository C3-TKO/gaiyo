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
    this.props.play(setTimeout(() => this.props.next(), this.props.slides.collection[this.props.slides.pointer].timeout));
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.slides.isPlaying && this.props.slides.pointer != nextProps.slides.pointer) {
      clearTimeout(this.props.slides.timeout);
      this.props.play(setTimeout(() => this.props.next(), nextProps.slides.collection[nextProps.slides.pointer].timeout));
    }
  }

  render() {
    return (
      <div className="controls-component">

        <div className="controls-button-container">
          <FloatingActionButton mini={true} onMouseDown={() => this.props.previous()} >
            <AvSkipPrevious />
          </FloatingActionButton>
        </div>

        <div className="controls-button-container">
          <FloatingActionButton mini={true} onMouseDown={() => this.props.stop()}>
            <AvPause />
          </FloatingActionButton>
        </div>

        <div className="controls-button-container">
          <FloatingActionButton mini={true} onMouseDown={() => this.props.play(setTimeout(() => this.props.next(), this.props.slides.collection[this.props.slides.pointer].timeout))}>
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
  slides :   React.PropTypes.object.isRequired,
  previous : React.PropTypes.func.isRequired,
  stop :     React.PropTypes.func.isRequired,
  play :     React.PropTypes.func.isRequired,
  next :     React.PropTypes.func.isRequired
};

export default ControlsComponent;
