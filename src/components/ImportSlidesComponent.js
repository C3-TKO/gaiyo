'use strict';

import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import Dialog from 'material-ui/Dialog';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import { defineMessages, injectIntl } from 'react-intl';
import addSlide from '../actions/addSlide';
import deleteSlide from '../actions/deleteSlide';
import { connect } from 'react-redux';

require('styles//ImportSlides.scss');

const messages = defineMessages({
  title: {
    id: 'importslides.title',
    defaultMessage: 'Import slides'
  },
  hint: {
    id: 'importslides.form.hints.backupjson',
    defaultMessage: 'Copy a previously exported screen rotation list into this field'
  },
  label: {
    id: 'importslides.form.labels.backupjson',
    defaultMessage: 'Screen rotation list JSON'
  },
  buttonclose: {
    id: 'importslides.buttons.close',
    defaultMessage: 'Close'
  },
  buttonimport: {
    id: 'importslides.buttons.import',
    defaultMessage: 'Import'
  },
  errorbackupjson: {
    id: 'importslides.form.validationerrors.duration',
    defaultMessage: 'Please enter valid JSON'
  }
});

class ImportSlidesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      importDisabled: true
    };
  }

  open = () => {
    this.setState({open: true})
  }

  close = () => {
    this.setState({open: false})
  }

  import = (data) => {
    this.dropSlides();
    const inputJSON = JSON.parse(data.inputJSON);
    inputJSON.map(slide => {
      const newSlide = {
        'url': slide.url,
        'duration': slide.duration
      };

      this.props.dispatch(addSlide(newSlide));
    });
    this.closeDialog();
  }

  dropSlides() {
    this.props.slides.map(slide => {
      this.props.dispatch(deleteSlide(slide._id));
    });
  }

  enableImportButton = () => {
    this.setState({importDisabled: false})
  }

  disableImportButton = () => {
    this.setState({importDisabled: true})
  }

  render() {
    const {formatMessage} = this.props.intl;

    // @see: https://github.com/christianalfoni/formsy-react/issues/298#issuecomment-199208145
    Formsy.addValidationRule('isJSON', function(values, value) {
      try {
        JSON.parse(value);
      } catch (e) {
        return false;
      }
      return true;
    });

    return (
      <div className='fab importslides-component'>
        <FloatingActionButton
          secondary={true}
          mini={true}
          onTouchTap={this.open}
        >
          <FileUpload />
        </FloatingActionButton>

        <Dialog
          title={formatMessage(messages.title)}
          open={this.state.open}
          onRequestClose={this.close}
        >
          <Formsy.Form
            onValid={this.enableImportButton}
            onInvalid={this.disableImportButton}
            onValidSubmit={this.import}
          >
            <FormsyText
              name='inputJSON'
              validations='isJSON'
              required
              validationError={formatMessage(messages.errorbackupjson)}
              hintText={formatMessage(messages.hint)}
              floatingLabelText={formatMessage(messages.label)}
              multiLine={true}
              fullWidth={true}
            />

            <div className='form-actions-container'>
              <FlatButton
                label={formatMessage(messages.buttonclose)}
                secondary={true}
                type='cancel'
                onTouchTap={this.close}
              />

              <FlatButton
                label={formatMessage(messages.buttonimport)}
                disabled={this.state.importDisabled}
                primary={true}
                type='submit'
              />
            </div>

          </Formsy.Form>
        </Dialog>
      </div>
    );
  }
}

ImportSlidesComponent.displayName = 'ImportSlidesComponent';

export default injectIntl(connect()(ImportSlidesComponent));
