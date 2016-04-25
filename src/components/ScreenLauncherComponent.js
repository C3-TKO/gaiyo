'use strict';

import React from 'react';
import List from 'material-ui/lib/lists/list';
import Subheader from 'material-ui/lib/Subheader'
import ListItem from 'material-ui/lib/lists/list-item';

require('styles//ScreenLauncher.scss');

class ScreenLauncherComponent extends React.Component {
  render() {
    return (
      <div className="screenlauncher-component">
        <List>
          <Subheader>
            Screen rotation list
          </Subheader>

          {this.props.slides.map(slide =>
            <ListItem
              value={slide._id}
              key={'slide-list-item-' + slide._id}
              primaryText={slide.url}
              secondaryText={slide.duration}
            />
          )}
        </List>
      </div>
    );
  }
}

ScreenLauncherComponent.displayName = 'ScreenLauncherComponent';

// Uncomment properties you need
// ScreenLauncherComponent.propTypes = {};
// ScreenLauncherComponent.defaultProps = {};

export default ScreenLauncherComponent;
