'use strict';

import React from 'react';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import FlatButton from 'material-ui/lib/flat-button';

require('styles//SlideList.scss');

class SlideListComponent extends React.Component {

  handleDelete = (id) => {
    console.log(id);
  }

  renderTableRows() {
    var tableRows = this.props.slides.map((slide) => {
      return (
        <TableRow key={'slide-lists-' + slide._id}>
          <TableRowColumn>{slide.url}</TableRowColumn>
          <TableRowColumn>{slide.duration}</TableRowColumn>
          <TableRowColumn>
            <FlatButton
              label="Delete"
              primary={true}
              onTouchTap={this.handleDelete(slide._id)}
            />
          </TableRowColumn>
        </TableRow>
      );
    });

    return tableRows;
  }

  render() {
    return (
      <div className="slidelist-component">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>URL</TableHeaderColumn>
              <TableHeaderColumn>Duration (ms)</TableHeaderColumn>
              <TableHeaderColumn>&nbsp;</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.renderTableRows()}
          </TableBody>
        </Table>
      </div>
    );
  }
}

SlideListComponent.displayName = 'SlideListComponent';


SlideListComponent.propTypes = {
  onDelete: React.PropTypes.func.isRequired
};

export default SlideListComponent;
