'use strict';

import React from 'react';
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SyncComponent from './SyncComponent'
import ExportSlidesComponent from './ExportSlidesComponent'
import ImportSlidesComponent from './ImportSlidesComponent'
import ContentAdd from 'material-ui/svg-icons/content/add';
import EditSlideForm from './EditSlideFormComponent';
import Dialog from 'material-ui/Dialog';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import deleteSlide from '../actions/deleteSlide';
import { connect } from 'react-redux';

const messages = defineMessages({
  title: {
    id: 'editslideform.title',
    defaultMessage: 'Edit slide'
  },
  subheader: {
    id: 'editslideform.subheader',
    defaultMessage: 'Screen rotation list'
  },
  secondarytext: {
    id: 'editslideform.secondarytext',
    defaultMessage: `{duration, plural,
      one {{duration} second}
      other {{duration} seconds}}`
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

  render() {
    const {formatMessage} = this.props.intl;

    return (
      <div className='slidelisteditor-component'>
        <div id='slidelisteditor-fab-bar'>
          <SyncComponent />
          <ExportSlidesComponent
            slides={this.props.slides}
          />
          <ImportSlidesComponent />
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
            <FormattedMessage
              {...messages.subheader}
            />
          </Subheader>

          {this.props.slides.map(slide =>
            <ListItem
              /* @TODO: Have a look at https://github.com/callemall/material-ui/issues/4008 */
              style={{'WebkitAppearance': 'none'}}
              value={slide._id}
              key={'slide-list-item-' + slide._id}
              primaryText={slide.url}
              secondaryText={formatMessage(messages.secondarytext, {duration: (slide.duration / 1000)})}
            >
              <div className="slidelisteditor-slide-menu">
                <DeleteIcon
                  style={{color: this.context.muiTheme.palette.secondaryTextColor}}
                  className="slidelisteditor-slide-menu-action"
                  onTouchTap={() => {this.props.dispatch(deleteSlide(slide._id))}}
                />
                <EditIcon
                  style={{color: this.context.muiTheme.palette.secondaryTextColor}}
                  className="slidelisteditor-slide-menu-action"
                  onTouchTap={() => {this.handleEdit(slide)}}
                />
              </div>
            </ListItem>
          )}
        </List>

        <Dialog
          title={formatMessage(messages.title)}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <EditSlideForm
            slide={this.state.slideBeingEdited}
            handleClose={this.handleClose}
          />
        </Dialog>
      </div>
    );
  }
}

SlideListEditorComponent.displayName = 'SlideListEditorComponent';
SlideListEditorComponent.propTypes = {
  slides: React.PropTypes.array.isRequired
};
SlideListEditorComponent.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

export default injectIntl(connect()(SlideListEditorComponent));
