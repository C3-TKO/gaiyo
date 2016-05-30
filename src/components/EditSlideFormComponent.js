'use strict';

import React from 'react';
import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';
import KeyBinding from 'react-keybinding-component';

require('styles//EditSlideForm.scss');

class EditSlideFormComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formInputsValid: false
    };
  }

  handleSave = () => {
    const slide = {
      'url': this.refs.url.getValue(),
      'duration': this.refs.duration.getValue() * 1000 // (transforming seconds to milliseconds)
    };

    if (typeof(this.props.slide) != 'undefined') {
      this.props.onEdit(this.props.slide._id, slide);
    }
    else {
      this.props.onAdd(slide);
    }

    this.props.handleCloseDialog();
  }

  handleControlsByKeyboard = (e) => {
    switch(e.keyCode) {
      case 13: // Enter key
        if(this.state.formInputsValid) {
          this.handleSave();
        }
        return 0;
    }
  }

  enableButton = () => {
    this.setState({
      formInputsValid: true
    })
    this.props.enableEditButton();
  }

  disableButton = () => {
    this.setState({
      formInputsValid: false
    })
    this.props.disableEditButton();
  }

  render() {
    return (
      <div className="editslideform-component">

        <KeyBinding onKey={ (e) => { this.handleControlsByKeyboard(e) } } />

        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.handleSave}
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
  slide: React.PropTypes.any,
  disableEditButton: React.PropTypes.func.isRequired,
  enableEditButton: React.PropTypes.func.isRequired,
  handleCloseDialog: React.PropTypes.func.isRequired
};

EditSlideFormComponent.defaultProps = {
  currentSlide: undefined
};

export default EditSlideFormComponent;
