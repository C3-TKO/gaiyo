'use strict';

import React from 'react';
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List';

import KeyBinding from 'react-keybinding-component';

require('styles//ScreenLauncher.scss');

class ScreenLauncherComponent extends React.Component {

  handleGoto = (id) => {
    this.props.goto(id);
    this.props.handleClose();
  }

  handleControlsByKeyboard = (e) => {
    switch(e.keyCode) {
      case 38: // Arrow up
        this.handleUp();
        return 0;
      case 40: // Arrow down
        this.handleDown();
        return 0;
      case 13: // Enter
        this.handleSelect();
        return 0;
    }
  }

  handleUp = () => {
    console.log('up');
  }

  handleDown = () => {
    console.log('down');
  }

  handleSelect = () => {
    console.log('select');
  }

  render() {
    return (
      <div className="screenlauncher-component">

        <KeyBinding onKey={ (e) => { this.handleControlsByKeyboard(e) } } />

        <List>
          <Subheader>
            {this.props.subHeader}
          </Subheader>
          {this.props.slides.map(slide =>
            <ListItem
              /* @TODO: Have a look at https://github.com/callemall/material-ui/issues/4008 */
              style={{"-webkit-appearance": "none"}}
              value={slide._id}
              key={'screen-launcher-item-' + slide._id}
              primaryText={slide.url}
              secondaryText={slide.duration}
              onTouchTap={() => this.handleGoto(slide._id)}
            />
          )}
        </List>
      </div>
    );
  }
}

ScreenLauncherComponent.displayName = 'ScreenLauncherComponent';

ScreenLauncherComponent.propTypes = {
  subHeader: React.PropTypes.string.isRequired,
  goto: React.PropTypes.func.isRequired,
  handleClose: React.PropTypes.func.isRequired
};

export default ScreenLauncherComponent;
