'use strict';

import React from 'react';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import RaisedButton from 'material-ui/lib/raised-button';
import SlideListItem from './SlideListItemComponent';

require('styles//SlideList.scss');

class SlideListComponent extends React.Component {

  render() {
    return (
      <div className="slidelist-component">
        <Table selectable={true}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>URL</TableHeaderColumn>
              <TableHeaderColumn>Duration (ms)</TableHeaderColumn>
              <TableHeaderColumn>&nbsp;</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.props.slides.map(slide =>
              <SlideListItem key={'slide-list-item-' + slide._id} slide={slide} onDelete={this.props.onDelete} />
              )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

SlideListComponent.displayName = 'SlideListComponent';
SlideListComponent.propTypes = {
  slides: React.PropTypes.array.isRequired,
  onDelete: React.PropTypes.func.isRequired
};

export default SlideListComponent;
