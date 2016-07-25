'use strict';

import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AvSkipPrevious from 'material-ui/svg-icons/av/skip-previous';
import AvPause from 'material-ui/svg-icons/av/pause';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import AvSkipNext from 'material-ui/svg-icons/av/skip-next';
import KeyBinding from 'react-keybinding-component';
import ScreenLauncherComponent from './ScreenLauncherComponent';
import SettingsComponent from './SettingsComponent';
import Snackbar from 'material-ui/Snackbar';
import IframeLockerComponent from './IframeLockerComponent';

const debounce = require('lodash.debounce');
const throttle = require('lodash.throttle');

require('styles//Menu.scss');

class MenuComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false
    }
  }

  componentWillMount() {
    this.showMenu = throttle(this.showMenu, this.props.throttleDuration);
    this.hideMenu = debounce(this.hideMenu, this.props.debounceDuration);
  }

  showMenu = () => {
    this.setState({
      menuVisible: true
    })
    this.mainMenuRef.style = {animation: 'menu-swift-drop .375s forwards', transitionTimingFunction: 'cubic-bezier(.4, 0, .2, 1)'}
  }

  hideMenu = () => {
    this.setState({
      menuVisible: false
    })
    this.mainMenuRef.style = {animation: 'menu-swift-lift .375s forwards', transitionTimingFunction: 'cubic-bezier(.4, 0, .2, 1)'}
  }

  handleMenuVisibility = () => {
    if(this.state.menuVisible) {
      this.hideMenu();
    }
    else {
      this.showMenu();
    }
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
        this.screenLauncherRef.getWrappedInstance().open();
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
    return (
      <div
        className='menu-component'
      >

        <div
          className='menu-flyout'
          ref={(c) => this.mainMenuRef = c}
          style={{animation: 'menu-swift-drop .375s forwards', transitionTimingFunction: 'cubic-bezier(.4, 0, .2, 1)' }}
          onMouseMove={this.handleMenuVisibility}
        >

          <KeyBinding onKey={ (e) => { this.handleControlsByKeyboard(e) } } />

          <ScreenLauncherComponent
            ref={(c) => this.screenLauncherRef = c}
            slides={this.props.slides}
            goto={this.props.goto}
          />

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
            />
          </div>

        </div>

        <Snackbar
          open={true}
          message={this.state.menuVisible.toString()}
        />

        <IframeLockerComponent
          next={this.props.next}
          prev={this.props.prev}
          handleMenuVisibility={this.handleMenuVisibility}
        />

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

MenuComponent.defaultProps = {
  debounceDuration: 750,
  throttleDuration: 750
};

export default MenuComponent;
