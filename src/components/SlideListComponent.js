'use strict';

import React from 'react';
import SlideListItem from './SlideListItemComponent';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon/>
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Edit</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

require('styles//SlideList.scss');

class SlideListComponent extends React.Component {

  render() {
    return (
      <div className="slidelist-component">
        <List>
          {this.props.slides.map(slide =>
            <ListItem
              key={'slide-list-item-' + slide._id}
              slide={slide}
              onDelete={this.props.onDelete}
              onUpdate={this.props.onUpdate}
              primaryText={slide.url}
              secondaryText={slide.duration}
              rightIconButton={rightIconMenu}
            />
          )}
        </List>
      </div>
    );
  }
}

SlideListComponent.displayName = 'SlideListComponent';
SlideListComponent.propTypes = {
  slides: React.PropTypes.array.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onUpdate: React.PropTypes.func.isRequired
};

export default SlideListComponent;
