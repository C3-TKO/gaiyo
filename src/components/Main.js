require('normalize.css');
require('styles/App.css');

import React from 'react';
import RotatorComponent from './RotatorComponent';
import SettingsComponent from './SettingsComponent';

class AppComponent extends React.Component {

  handleSave(slide) {
    this.props.actions.addSlide(slide);
  }

  handleEdit(id, slide) {
    this.props.actions.editSlide(id, slide);
  }

  handleDelete(id) {
    this.props.actions.deleteSlide(id)
  }

  renderWithFilledCollection() {
    if (this.props.slides.length > 0) {
      return (
        <div>
          <RotatorComponent slides={this.props.slides}/>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="index">
        {this.renderWithFilledCollection()}
        <SettingsComponent slides={this.props.slides} onSave={this.handleSave.bind(this)} onDelete={this.handleDelete.bind(this)} onUpdate={this.handleEdit.bind(this)}/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
