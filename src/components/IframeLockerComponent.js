'use strict';

import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import Swipeable from 'react-swipeable';
import { defineMessages, injectIntl } from 'react-intl';

require('styles//IframeLocker.scss');

const messages = defineMessages({
  snackbar: {
    id: 'iframelocker.snackbar',
    defaultMessage: 'This app runs in read only mode! You cannot interact with the websites that are shown!'
  }
});

class IframeLockerComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleTouchTap = () => {
    this.setState({
      open: true
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false
    })
  }

  render() {
    const {formatMessage} = this.props.intl;

    return (
    <Swipeable className='iframelocker-component'
      onSwipedRight={this.props.next}
      onSwipedLeft={this.props.prev}
      preventDefaultTouchmoveEvent={true}
      onTouchTap={this.handleTouchTap}
      onMouseMove={this.props.handleMenuVisibility}
    >

      <Snackbar
        open={this.state.open}
        message={formatMessage(messages.snackbar)}
        autoHideDuration={6000}
        onRequestClose={this.handleRequestClose}
      />
    </Swipeable>
    );
  }
}

IframeLockerComponent.displayName = 'IframeLockerComponent';
IframeLockerComponent.propTypes = {
  next: React.PropTypes.func.isRequired,
  prev: React.PropTypes.func.isRequired,
  handleMenuVisibility: React.PropTypes.func.isRequired
};

export default injectIntl(IframeLockerComponent);
