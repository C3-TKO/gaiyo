'use strict';

import React from 'react';
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SyncComponent from './SyncComponent'
import ExportSlidesComponent from './ExportSlidesComponent'
import ImportSlidesComponent from './ImportSlidesComponent'
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import EditSlideForm from './EditSlideFormComponent';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  title: {
    id: 'editslideform.title',
    defaultMessage: 'Edit slide'
  },
  subheader: {
    id: 'editslideform.subheader',
    defaultMessage: 'Screen rotation list'
  },
  buttonupdate: {
    id: 'editslideform.buttons.update',
    defaultMessage: 'Update'
  },
  secondarytext: {
    id: 'editslideform.secondarytext',
    defaultMessage: `{duration, plural,
      one {{duration} second}
      other {{duration} seconds}}`
  },
  buttoncancel: {
    id: 'editslideform.buttons.cancel',
    defaultMessage: 'Cancel'
  },
  buttondelete: {
    id: 'editslideform.buttons.delete',
    defaultMessage: 'Delete'
  },
  buttonedit: {
    id: 'editslideform.buttons.edit',
    defaultMessage: 'Edit'
  },
  buttonmore: {
    id: 'editslideform.buttons.more',
    defaultMessage: 'more'
  }
});

require('styles//SlideListEditor.scss');

class SlideListEditorComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      slideBeingEdited: undefined,
      isEditButtonDisabled: true
    };
  }

  handleEdit = (slide) => {
    this.setState({
      open: true,
      slideBeingEdited: slide
    })
  }

  handleOpen = () => {
    this.setState({
      open: true
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
      slideBeingEdited: undefined
    })
  }

  handleSave = () => {
    this.refs.editSlideForm.handleSave();
    this.handleClose();
  }

  disableEditButton = () => {
    this.setState({
      isEditButtonDisabled: true
    })
  }

  enableEditButton = () => {
    this.setState({
      isEditButtonDisabled: false
    })
  }

  renderRightIconMenu(slide) {
    const {formatMessage} = this.props.intl;

    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltip={formatMessage(messages.buttonmore)}
        tooltipPosition='bottom-left'
      >
        <MoreVertIcon/>
      </IconButton>
    );

    return (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem
          /* @TODO: Have a look at https://github.com/callemall/material-ui/issues/4008 */
          style={{'WebkitAppearance': 'none'}}
          onTouchTap={() => {this.handleEdit(slide)}}
        >
          Edit
        </MenuItem>
        <MenuItem
          /* @TODO: Have a look at https://github.com/callemall/material-ui/issues/4008 */
          style={{'WebkitAppearance': 'none'}}
          onTouchTap={() => {this.props.onDelete(slide._id)}}
        >
          Delete
        </MenuItem>
      </IconMenu>
    )
  }

  render() {
    const {formatMessage} = this.props.intl;

    const actions = [
      <FlatButton
        label={formatMessage(messages.buttoncancel)}
        primary={false}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={formatMessage(messages.buttonupdate)}
        primary={true}
        onTouchTap={this.handleSave}
        disabled={this.state.isEditButtonDisabled}
      />
    ];

    return (
      <div className='slidelisteditor-component'>
        <div id='slidelisteditor-fab-bar'>
          <SyncComponent
            settings={this.props.settings}
          />
          <ExportSlidesComponent
            slides={this.props.slides}
          />
          <ImportSlidesComponent
            slides={this.props.slides}
            deleteSlide={this.props.onDelete}
            createSlide={this.props.onAdd}
          />

          <div className='fab'>
            <FloatingActionButton
              onTouchTap={this.handleOpen}
            >
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>

        <List>
          <Subheader>
            <FormattedMessage {...messages.subheader} />
          </Subheader>

          {this.props.slides.map(slide =>
            <ListItem
              /* @TODO: Have a look at https://github.com/callemall/material-ui/issues/4008 */
              style={{'WebkitAppearance': 'none'}}
              value={slide._id}
              key={'slide-list-item-' + slide._id}
              primaryText={slide.url}
              secondaryText={formatMessage(messages.secondarytext, {duration: (slide.duration / 1000)})}
              rightIconButton={this.renderRightIconMenu(slide)}
            />
          )}
        </List>

        <Dialog
          title={formatMessage(messages.title)}
          actions={actions}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <EditSlideForm
            ref='editSlideForm'
            onAdd={this.props.onAdd}
            onEdit={this.props.onEdit}
            slide={this.state.slideBeingEdited}
            disableEditButton={this.disableEditButton}
            enableEditButton={this.enableEditButton}
            handleCloseDialog={this.handleClose}
          />
        </Dialog>
      </div>
    );
  }
}

SlideListEditorComponent.displayName = 'SlideListEditorComponent';
SlideListEditorComponent.propTypes = {
  slides: React.PropTypes.array.isRequired,
  settings: React.PropTypes.object.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onEdit: React.PropTypes.func.isRequired,
  onAdd: React.PropTypes.func.isRequired
};

export default injectIntl(SlideListEditorComponent);

