'use strict';

import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AvSkipPrevious from 'material-ui/svg-icons/av/skip-previous';
import ContentLowPriority from 'material-ui/svg-icons/content/low-priority';
import AvPause from 'material-ui/svg-icons/av/pause';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import AvSkipNext from 'material-ui/svg-icons/av/skip-next';
import KeyBinding from 'react-keybinding-component';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import ScreenLauncher from './ScreenLauncherComponent';
import SettingsComponent from './SettingsComponent';
import { defineMessages, injectIntl } from 'react-intl';

require('styles//Menu.scss');

const messages = defineMessages({
  title: {
    id: 'screenlauncher.title',
    defaultMessage: 'Go to screen'
  },
  closeButton: {
    id: 'screenlauncher.close',
    defaultMessage: 'Close'
  }
});

class MenuComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      screenLauncherModalOpen: false
    };
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
    const {formatMessage} = this.props.intl;

    const actions = [
      <FlatButton
        label={formatMessage(messages.closeButton)}
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <div className='menu-component'>

        <KeyBinding onKey={ (e) => { this.handleControlsByKeyboard(e) } } />

        <div className='main-menu-fab-container'>
          <FloatingActionButton
            disabled={this.props.slides.length === 0}
            mini={true}
            secondary={true}
            onTouchTap={this.handleOpen} >
            <ContentLowPriority />
          </FloatingActionButton>
        </div>

        <div className='main-menu-fab-container'>
          <FloatingActionButton
            disabled={this.props.slides.length === 0}
            mini={true}
            onTouchTap={() => this.props.prev()} >
            <AvSkipPrevious />
          </FloatingActionButton>
        </div>

        <div className='main-menu-fab-container'
          style={this.props.isPlaying ? {display: 'block'} : {display: 'none'}}>
          <FloatingActionButton
            disabled={this.props.slides.length === 0}
            onTouchTap={() => this.props.stop()}>
            <AvPause />
          </FloatingActionButton>
        </div>

        <div className='main-menu-fab-container'
          style={this.props.isPlaying ? {display: 'none'} : {display: 'block'}}>
          <FloatingActionButton
            disabled={this.props.slides.length === 0}
            onTouchTap={() => this.props.play()}>
            <AvPlayArrow />
          </FloatingActionButton>
        </div>

        <div className='main-menu-fab-container'>
          <FloatingActionButton
            disabled={this.props.slides.length === 0}
            mini={true}
            onTouchTap={() => this.props.next()}>
            <AvSkipNext />
          </FloatingActionButton>
        </div>

        <div className='main-menu-fab-container'>
          <SettingsComponent
            slides={this.props.slides}
            settings={this.props.settings}
            actionEditSettings={this.props.actionEditSettings}
            actionAddSlide={this.props.actionAddSlide}
            actionEditSlide={this.props.actionEditSlide}
            actionDeleteSlide={this.props.actionDeleteSlide}
          />
        </div>

        <Dialog
          title={formatMessage(messages.title)}
          actions={actions}
          modal={false}
          open={this.state.screenLauncherModalOpen}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <ScreenLauncher
            goto={this.props.goto}
            handleClose={this.handleClose}
            slides={this.props.slides}
          />
        </Dialog>

      </div>
    );
  }
}

MenuComponent.displayName = 'MenuComponent';
MenuComponent.propTypes = {
  slides: React.PropTypes.array.isRequired,
  isPlaying: React.PropTypes.bool.isRequired,
  play: React.PropTypes.func.isRequired,
  stop: React.PropTypes.func.isRequired,
  next: React.PropTypes.func.isRequired,
  prev: React.PropTypes.func.isRequired,
  goto: React.PropTypes.func.isRequired
};

export default injectIntl(MenuComponent);
