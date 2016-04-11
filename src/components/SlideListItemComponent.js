'use strict';

import React from 'react';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import RaisedButton from 'material-ui/lib/raised-button';

require('styles//SlideListItem.scss');

class SlideListItemComponent extends React.Component {

  test = () => {
    console.log(this.props.slide._id);
  }

  render() {
    return (
      <TableRow>
        <TableRowColumn>{this.props.slide.url}</TableRowColumn>
        <TableRowColumn>{this.props.slide.duration}</TableRowColumn>
        <TableRowColumn>
          <RaisedButton
            onTouchTap={this.test}
            primary={true}
          >
            DELETE
          </RaisedButton>
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