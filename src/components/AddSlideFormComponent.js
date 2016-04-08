'use strict';

import React from 'react';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

require('styles//AddSlideForm.scss');

class AddSlideFormComponent extends React.Component {

  handleAdd = () => {
    const slide = {
      'url' : this.refs.addSlideUrl.getValue(),
      'duration' : this.refs.addSlideDuration.getValue()
    };
    this.props.onSave(slide);
  }

  render() {
    return (
      <div className="addslideform-component">
        <TextField
          ref="addSlideUrl"
          floatingLabelText="Url"
          defaultValue="http://smash.cologne"
        />
        &nbsp;
        <TextField
          ref="addSlideDuration"
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
AddSlideFormComponent.propTypes = {
  onSave: React.PropTypes.func.isRequired
};

export default AddSlideFormComponent;
