'use strict';

import React from 'react';
import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';

require('styles//EditSlideForm.scss');

class EditSlideFormComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false
    };
  }

  handleSave = () => {
    const slide = {
      'url': this.refs.url.getValue(),
      'duration': this.refs.duration.getValue() * 1000 // (transformin seconds to milliseconds)
    };

    if (typeof(this.props.slide) != 'undefined') {
      this.props.onEdit(this.props.slide._id, slide);
    }
    else {
      this.props.onAdd(slide);
    }
  }

  enableButton = () => {
    this.setState({
      canSubmit: true
    });
  }

  disableButton = () => {
    this.setState({
      canSubmit: false
    });
  }

  submitForm = (data) =>  {
    alert(JSON.stringify(data, null, 4));
  }

  /*
  notifyFormError(data) {
    console.error('Form error:', data);
  }
  */

  render() {
    return (
      <div className="editslideform-component">
        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.submitForm}
          onInvalidSubmit={this.notifyFormError}
        >
          <FormsyText
            name='url'
            ref='url'
            validations='isUrl'
            validationError='Please enter a valid url'
            required
            hintText='http://www.example.com'
            floatingLabelText='Url (required)'
            fullWidth={true}
            defaultValue={typeof(this.props.slide) != 'undefined' ? this.props.slide.url : ''}
          />

          <FormsyText
            name='duration'
            ref='duration'
            validations='isNumeric'
            validationError='Please enter a valid duration'
            required
            hintText='5'
            floatingLabelText='Duration in seconds (required)'
            defaultValue={typeof(this.props.slide) != 'undefined' ? this.props.slide.duration / 1000 : ''}
          />
        </Formsy.Form>
      </div>
    );
  }
}

EditSlideFormComponent.displayName = 'EditSlideFormComponent';
EditSlideFormComponent.propTypes = {
  onAdd: React.PropTypes.func.isRequired,
  onEdit: React.PropTypes.func.isRequired,
  slide: React.PropTypes.any
};

EditSlideFormComponent.defaultProps = {
  currentSlide: undefined
};

export default EditSlideFormComponent;
