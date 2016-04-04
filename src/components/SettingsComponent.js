'use strict';

import React from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import ActionSettings from 'material-ui/lib/svg-icons/action/settings';

require('styles//Settings.scss');

class SettingsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <div className="settings-component">
        <FloatingActionButton mini={true} onMouseDown={this.handleOpen}>
          <ActionSettings />
        </FloatingActionButton>

        <Dialog
          title="Screen rotation list"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >

        </Dialog>
      </div>
    );
  }
}

SettingsComponent.displayName = 'SettingsComponent';

// Uncomment properties you need
// SettingsComponent.propTypes = {};
// SettingsComponent.defaultProps = {};

export default SettingsComponent;
