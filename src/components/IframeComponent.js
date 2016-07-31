'use strict';

import React from 'react';

require('styles//Iframe.scss');

class IframeComponent extends React.Component {
  getStyle(direction) {
    const type = this.props.transitionType
    const duration = this.props.transitionDuration
    return {
      animation: `${type}-${direction} ${duration}s linear forwards`
    }
  }

  onload = () => {
    // This method will only be invoked if the iframe trigger the onLoad event
    const iframe = document.getElementsByClassName('iframe-component')[0];
    try {
      const checkAaccess = (iframe.contentWindow || iframe.contentDocument).location.href;
    } catch (error) {
      // This indicates that the iframe could have been loaded but not accessed due to sandbox restrictions.
    }
  }

  render() {
    if (this.props.urlOut === this.props.urlIn) {
      return (
        <div>
          <iframe
            key={this.props.urlIn}
            className="iframe-component"
            src={this.props.urlIn}
          />
        </div>
      );
    } else {
      return (
        <div>
          <iframe
            key={this.props.urlOut}
            style={this.getStyle('out')}
            className="iframe-component"
            src={this.props.urlOut}
          />
          <iframe
            key={this.props.urlIn}
            style={this.getStyle('in')}
            className="iframe-component"
            src={this.props.urlIn}
            onLoad={this.onload()}
          />
        </div>
      );
    }
  }
}

IframeComponent.displayName = 'IframeComponent';

IframeComponent.propTypes = {
  urlOut: React.PropTypes.string.isRequired,
  urlIn: React.PropTypes.string.isRequired,
  transitionType: React.PropTypes.string,
  transitionDuration: React.PropTypes.number
};

IframeComponent.defaultProps = {
  transitionType: 'crossfade',
  transitionDuration: 2
}

export default IframeComponent;
