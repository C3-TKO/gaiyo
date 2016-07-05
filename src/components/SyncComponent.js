'use strict';

import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NotificationSync from 'material-ui/svg-icons/notification/sync';
import Dialog from 'material-ui/Dialog';
import Formsy from 'formsy-react';
import { FormsyText, FormsySelect, FormsyToggle } from 'formsy-material-ui/lib';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import { defineMessages, injectIntl } from 'react-intl';

require('styles//Sync.scss');

const messages = defineMessages({
  title: {
    id: 'sync.title',
    defaultMessage: 'Remote database sync settings'
  },
  reboothint: {
    id: 'sync.message.reboothint',
    defaultMessage: 'Sync settings have been changed and thus junkan needs to reboot now!'
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
      openForm: false,
      openRebootHint: false
    }

    const remoteDbUrl = this.getURLParameter('remoteDbUrl');
    const syncMode = parseInt(this.getURLParameter('syncMode'));
    let enabled = false;
    if (typeof remoteDbUrl !== 'undefined' && typeof syncMode !== 'undefined') {
      enabled = true;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.settings.lastChanged !== nextProps.settings.lastChanged) {
      // Sync settings have been changed and thus junkan needs to reboot in order to have the changes taking place
      this.rebootWithNewDbSyncSettings();
    }
  }

  getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || undefined;
  }

  rebootWithNewDbSyncSettings = () => {
    this.setState({openForm: false});
    this.setState({openRebootHint: true})
  }

  openDialogForm = () => {
    this.setState({openForm: true})
  }

  closeDialogForm = () => {
    this.setState({openForm: false})
  }

  openDialogRebootHint = () => {
    this.setState({openRebootHint: true})
  }

  saveSettings = () => {
    const nextSettings = {
      remoteDbUrl: this.refs.remoteDb.getValue(),
      syncMode: this.refs.syncMode.getValue(),
      enabled: !!this.refs.enabled.getValue()
    };

    this.props.actionEditSettings(nextSettings);
  }

  reboot = () => {
    location.reload();
  }

  render() {
    const {formatMessage} = this.props.intl;

    const dialogFormActions = [
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
          onTouchTap={this.openDialogForm}
        >
          <NotificationSync />
        </FloatingActionButton>

        <Snackbar
          open={this.state.openRebootHint}
          message={formatMessage(messages.reboothint)}
          autoHideDuration={this.props.snackbarDuration}
          onRequestClose={this.reboot}
        />

        <Dialog
          title={formatMessage(messages.title)}
          actions={dialogFormActions}
          open={this.state.openForm}
          onRequestClose={this.closeDialogForm}
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
              value={this.props.settings.remoteDbUrl}
              onInput={this.changeRemoteDbUrl}
            />
            <br />

            <FormsySelect
              name='syncMode'
              ref='syncMode'
              value={this.props.settings.syncMode}
              floatingLabelText={formatMessage(messages.labelsyncmode)}
              onChange={() => {}}
            >
              <MenuItem
                value={1}
                /* @TODO: https://github.com/callemall/material-ui/issues/4008 */
                style={{'WebkitAppearance': 'none'}}
                primaryText={formatMessage(messages.syncmodeoptionread)} />
              <MenuItem
                value={2}
                /* @TODO: https://github.com/callemall/material-ui/issues/4008 */
                style={{'WebkitAppearance': 'none'}}
                primaryText={formatMessage(messages.syncmodeoptionwrite)} />
              <MenuItem
                value={3}
                /* @TODO: https://github.com/callemall/material-ui/issues/4008 */
                style={{'WebkitAppearance': 'none'}}
                primaryText={formatMessage(messages.syncmodeoptionreadwrite)} />
            </FormsySelect>
            <br />
            <br />
            <div style={styles.block}>
              <FormsyToggle
                name='enabled'
                ref='enabled'
                label={formatMessage(messages.labelactive)}
                style={styles.toggle}
                defaultToggled={this.props.settings.enabled}
              />
            </div>
          </Formsy.Form>
        </Dialog>
      </div>
    );
  }
}

SyncComponent.displayName = 'SyncComponent';

SyncComponent.propTypes = {
  settings: React.PropTypes.object.isRequired,
  actionEditSettings: React.PropTypes.func.isRequired
};

SyncComponent.defaultProps = {
  snackbarDuration: 5000
};

export default injectIntl(SyncComponent);
