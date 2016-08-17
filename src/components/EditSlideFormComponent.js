'use strict';

import React from 'react';
import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';
import FlatButton from 'material-ui/FlatButton';
import { defineMessages, injectIntl } from 'react-intl';
import addSlide from '../actions/addSlide';
import editSlide from '../actions/editSlide';
import { connect } from 'react-redux';

require('styles//EditSlideForm.scss');

const messages = defineMessages({
  buttonupdate: {
    id: 'editslideform.buttons.update',
    defaultMessage: 'Update'
  },
  buttoncancel: {
    id: 'editslideform.buttons.cancel',
    defaultMessage: 'Cancel'
  },
  buttonedit: {
    id: 'editslideform.buttons.edit',
    defaultMessage: 'Edit'
  },
  labelUrl: {
    id: 'editslideform.labels.url',
    defaultMessage: 'Url (required)'
  },
  errorUrl: {
    id: 'editslideform.validationerrors.url',
    defaultMessage: 'Please enter a valid url'
  },
  labelDuration: {
    id: 'editslideform.labels.duration',
    defaultMessage: 'Duration in seconds (required)'
  },
  errorDuration: {
    id: 'editslideform.validationerrors.duration',
    defaultMessage: 'Please enter a valid duration'
  }
});

class EditSlideFormComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditButtonDisabled: true
    };
  }

  handleSubmit = (data) => {
    const slide = {
      'url': data.url,
      'duration': data.duration * 1000 // (transforming seconds to milliseconds)
    };

    if (typeof(this.props.slide) != 'undefined') {
      this.props.dispatch(editSlide(this.props.slide._id, slide));
    }
    else {
      this.props.dispatch(addSlide(slide));
    }

    this.props.handleClose();
  }

  enableButton = () => {
    this.setState({
      isEditButtonDisabled: false
    })
  }

  disableButton = () => {
    this.setState({
      isEditButtonDisabled: true
    })
  }

  render() {
    const {formatMessage} = this.props.intl;

    return (

      <div className='editslideform-component'>

        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.handleSubmit}
        >
          <FormsyText
            name='url'
            validations='isUrl'
            validationError={formatMessage(messages.errorUrl)}
            required
            hintText='http://www.example.com'
            floatingLabelText={formatMessage(messages.labelUrl)}
            fullWidth={true}
            defaultValue={typeof(this.props.slide) != 'undefined' ? this.props.slide.url : ''}
          />

          <FormsyText
            name='duration'
            validations='isNumeric'
            validationError={formatMessage(messages.errorDuration)}
            required
            hintText='5'
            floatingLabelText={formatMessage(messages.labelDuration)}
            defaultValue={typeof(this.props.slide) != 'undefined' ? this.props.slide.duration / 1000 : ''}
          />

          <div className='form-actions-container'>
            <FlatButton
              label={formatMessage(messages.buttoncancel)}
              secondary={true}
              type='cancel'
              onTouchTap={this.props.handleClose}
            />
            <FlatButton
              label={formatMessage(messages.buttonupdate)}
              primary={true}
              type='submit'
              disabled={this.state.isEditButtonDisabled}
            />
          </div>
        </Formsy.Form>
      </div>

    );
  }
}

EditSlideFormComponent.displayName = 'EditSlideFormComponent';
EditSlideFormComponent.propTypes = {
  slide: React.PropTypes.any,
  handleClose: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    slides: state.slides
  };
}

export default injectIntl(connect(mapStateToProps)(EditSlideFormComponent));
