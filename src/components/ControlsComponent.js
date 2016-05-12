'use strict';

import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AvSkipPrevious from 'material-ui/svg-icons/av/skip-previous';
import ActionLaunch from 'material-ui/svg-icons/action/launch';
import AvPause from 'material-ui/svg-icons/av/pause';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import AvSkipNext from 'material-ui/svg-icons/av/skip-next';

import KeyBinding from 'react-keybinding-component';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/dialog';
import ScreenLauncher from './ScreenLauncherComponent';

require('styles//Controls.scss');

class ControlsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      screenLauncherModalOpen: false
    };
  }

  componentDidMount() {
    this.props.play();
  }

  handleOpen = () => {
    this.setState({
      screenLauncherModalOpen: true
    })
  }

  handleClose = () => {
    this.setState({
      screenLauncherModalOpen: false
    })
  }

  handleControlsByKeyboard = (e) => {
    switch(e.keyCode) {
      case 39: // Arrow right
        this.props.next();
        return 0;
      case 37: // Arrow left
        this.props.prev();
        return 0;
      case 40: // Arrow down
        this.handleOpen();
        return 0;
      case 32: // Space
        if(this.props.isPlaying) {
          this.props.stop();
        }
        else {
          this.props.play();
        }
        return 0;
    }
  }


  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <div className="controls-component">

        <KeyBinding onKey={ (e) => { this.handleControlsByKeyboard(e) } } />

        <div className="controls-button-container">
          <FloatingActionButton mini={true} onTouchTap={() => this.props.prev()} >
            <AvSkipPrevious />
          </FloatingActionButton>
        </div>

        <div className="controls-button-container">
          <FloatingActionButton mini={true} onTouchTap={this.handleOpen} >
            <ActionLaunch />
          </FloatingActionButton>
        </div>

        <div className="controls-button-container" style={this.props.isPlaying ? {display: 'block'} : {display: 'none'}}>
          <FloatingActionButton mini={true} onTouchTap={() => this.props.stop()}>
            <AvPause />
          </FloatingActionButton>
        </div>

        <div className="controls-button-container" style={this.props.isPlaying ? {display: 'none'} : {display: 'block'}}>
          <FloatingActionButton mini={true} onTouchTap={() => this.props.play()}>
            <AvPlayArrow />
          </FloatingActionButton>
        </div>

        <div className="controls-button-container">
          <FloatingActionButton mini={true} onTouchTap={() => this.props.next()}>
            <AvSkipNext />
          </FloatingActionButton>
        </div>

        <Dialog
          title="Go to screen"
          actions={actions}
          modal={false}
          open={this.state.screenLauncherModalOpen}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <ScreenLauncher
            goto={this.props.goto}
            handleClose={this.handleClose}
            subHeader="Click to select"
            slides={this.props.slides}
          />
        </Dialog>

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
  prev: React.PropTypes.func.isRequired,
  goto: React.PropTypes.func.isRequired
};

export default ControlsComponent;
