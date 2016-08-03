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

  renderIframes() {
    if (this.props.urlOut === this.props.urlIn) {
      return (
        <iframe
          key={this.props.urlIn}
          src={this.props.urlIn}
        />
      )
    } else {
      return (
        <div>
          <iframe
            key={this.props.urlOut}
            style={this.getStyle('out')}
            src={this.props.urlOut}
          />
          <iframe
            key={this.props.urlIn}
            style={this.getStyle('in')}
            src={this.props.urlIn}
          />
        </div>
      )
    }
  }

  render() {
    return (
      <div className='iframe-component'>
        {this.renderIframes()}
      </div>
    )
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
  transitionType: 'move',
  transitionDuration:.375
}

export default IframeComponent;
