'use strict';

import React from 'react';
import Snackbar from 'material-ui/lib/snackbar';

require('styles//IframeLocker.scss');

class IframeLockerComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div
        className="iframelocker-component"
        onTouchTap={this.handleTouchTap}
      >
        <Snackbar
          open={this.state.open}
          message="This app runs in read only mode! You cannot interact with the websites that are shown!"
          autoHideDuration={6000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

IframeLockerComponent.displayName = 'IframeLockerComponent';


export default IframeLockerComponent;
