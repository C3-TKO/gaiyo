'use strict';

import React from 'react';
import TextField from 'material-ui/TextField';
import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import Dialog from 'material-ui/Dialog';
import { defineMessages, injectIntl } from 'react-intl';

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
      open: false
    };
  }

  openDialog = () => {
    this.setState({open: true})
  }

  closeDialog = () => {
    this.setState({open: false})
  }

  import = () => {
    this.dropSlides();
    const inputJSON = JSON.parse(this.refs.inputJSON.getValue());
    inputJSON.map(slide => {
      const newSlide = {
        'url': slide.url,
        'duration': slide.duration
      };
      this.props.createSlide(newSlide);
    });
    this.closeDialog();
  }

  dropSlides() {
    this.props.slides.map(slide => {
      this.props.deleteSlide(slide._id);
    });
  }

  render() {
    const {formatMessage} = this.props.intl;

    const actions = [
      <FlatButton
        label={formatMessage(messages.buttonimport)}
        primary={true}
        onTouchTap={this.import}
      />,
      <FlatButton
        label={formatMessage(messages.buttonclose)}
        primary={false}
        onTouchTap={this.closeDialog}
      />
    ];
    return (
      <div className='fab importslides-component'>
        <FloatingActionButton
          secondary={true}
          mini={true}
          onTouchTap={this.openDialog}
        >
          <FileUpload />
        </FloatingActionButton>

        <Dialog
          title={formatMessage(messages.title)}
          actions={actions}
          open={this.state.open}
          onRequestClose={this.closeDialog}
        >
          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.handleSave}
          >
            <FormsyText
              name='inputJSON'
              ref='inputJSON'
              validations={{isJSON: function (values, value) {
                  try {
                      JSON.parse(value);
                  } catch (e) {
                      return false;
                  }
                  return true;
                }
              }}
              validationError={formatMessage(messages.errorbackupjson)}
              required
              hintText={formatMessage(messages.hint)}
              floatingLabelText={formatMessage(messages.label)}
              multiLine={true}
              fullWidth={true}
            />
          </Formsy.Form>
        </Dialog>
      </div>
    );
  }
}

ImportSlidesComponent.displayName = 'ImportSlidesComponent';
ImportSlidesComponent.propTypes = {
  slides: React.PropTypes.array.isRequired,
  deleteSlide: React.PropTypes.func.isRequired,
  createSlide: React.PropTypes.func.isRequired
};

export default injectIntl(ImportSlidesComponent);
