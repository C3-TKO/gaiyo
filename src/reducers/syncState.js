import * as SyncStates from '../constants/SyncStates.js'

const initialState = {
  status: SyncStates.NOT_CONNECTED
};

module.exports = function(state = initialState, action) {
  let nextState = Object.assign({}, state);

  switch(action.type) {
    case 'UPDATE_SYNC_STATE': {
      nextState.status = action.status;
      return nextState;
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
