'use strict';

import React from 'react';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import ActionDelete from 'material-ui/lib/svg-icons/action/delete';
import TextField from 'material-ui/lib/text-field';
import EditorModeEdit from 'material-ui/lib/svg-icons/editor/mode-edit';

require('styles//SlideListItem.scss');

class SlideListItemComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  removeSlideFromList = () => {
    this.props.onDelete(this.props.slide._id);
  }

  handleEditSlide = () => {
    if(this.state.editing) {

      const slide = {
        'url': this.refs.editSlideUrl.getValue(),
        'duration': this.refs.editSlideDuration.getValue()
      };

      this.props.onUpdate(this.props.slide._id, slide);
      this.setState({
        editing: false
      })
    }
    else {
      this.setState({
        editing: true
      })
    }
  }

  render() {
    if(this.state.editing) {
      return(
        <TableRow>
          <TableRowColumn>
            <TextField
              ref="editSlideUrl"
              floatingLabelText="Url"
              defaultValue={this.props.slide.url}
            />
            </TableRowColumn>
          <TableRowColumn>
            <TextField
              ref="editSlideDuration"
              floatingLabelText="Duration (ms)"
              defaultValue={this.props.slide.duration}
            />
          </TableRowColumn>
          <TableRowColumn>
            <ActionDelete
              onTouchTap={this.removeSlideFromList}
            />
            <EditorModeEdit
              onTouchTap={this.handleEditSlide}
            />
          </TableRowColumn>
        </TableRow>
      )
    }

    return (
      <TableRow>
        <TableRowColumn>{this.props.slide.url}</TableRowColumn>
        <TableRowColumn>{this.props.slide.duration}</TableRowColumn>
        <TableRowColumn>
          <ActionDelete
            onTouchTap={this.removeSlideFromList}
          />
          <EditorModeEdit
            onTouchTap={this.handleEditSlide}
          />
        </TableRowColumn>
      </TableRow>
    )
  }
}

SlideListItemComponent.displayName = 'SlideListItemComponent';
SlideListItemComponent.propTypes = {
  slide: React.PropTypes.object.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onUpdate: React.PropTypes.func.isRequired
};

export default SlideListItemComponent;
