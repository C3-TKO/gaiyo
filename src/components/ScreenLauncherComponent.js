'use strict';

import React from 'react';
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List';
import { defineMessages, injectIntl } from 'react-intl';

require('styles//ScreenLauncher.scss');

const messages = defineMessages({
  subheader: {
    id: 'screenlauncherSubHeader',
    defaultMessage: 'Click to select'
  }
});

class ScreenLauncherComponent extends React.Component {

  handleGoto = (id) => {
    this.props.goto(id);
    this.props.handleClose();
  }

  render() {
    const {formatMessage} = this.props.intl;

    return (
      <div className="screenlauncher-component">

        <List>
          <Subheader>{formatMessage(messages.subheader)}</Subheader>
          {this.props.slides.map((slide, index) =>
            <ListItem
              /* @TODO: Have a look at https://github.com/callemall/material-ui/issues/4008 */
              style={{'-webkit-appearance': 'none'}}
              tabIndex={index + 1}
              value={slide._id}
              key={'screen-launcher-item-' + slide._id}
              primaryText={slide.url}
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
  slides: React.PropTypes.array.isRequired,
  goto: React.PropTypes.func.isRequired,
  handleClose: React.PropTypes.func.isRequired
};

export default injectIntl(ScreenLauncherComponent);
