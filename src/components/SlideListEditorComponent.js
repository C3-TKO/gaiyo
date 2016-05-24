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
import ContentAdd from 'material-ui/svg-icons/content/add';

import Dialog from 'material-ui/Dialog';
import EditSlideForm from './EditSlideFormComponent';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon/>
  </IconButton>
);



require('styles//SlideListEditor.scss');

class SlideListEditorComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      slideBeingEdited: undefined
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

  renderRightIconMenu(slide) {
    return (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem
          /* @TODO: Have a look at https://github.com/callemall/material-ui/issues/4008 */
          style={{'-webkit-appearance': 'none'}}
          onTouchTap={() => {this.handleEdit(slide)}}>Edit
        </MenuItem>
        <MenuItem
          /* @TODO: Have a look at https://github.com/callemall/material-ui/issues/4008 */
          style={{'-webkit-appearance': 'none'}}
          onTouchTap={() => {this.props.onDelete(slide._id)}}>Delete
        </MenuItem>
      </IconMenu>
    )
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Save"
        primary={true}
        onTouchTap={this.handleSave}
      />
    ];

    return (
      <div className='slidelisteditor-component'>
        <div id='addSlideFAB'>
          <FloatingActionButton
            mini={true}
            onTouchTap={this.handleOpen}>
            <ContentAdd />
          </FloatingActionButton>
        </div>

        <List>
          <Subheader>
            Screen rotation list
          </Subheader>

          {this.props.slides.map(slide =>
            <ListItem
              /* @TODO: Have a look at https://github.com/callemall/material-ui/issues/4008 */
              style={{'-webkit-appearance': 'none'}}
              value={slide._id}
              key={'slide-list-item-' + slide._id}
              primaryText={slide.url}
              secondaryText={slide.duration}
              rightIconButton={this.renderRightIconMenu(slide)}
            />
          )}
        </List>

        <Dialog
          title='Slide Edit'
          actions={actions}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <EditSlideForm
            ref='editSlideForm'
            onAdd={this.props.onAdd}
            onEdit={this.props.onEdit}
            slide={this.state.slideBeingEdited}
          />
        </Dialog>
      </div>
    );
  }
}

SlideListEditorComponent.displayName = 'SlideListEditorComponent';
SlideListEditorComponent.propTypes = {
  slides: React.PropTypes.array.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onEdit: React.PropTypes.func.isRequired,
  onAdd: React.PropTypes.func.isRequired
};

export default SlideListEditorComponent;
