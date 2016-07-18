'use strict';

import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import Swipeable from 'react-swipeable';
import { defineMessages, injectIntl } from 'react-intl';

const debounce = require('lodash.debounce');
const throttle = require('lodash.throttle');

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

  componentWillMount() {
    this.throttle = throttle(this.throttle, 500);
    this.debounce = debounce(this.debounce, 500);
  }

  throttle() {
    console.log('T');
  }

  debounce() {
    console.log('D');
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
      onMouseMove={() => {this.throttle(); this.debounce(); console.log('M')}}
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
  prev: React.PropTypes.func.isRequired
};

export default injectIntl(IframeLockerComponent);
