'use strict';

import React from 'react';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import ActionDelete from 'material-ui/lib/svg-icons/action/delete';

require('styles//SlideListItem.scss');

class SlideListItemComponent extends React.Component {

  removeSlideFromList = () => {
    this.props.onDelete(this.props.slide._id);
  }

  render() {
    return (
      <TableRow>
        <TableRowColumn>{this.props.slide.url}</TableRowColumn>
        <TableRowColumn>{this.props.slide.duration}</TableRowColumn>
        <TableRowColumn>
          <ActionDelete
            onTouchTap={this.removeSlideFromList}
          />
        </TableRowColumn>
      </TableRow>
    )
  }
}

SlideListItemComponent.displayName = 'SlideListItemComponent';
SlideListItemComponent.propTypes = {
  slide: React.PropTypes.object.isRequired,
  onDelete: React.PropTypes.func.isRequired
};

export default SlideListItemComponent;
