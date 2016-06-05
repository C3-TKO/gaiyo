'use strict';

import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import Swipeable from 'react-swipeable';

require('styles//IframeLocker.scss');

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
      preventDefaultTouchmoveEvent={true}>
      <div
        onTouchTap={this.handleTouchTap}
      >
        <Snackbar
          open={this.state.open}
          message={formatMessage(messages.snackbar)}
          autoHideDuration={6000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
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
