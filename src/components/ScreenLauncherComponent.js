'use strict';

import React from 'react';
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentLowPriority from 'material-ui/svg-icons/content/low-priority';
import { defineMessages, injectIntl } from 'react-intl';

require('styles//ScreenLauncher.scss');

const messages = defineMessages({
  title: {
    id: 'screenlauncher.title',
    defaultMessage: 'Go to screen'
  },
  closeButton: {
    id: 'screenlauncher.close',
    defaultMessage: 'Close'
  },
  subheader: {
    id: 'screenlauncher.subheader',
    defaultMessage: 'Click to select'
  }
});

class ScreenLauncherComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  open = () => {
    this.setState({
      open: true
    })
  }

  close = () => {
    this.setState({
      open: false
    })
  }

  handleGoto = (id) => {
    this.props.goto(id);
    this.close();
  }

  render() {
    const {formatMessage} = this.props.intl;

    const actions = [
      <FlatButton
        label={formatMessage(messages.closeButton)}
        primary={true}
        onTouchTap={this.close}
      />
    ];

    return (
      <div className="screenlauncher-component">

        <div className='main-menu-fab-container'>
          <FloatingActionButton
            disabled={this.props.slides.length === 0}
            mini={true}
            secondary={true}
            onTouchTap={this.open} >
            <ContentLowPriority />
          </FloatingActionButton>
        </div>

        <Dialog
          title={formatMessage(messages.title)}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.close}
          autoScrollBodyContent={true}
        >
          <List>
            <Subheader>{formatMessage(messages.subheader)}</Subheader>
            {this.props.slides.map((slide, index) =>
              <ListItem
                /* @TODO: Have a look at https://github.com/callemall/material-ui/issues/4008 */
                style={{'WebkitAppearance': 'none'}}
                tabIndex={index + 1}
                value={slide._id}
                key={'screen-launcher-item-' + slide._id}
                primaryText={slide.url}
                onTouchTap={() => this.handleGoto(slide._id)}
              />
            )}
          </List>
        </Dialog>
      </div>
    );
  }
}

ScreenLauncherComponent.displayName = 'ScreenLauncherComponent';

ScreenLauncherComponent.propTypes = {
  slides: React.PropTypes.array.isRequired,
  goto: React.PropTypes.func.isRequired
};

export default injectIntl(ScreenLauncherComponent, {withRef: true});
