'use strict';

import React from 'react';

require('styles//Controls.scss');

class ControlsComponent extends React.Component {
  render() {
    return (
      <div className="controls-component">
          <button id="rewind">Rewind</button>
          <button id="stop">Stop</button>
          <button id="play">Play</button>
          <button id="forward">Forward</button>
      </div>
    );
  }
}

ControlsComponent.displayName = 'ControlsComponent';

// Uncomment properties you need
// ControlsComponent.propTypes = {};
// ControlsComponent.defaultProps = {};

export default ControlsComponent;
