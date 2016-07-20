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
      open: false,
      menuVisible: false
    }
  }

  componentWillMount() {
    this.showMenu = throttle(this.showMenu, 500);
    this.hideMenu = debounce(this.hideMenu, 500);
  }

  showMenu() {
    console.log('T');
    this.setState({
      menuVisible: true
    })
  }

  hideMenu() {
    console.log('D');
    this.setState({
      menuVisible: false
    })
  }

  handleMenuVisibility = () => {
    if(this.state.menuVisible) {
      this.hideMenu();
    }
    else {
      this.showMenu();
    }

    console.log('M');
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
      onMouseMove={this.handleMenuVisibility}
    >
      <Snackbar
        open={true}
        message={this.state.menuVisible.toString()}
      />

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
