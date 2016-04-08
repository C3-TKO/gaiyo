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
import AddSlideForm from './AddSlideFormComponent';

require('styles//Settings.scss');

class SettingsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: this.props.slides.length === 0
    };
  }

  handleOpen = () => {
    this.setState({
      open: true
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  renderTableRows() {
    var tableRows = this.props.slides.map(function(slide) {
      return (
        <TableRow key={'slide-lists-' + slide._id}>
          <TableRowColumn>{slide.sortOrder}</TableRowColumn>
          <TableRowColumn>{slide.url}</TableRowColumn>
          <TableRowColumn>{slide.duration}</TableRowColumn>
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
        <FloatingActionButton mini={true} onTouchTap={this.handleOpen}>
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
                <TableHeaderColumn>Sort order</TableHeaderColumn>
                <TableHeaderColumn>URL</TableHeaderColumn>
                <TableHeaderColumn>Duration (ms)</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.renderTableRows()}
            </TableBody>
          </Table>
          <AddSlideForm onSave={this.props.onSave}/>
        </Dialog>
      </div>
    );
  }
}

SettingsComponent.displayName = 'SettingsComponent';

SettingsComponent.propTypes = {
  slides: React.PropTypes.array.isRequired,
  onSave: React.PropTypes.func.isRequired
};

export default SettingsComponent;
