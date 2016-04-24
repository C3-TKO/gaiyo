'use strict';

import React from 'react';
import List from 'material-ui/lib/lists/list';
import Subheader from 'material-ui/lib/Subheader'
import ListItem from 'material-ui/lib/lists/list-item';

import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

import FlatButton from 'material-ui/lib/flat-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

import Dialog from 'material-ui/lib/dialog';
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



require('styles//SlideList.scss');

class SlideListComponent extends React.Component {

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
        <MenuItem onTouchTap={() => {this.handleEdit(slide)}}>Edit</MenuItem>
        <MenuItem onTouchTap={() => {this.props.onDelete(slide._id)}}>Delete</MenuItem>
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
      <div className="slidelist-component">
        <List>
          <Subheader>
            Screen rotation list
          </Subheader>

          <div id="addSlideFAB">
            <FloatingActionButton
              mini={true}
              onTouchTap={this.handleOpen}>
              <ContentAdd />
            </FloatingActionButton>
          </div>

          {this.props.slides.map(slide =>
            <ListItem
              value={slide._id}
              key={'slide-list-item-' + slide._id}
              primaryText={slide.url}
              secondaryText={slide.duration}
              rightIconButton={this.renderRightIconMenu(slide)}
            />
          )}
        </List>

        <Dialog
          title="Slide Edit"
          actions={actions}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <EditSlideForm
            ref="editSlideForm"
            onSave={this.props.onSave}
            onUpdate={this.props.onUpdate}
            slide={this.state.slideBeingEdited}
          />
        </Dialog>
      </div>
    );
  }
}

SlideListComponent.displayName = 'SlideListComponent';
SlideListComponent.propTypes = {
  slides: React.PropTypes.array.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onUpdate: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired
};

export default SlideListComponent;
