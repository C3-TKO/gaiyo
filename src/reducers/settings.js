const date = new Date();

const initialState = {
  remoteDbUrl: undefined,
  syncMode: 1,
  enabled: false,
  lastChanged: date.getTime()
};

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case 'EDIT_SETTINGS': {
      let nextState = action.settings;
      if(
        action.settings.remoteDbUrl === state.remoteDbUrl &&
        action.settings.syncMode === state.syncMode &&
        action.settings.enabled === state.enabled
      ) {
        Object.assign(nextState, {lastChanged: state.lastChanged});
      }
      else {
        const changeDate = new Date();
        Object.assign(nextState, {lastChanged: changeDate.getTime()});
      }

      return nextState;
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
