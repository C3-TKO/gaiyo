'use strict';

import React from 'react';

require('styles//Iframe.scss');

class IframeComponent extends React.Component {
  render() {
    if (this.props.urlOut === this.props.urlIn) {
      return (
        <div>
          <iframe key={this.props.urlIn} className="iframe-component" src={this.props.urlIn}></iframe>
        </div>
      );
    } else {
      return (
        <div>
          <iframe key={this.props.urlOut} className="iframe-component fade-out" src={this.props.urlOut}></iframe>
          <iframe key={this.props.urlIn} className="iframe-component fade-in" src={this.props.urlIn}></iframe>
        </div>
      );
    }
  }
}

IframeComponent.displayName = 'IframeComponent';

IframeComponent.propTypes = {
  urlOut: React.PropTypes.string.isRequired,
  urlIn: React.PropTypes.string.isRequired
};

export default IframeComponent;
