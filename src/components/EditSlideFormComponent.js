'use strict';

import React from 'react';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

require('styles//EditSlideForm.scss');

class EditSlideFormComponent extends React.Component {

  handleAdd = () => {
    const slide = {
      'url': this.refs.url.getValue(),
      'duration': this.refs.duration.getValue()
    };
    this.props.onSave(slide);
  }

  render() {
    return (
      <div className="editslideform-component">
        <TextField
          style={{width: '100%'}}
          ref="url"
          floatingLabelText="Url"
          defaultValue="http://smash.cologne"
        />
        <br />
        <TextField
          ref="duration"
          floatingLabelText="Duration (ms)"
          defaultValue="5000"
        />
        <FlatButton
          label="Add"
          primary={true}
          onTouchTap={this.handleAdd}
        />
      </div>
    );
  }
}

EditSlideFormComponent.displayName = 'EditSlideFormComponent';
EditSlideFormComponent.propTypes = {
  onSave: React.PropTypes.func.isRequired
};

export default EditSlideFormComponent;
