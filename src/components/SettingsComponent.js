'use strict';

import React from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ActionSettings from 'material-ui/lib/svg-icons/action/settings';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import SlideListEditor from './SlideListEditorComponent';
import Snackbar from 'material-ui/lib/snackbar';

require('styles//Settings.scss');

class SettingsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      snackbarOpen: false,
      timeout: undefined
    };
  }

  componentDidMount() {
    const timeToWaitForDBRead = 750;

    if(this.props.slides.length === 0) {
      const timeout = setTimeout(
        () => this.setState({
          dialogOpen: true,
          timeout: undefined
        }), timeToWaitForDBRead );
      this.setState({timeout: timeout})
    }
  }

  componentWillReceiveProps(nextProps) {
    clearTimeout(this.state.timeout);
  }

  onAdd = (slide) => {
    this.props.actionAddSlide(slide);
  }

  onEdit = (id, slide) => {
    this.props.actionEditSlide(id, slide);
  }

  onDelete = (id) => {
    this.props.actionDeleteSlide(id);
  }

  openDialog = () => {
    this.setState({
      dialogOpen: true
    })
  }

  closeDialog = () => {
    if(this.props.slides.length !== 0) {
      this.setState({
        dialogOpen: false
      })
    }
    else {
      this.openSnackbar();
    }
  }

  openSnackbar = () => {
    this.setState({
      snackbarOpen: true
    })
  }

  closeSnackbar = () => {
    this.setState({
      snackbarOpen: false
    })
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.closeDialog}
      />
    ];

    return (
      <div className="settings-component">
        <FloatingActionButton
          mini={true}
          onTouchTap={this.openDialog}>
          <ActionSettings />
        </FloatingActionButton>

        <Dialog
          title="Settings"
          actions={actions}
          modal={this.props.slides.length === 0}
          open={this.state.dialogOpen}
          onRequestClose={this.closeDialog}
          autoScrollBodyContent={true}
        >
          <SlideListEditor
            slides={this.props.slides}
            onDelete={this.onDelete}
            onEdit={this.onEdit}
            onAdd={this.onAdd}/>
        </Dialog>

        <Snackbar
          open={this.state.snackbarOpen}
          message="Please add at least one screen to the rotation list!"
          autoHideDuration={6000}
          onRequestClose={this.closeSnackbar}
        />
      </div>
    );
  }
}

SettingsComponent.displayName = 'SettingsComponent';

SettingsComponent.propTypes = {
  slides: React.PropTypes.array.isRequired,
  actionAddSlide: React.PropTypes.func.isRequired,
  actionDeleteSlide: React.PropTypes.func.isRequired,
  actionEditSlide: React.PropTypes.func.isRequired
};

export default SettingsComponent;
