const initialStateRaw = {
  remoteDbUrl: undefined,
  remoteDbUser: undefined,
  remoteDbPassword: undefined,
  syncMode: 1,
  enabled: false
}

const initialState = Object.assign(initialStateRaw, {settingsHash: JSON.stringify(initialStateRaw)})

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case 'EDIT_SETTINGS': {
      let nextState = action.settings;
      // Checks if settings have been changed in order to trigger a reboot
      if(
        action.settings.remoteDbUrl === state.remoteDbUrl &&
        action.settings.remoteDbUser === state.remoteDbUser &&
        action.settings.remoteDbPassword === state.remoteDbPassword &&
        action.settings.syncMode === state.syncMode &&
        action.settings.enabled === state.enabled
      ) {
        Object.assign(nextState, {settingsHash: state.settingsHash});
      }
      else {
        // This property will be used to determine if a reboot after the settings state has been changed
        Object.assign(nextState, {settingsHash: JSON.stringify(nextState)});
      }

      return nextState;
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
