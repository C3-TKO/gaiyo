'use strict';

import React from 'react';
import SlideListItem from './SlideListItemComponent';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

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
