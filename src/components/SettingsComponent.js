'use strict';

import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import SlideListEditor from './SlideListEditorComponent';
import Snackbar from 'material-ui/Snackbar';
import { defineMessages, injectIntl } from 'react-intl';


require('styles//Settings.scss');

const messages = defineMessages({
  close: {
    id: 'settings.close',
    defaultMessage: 'Close'
  },
  title: {
    id: 'settings.title',
    defaultMessage: 'Settings'
  },
  snackbar: {
    id: 'settings.snackbar',
    defaultMessage: 'Please add at least one screen to the rotation list!'
  }
});

class SettingsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      snackbarOpen: false,
      timeout: undefined
    };
  }

  componentDidMount() {
    const timeToWaitForDBRead = 750;

    if(this.props.slides.length === 0) {
      const timeout = setTimeout(
        () => {
          this.setState({
            dialogOpen: true,
            timeout: undefined
          })
        }
        , timeToWaitForDBRead );
      this.setState({timeout: timeout})
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.slides.length > 0) {
      clearTimeout(this.state.timeout);
    }
  }

  openDialog = () => {
    this.setState({
      dialogOpen: true
    })
    this.props.onMouseLeave();
  }

  closeDialog = () => {
    if(this.props.slides.length !== 0) {
      this.setState({
        dialogOpen: false
      })
    }
    else {
      this.openSnackbar();
    }
  }

  openSnackbar = () => {
    this.setState({
      snackbarOpen: true
    })
  }

  closeSnackbar = () => {
    this.setState({
      snackbarOpen: false
    })
  }

  render() {
    const {formatMessage} = this.props.intl;

    const actions = [
      <FlatButton
        label={formatMessage(messages.close)}
        primary={true}
        onTouchTap={this.closeDialog}
      />
    ];

    return (
      <div className='settings-component'>

        <FloatingActionButton
          secondary={true}
          mini={true}
          onTouchTap={this.openDialog}
          onMouseEnter={this.props.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave}
        >
          <ActionSettings />
        </FloatingActionButton>

        <Dialog
          title={formatMessage(messages.title)}
          actions={actions}
          modal={this.props.slides.length === 0}
          open={this.state.dialogOpen}
          onRequestClose={this.closeDialog}
          autoScrollBodyContent={true}
        >
          <SlideListEditor />
        </Dialog>

        <Snackbar
          open={this.state.snackbarOpen}
          message={formatMessage(messages.snackbar)}
          autoHideDuration={6000}
          onRequestClose={this.closeSnackbar}
        />
      </div>
    );
  }
}

SettingsComponent.displayName = 'SettingsComponent';

SettingsComponent.propTypes = {
  slides: React.PropTypes.array.isRequired,
  onMouseEnter: React.PropTypes.func.isRequired,
  onMouseLeave: React.PropTypes.func.isRequired
};

export default injectIntl(SettingsComponent);
