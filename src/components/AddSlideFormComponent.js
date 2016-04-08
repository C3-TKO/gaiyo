'use strict';

import React from 'react';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

require('styles//AddSlideForm.scss');

class AddSlideFormComponent extends React.Component {
  handleAdd = () => {
    alert('govno!');
  }

  render() {
    return (
      <div className="addslideform-component">
        <TextField
          floatingLabelText="Url"
        />
        &nbsp;
        <TextField
          floatingLabelText="Duration (ms)"
          defaultValue="5000"
        />
        &nbsp;
        <FlatButton
          label="Add"
          primary={true}
          onTouchTap={this.handleAdd}
        />
      </div>
    );
  }
}

AddSlideFormComponent.displayName = 'AddSlideFormComponent';

// Uncomment properties you need
// AddSlideFormComponent.propTypes = {};
// AddSlideFormComponent.defaultProps = {};

export default AddSlideFormComponent;
