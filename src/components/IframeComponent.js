'use strict';

import React from 'react';

require('styles//Iframe.scss');

class IframeComponent extends React.Component {
  render() {
    return (
      <iframe className="iframe-component" src={this.props.slide.url}></iframe>
    );
  }
}

IframeComponent.displayName = 'IframeComponent';

IframeComponent.propTypes = {
  slide: React.PropTypes.object
};

export default IframeComponent;
