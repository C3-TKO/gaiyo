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
    return (
    <Swipeable className="iframelocker-component"
      onSwipedRight={this.props.next}
      onSwipedLeft={this.props.prev}
      preventDefaultTouchmoveEvent={true}
      onTouchTap={this.handleTouchTap}
     >
        <Snackbar
          open={this.state.open}
          message="This app runs in read only mode! You cannot interact with the websites that are shown!"
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

export default IframeLockerComponent;
