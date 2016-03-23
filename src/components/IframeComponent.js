'use strict';

import React from 'react';

require('styles//Iframe.scss');

class IframeComponent extends React.Component {
  render() {
    return (
      <iframe className="iframe-component"></iframe>
    );
  }
}

IframeComponent.displayName = 'IframeComponent';

// Uncomment properties you need
// IframeComponent.propTypes = {};
// IframeComponent.defaultProps = {};

export default IframeComponent;
