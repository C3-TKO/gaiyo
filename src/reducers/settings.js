const initialState = {
  remoteDbUrl: undefined,
  syncMode: 1,
  enabled: false
};

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case 'EDIT_SETTINGS': {
      return  action.settings;
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
