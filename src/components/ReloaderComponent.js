'use strict';

import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import { defineMessages, injectIntl } from 'react-intl';

require('styles//Reloader.scss');

const messages = defineMessages({
  snackbar: {
    id: 'reloader.snackbar',
    defaultMessage: 'Restarting junkan when this screen ends'
  }
});

class ReloaderComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      fullCycleCounter: 0,
      timeout: (this.props.durationLastScreen - this.props.snackbarDuration) >= 0
        ? this.props.durationLastScreen - this.props.snackbarDuration
        : this.props.durationLastScreen
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.pointer === this.props.indexOfLastSlide && this.props.pointer !== this.props.indexOfLastSlide) {
      let newFullCycleCounter = ++this.state.fullCycleCounter;
      if(newFullCycleCounter === this.props.numberOfFullCyclesUntilReload) {
        this.triggerReloadSnackbar()
      }
      this.setState({
          fullCycleCounter: newFullCycleCounter
      })
    }
  }

  triggerReloadSnackbar() {
    setTimeout(() => {this.setState({ open: true})}, this.state.timeout);
  }

  handleRequestClose = () => {
    location.reload()
  }

  render() {
    const {formatMessage} = this.props.intl;

    return (
        <Snackbar className="reloader-component"
          open={this.state.open}
          message={formatMessage(messages.snackbar)}
          autoHideDuration={this.props.snackbarDuration}
          onRequestClose={this.handleRequestClose}
        />
    );
  }
}

ReloaderComponent.displayName = 'ReloaderComponent';

ReloaderComponent.propTypes = {
  pointer: React.PropTypes.number.isRequired,
  durationLastScreen: React.PropTypes.number.isRequired,
  indexOfLastSlide: React.PropTypes.number.isRequired
};

ReloaderComponent.defaultProps = {
  snackbarDuration: 6000,
  numberOfFullCyclesUntilReload: 20
};

export default injectIntl(ReloaderComponent);
