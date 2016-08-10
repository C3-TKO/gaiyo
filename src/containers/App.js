/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from '../components/Main';
/* Populated by react-webpack-redux:reducer */
class App extends Component {
  render() {
    const {actions, slides, settings, syncState} = this.props;
    return (
      <Main
        actions={actions}
        slides={slides}
        settings={settings}
        syncState={syncState}/>
    );
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
App.propTypes = {
  actions: PropTypes.object.isRequired,
  slides: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  syncState: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    slides: state.slides,
    settings: state.settings,
    syncState: state.syncState
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    addSlide: require('../actions/addSlide.js'),
    deleteSlide: require('../actions/deleteSlide.js'),
    editSlide: require('../actions/editSlide.js'),
    editSettings: require('../actions/editSettings.js'),
    updateSyncState: require('../actions/updateSyncState.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
