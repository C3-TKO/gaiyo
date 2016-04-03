'use strict';

import React from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ActionSettings from 'material-ui/lib/svg-icons/action/settings';

require('styles//Settings.scss');

class SettingsComponent extends React.Component {
  render() {
    return (
      <div className="settings-component">
        <FloatingActionButton mini={true}>
          <ActionSettings />
        </FloatingActionButton>
      </div>
    );
  }
}

SettingsComponent.displayName = 'SettingsComponent';

// Uncomment properties you need
// SettingsComponent.propTypes = {};
// SettingsComponent.defaultProps = {};

export default SettingsComponent;
