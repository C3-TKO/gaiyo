const initialState = {
  remoteDbUrl: undefined,
  syncMode: 1,
  enabled: false
};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state);

  switch(action.type) {
    case 'EDIT_SETTINGS': {
      return action.settings;
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
