'use strict';

import React from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ActionSettings from 'material-ui/lib/svg-icons/action/settings';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

require('styles//Settings.scss');

class SettingsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  renderTableRows() {
    console.log(this.props);
    var tableRows = this.props.slides.collection.map(function(slide) {
      return (
        <TableRow>
          <TableRowColumn>1</TableRowColumn>
          <TableRowColumn>{slide.url}</TableRowColumn>
          <TableRowColumn>{slide.timeout}</TableRowColumn>
        </TableRow>
      );
    });

    return tableRows;
  }

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <div className="settings-component">
        <FloatingActionButton mini={true} onMouseDown={this.handleOpen}>
          <ActionSettings />
        </FloatingActionButton>

        <Dialog
          title="Screen rotation list"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>ID (Sort order)</TableHeaderColumn>
                <TableHeaderColumn>URL</TableHeaderColumn>
                <TableHeaderColumn>Duration (ms)</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.renderTableRows()}
            </TableBody>
          </Table>
        </Dialog>
      </div>
    );
  }
}

SettingsComponent.displayName = 'SettingsComponent';

SettingsComponent.propTypes = {
  slides : React.PropTypes.object.isRequired
};

export default SettingsComponent;
