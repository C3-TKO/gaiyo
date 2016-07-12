require('normalize.css');
require('styles/App.css');

import React from 'react';
import RotatorComponent from './RotatorComponent';

class AppComponent extends React.Component {
  render() {
    const {actions, slides, settings} = this.props;
    return (
      <div className='index'>
        <RotatorComponent
          actions={actions}
          slides={slides}
          settings={settings}
        />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
