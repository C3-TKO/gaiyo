'use strict';

import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NotificationSync from 'material-ui/svg-icons/notification/sync';
import Dialog from 'material-ui/Dialog';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import { defineMessages, injectIntl } from 'react-intl';

require('styles//Sync.scss');

const messages = defineMessages({
  title: {
    id: 'sync.title',
    defaultMessage: 'Remote database sync settings'
  },
  buttonupdate: {
    id: 'sync.buttons.update',
    defaultMessage: 'Update'
  },
  buttonclose: {
    id: 'sync.buttons.close',
    defaultMessage: 'Close'
  },
  labeldburl: {
    id: 'sync.form.labels.dburl',
    defaultMessage: 'Url of the remote database (pouch db compatible)'
  },
  errordburl: {
    id: 'sync.form.validationerrors.dburl',
    defaultMessage: 'Please enter a valid url!'
  },
  labelsyncmode: {
    id: 'sync.form.labels.snycmode',
    defaultMessage: 'Sync mode'
  },
  syncmodeoptionread: {
    id: 'sync.form.options.read',
    defaultMessage: 'read'
  },
  syncmodeoptionwrite: {
    id: 'sync.form.options.write',
    defaultMessage: 'write'
  },
  syncmodeoptionreadwrite: {
    id: 'sync.form.options.readwrite',
    defaultMessage: 'read & write'
  },
  labelactive: {
    id: 'sync.form.labels.enable',
    defaultMessage: 'Enable sync'
  }
});

class SyncComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      settings: this.props.settings
    }
  }

  openDialog = () => {
    this.setState({open: true})
  }

  closeDialog = () => {
    this.setState({open: false})
  }

  changeSyncMode = (event, index, value) => {
    let nextSettings = this.state.settings;
    nextSettings.syncMode = value;

    this.setState({settings: nextSettings});
  }

  changeRemoteDbUrl = (event) => {
    let nextSettings = this.state.settings;
    nextSettings.remoteDbUrl = event.target.value;

    this.setState({settings: nextSettings});
  }

  changeEnabledStatus = (event, value) => {
    let nextSettings = this.state.settings;
    nextSettings.enabled = value;

    this.setState({settings: nextSettings});
  }

  saveSettings = () => {
    this.props.actionEditSettings(this.state.settings);
  }


  render() {
    const {formatMessage} = this.props.intl;

    const actions = [
      <FlatButton
        label={formatMessage(messages.buttonupdate)}
        primary={false}
        onTouchTap={this.saveSettings}
      />,
      <FlatButton
        label={formatMessage(messages.buttonclose)}
        primary={true}
        onTouchTap={this.closeDialog}
      />
    ];

    const styles = {
      block: {
        maxWidth: 250
      },
      toggle: {
        marginBottom: 16
      }
    };

    return (

      <div className='fab sync-component'>
        <FloatingActionButton
          secondary={true}
          mini={true}
          onTouchTap={this.openDialog}
        >
          <NotificationSync />
        </FloatingActionButton>

        <Dialog
          title={formatMessage(messages.title)}
          actions={actions}
          open={this.state.open}
          onRequestClose={this.closeDialog}
        >
          <Formsy.Form
            onValid={this.enableImportButton}
            onInvalid={this.disableImportButton}
            onValidSubmit={this.import}
          >
            <FormsyText
              name='remote-db'
              ref='remoteDb'
              validations='isUrl'
              required
              validationError={formatMessage(messages.errordburl)}
              hintText='http://mypouchdb.com:5984/remote-slides'
              floatingLabelText={formatMessage(messages.labeldburl)}
              fullWidth={true}
              value={this.state.settings.remoteDbUrl}
              onInput={this.changeRemoteDbUrl}
            />
            <br />

            <SelectField value={this.state.settings.syncMode} onChange={this.changeSyncMode} floatingLabelText={formatMessage(messages.labelsyncmode)}>
              <MenuItem
                value={1}
                /* @TODO: https://github.com/callemall/material-ui/issues/4008 */
                style={{'WebkitAppearance': 'none'}}
                primaryText={formatMessage(messages.syncmodeoptionread)} />
              <MenuItem value={2} style={{'WebkitAppearance': 'none'}} primaryText={formatMessage(messages.syncmodeoptionwrite)} />
              <MenuItem value={3} style={{'WebkitAppearance': 'none'}} primaryText={formatMessage(messages.syncmodeoptionreadwrite)} />
            </SelectField>
            <br />
            <br />
            <div style={styles.block}>
              <Toggle
                label={formatMessage(messages.labelactive)}
                style={styles.toggle}
                onToggle={this.changeEnabledStatus}
                toggled={this.state.settings.enabled}
              />
            </div>
          </Formsy.Form>
        </Dialog>
      </div>
    );
  }
}

SyncComponent.displayName = 'SyncComponent';

SyncComponent.defaultProps = {
  settings: React.PropTypes.object.isRequired,
  actionEditSettings: React.PropTypes.func.isRequired
};

export default injectIntl(SyncComponent);
