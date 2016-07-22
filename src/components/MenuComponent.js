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
import IframeLockerComponent from './IframeLockerComponent';

require('styles//Menu.scss');

class MenuComponent extends React.Component {

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
          style={{animation: 'menu-swift-drop .375s forwards', transitionTimingFunction: 'cubic-bezier(.4, 0, .2, 1)' }}
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

        <IframeLockerComponent
          next={this.props.next}
          prev={this.props.prev}
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

export default MenuComponent;
