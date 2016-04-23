'use strict';

import React from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ActionSettings from 'material-ui/lib/svg-icons/action/settings';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import SlideList from './SlideListComponent';

require('styles//Settings.scss');

class SettingsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: this.props.slides.length === 0
    };
  }

  handleOpen = () => {
    this.setState({
      open: true
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
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
      <div className="settings-component">
        <FloatingActionButton
          mini={true}
          onTouchTap={this.handleOpen}>
          <ActionSettings />
        </FloatingActionButton>

        <Dialog
          title="Gaiyo settings"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <SlideList
            slides={this.props.slides}
            onDelete={this.props.onDelete}
            onUpdate={this.props.onUpdate}
            onSave={this.props.onSave}/>
        </Dialog>
      </div>
    );
  }
}

SettingsComponent.displayName = 'SettingsComponent';

SettingsComponent.propTypes = {
  slides: React.PropTypes.array.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onUpdate: React.PropTypes.func.isRequired
};

export default SettingsComponent;
