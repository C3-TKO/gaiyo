'use strict';

import React from 'react';
import Subheader from 'material-ui/SubHeader'
import {List, ListItem} from 'material-ui/List';

require('styles//ScreenLauncher.scss');

class ScreenLauncherComponent extends React.Component {

  handleGoto = (id) => {
    this.props.goto(id);
    this.props.handleClose();
  }

  render() {
    return (
      <div className="screenlauncher-component">
        <List>
          <Subheader>
            {this.props.subHeader}
          </Subheader>
          {this.props.slides.map(slide =>
            <ListItem
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
