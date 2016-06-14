'use strict';

import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import Dialog from 'material-ui/Dialog';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';

require('styles//ImportSlides.scss');

const messages = defineMessages({
  title: {
    id: 'importslides.title',
    defaultMessage: 'Import slides'
  },
  hint: {
    id: 'importslides.hint',
    defaultMessage: 'Copy a previously exported screen rotation list into this field'
  },
  label: {
    id: 'importslides.label',
    defaultMessage: 'Screen rotation list JSON'
  },
  buttonclose: {
    id: 'importslides.buttons.close',
    defaultMessage: 'Close'
  },
  buttonimport: {
    id: 'importslides.buttons.import',
    defaultMessage: 'Import'
  }
});

class ImportSlidesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  openDialog = () => {
    this.setState({open: true})
  }

  closeDialog = () => {
    this.setState({open: false})
  }

  import = () => {
    this.closeDialog();
  }

  render() {
    const {formatMessage} = this.props.intl;

    const actions = [
      <FlatButton
        label={formatMessage(messages.buttonimport)}
        primary={true}
        onTouchTap={this.import}
      />,
      <FlatButton
        label={formatMessage(messages.buttonclose)}
        primary={false}
        onTouchTap={this.closeDialog}
      />
    ];
    return (
      <div className='fab importslides-component'>
        <FloatingActionButton
          secondary={true}
          mini={true}
          onTouchTap={this.openDialog}
        >
          <FileUpload />
        </FloatingActionButton>

        <Dialog
          title={formatMessage(messages.title)}
          actions={actions}
          open={this.state.open}
          onRequestClose={this.closeDialog}
        >
          <TextField
            hintText={formatMessage(messages.hint)}
            floatingLabelText={formatMessage(messages.label)}
            multiLine={true}
            fullWidth={true}
          />
        </Dialog>
      </div>
    );
  }
}

ImportSlidesComponent.displayName = 'ImportSlidesComponent';

export default injectIntl(ImportSlidesComponent);
