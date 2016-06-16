'use strict';

import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import Dialog from 'material-ui/Dialog';
import { defineMessages, injectIntl } from 'react-intl';
import CopyToClipboard from 'react-copy-to-clipboard';

require('styles//ExportSlides.scss');

const messages = defineMessages({
  title: {
    id: 'exportslides.title',
    defaultMessage: 'Export slides'
  },
  buttonclose: {
    id: 'exportslides.buttons.close',
    defaultMessage: 'Close'
  },
  buttoncopycb: {
    id: 'exportslides.buttons.copycb',
    defaultMessage: 'Copy to clipboard'
  }
});

class ExportSlidesComponent extends React.Component {
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

  copy2ClipBoard = () => {
    this.closeDialog();
  }

  render() {
    const {formatMessage} = this.props.intl;

    const actions = [
      <CopyToClipboard text={JSON.stringify(this.props.slides)}>
        <FlatButton
          label={formatMessage(messages.buttoncopycb)}
          primary={true}
          onTouchTap={this.copy2ClipBoard}
        />
      </CopyToClipboard>,
      <FlatButton
        label={formatMessage(messages.buttonclose)}
        primary={false}
        onTouchTap={this.closeDialog}
      />
    ];

    return (
      <div className='fab exportslides-component'>
        <FloatingActionButton
          secondary={true}
          mini={true}
          onTouchTap={this.openDialog}
        >
          <FileDownload />
        </FloatingActionButton>

        <Dialog
          title={formatMessage(messages.title)}
          actions={actions}
          open={this.state.open}
          onRequestClose={this.closeDialog}
        >
          {JSON.stringify(this.props.slides)}
        </Dialog>
      </div>
    );
  }
}

ExportSlidesComponent.displayName = 'ExportSlidesComponent';
ExportSlidesComponent.propTypes = {
  slides: React.PropTypes.array.isRequired
};

export default injectIntl(ExportSlidesComponent);
