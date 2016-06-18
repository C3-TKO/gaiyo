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
  buttonclose: {
    id: 'sync.buttons.close',
    defaultMessage: 'Close'
  },
  labeldburl: {
    id: 'sync.form.labels.dburl',
    defaultMessage: 'Url of the remote database (pouch db compatible)'
  },
  hintdburl: {
    id: 'sync.form.hints.dburl',
    defaultMessage: 'http://mypouchdb.com:5984/remote-slides'
  },
  errordburl: {
    id: 'sync.form.validationerrors.dburl',
    defaultMessage: 'Please enter a valid url!'
  }
});

class SyncComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  };

  openDialog = () => {
    this.setState({open: true})
  };

  closeDialog = () => {
    this.setState({open: false})
  };

  render() {
    const {formatMessage} = this.props.intl;

    const actions = [
      <FlatButton
        label={formatMessage(messages.buttonclose)}
        primary={false}
        onTouchTap={this.closeDialog}
      />
    ];

    const styles = {
      block: {
        maxWidth: 250,
      },
      toggle: {
        marginBottom: 16,
      },
    };

    return (

      <div className='fab  sync-component'>
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
              hintText={formatMessage(messages.hintdburl)}
              floatingLabelText={formatMessage(messages.labeldburl)}
              fullWidth={true}
            />
            <br />
            /* @TODO: https://github.com/callemall/material-ui/issues/4008 */
            <SelectField value={1} onChange={this.handleChange} floatingLabelText='Sync type'>
              <MenuItem value={1} style={{'WebkitAppearance': 'none'}} primaryText='Read Only' />
              <MenuItem value={2} style={{'WebkitAppearance': 'none'}} primaryText='Write Only' />
              <MenuItem value={3} style={{'WebkitAppearance': 'none'}} primaryText='Read and Write' />
            </SelectField>
            <br />
            <br />
            <div style={styles.block}>
              <Toggle
                label='Activate sync'
                defaultToggled={true}
                style={styles.toggle}
              />
            </div>
          </Formsy.Form>
        </Dialog>
      </div>
    );
  }
}

SyncComponent.displayName = 'SyncComponent';

export default injectIntl(SyncComponent);
