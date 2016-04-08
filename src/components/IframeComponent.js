'use strict';

import React from 'react';

require('styles//Iframe.scss');

class IframeComponent extends React.Component {
  render() {
    return (
      <iframe className="iframe-component" src={this.props.url}></iframe>
    );
  }
}

IframeComponent.displayName = 'IframeComponent';

IframeComponent.propTypes = {
  url: React.PropTypes.string.isRequired
};

export default IframeComponent;
