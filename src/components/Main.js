require('normalize.css');
require('styles/App.css');

import React from 'react';
import IframeComponent from './IframeComponent';
import ControlsComponent from './ControlsComponent';
import StopWatchComponent from './StopWatchComponent';
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
          <IframeComponent url={this.props.slides[this.props.control.pointer].url}/>
          <ControlsComponent slides={this.props.slides}/>
          <StopWatchComponent slides={this.props.slides}/>
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
