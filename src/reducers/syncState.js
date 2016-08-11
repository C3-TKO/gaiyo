// Using a proprietary HTTP status code for the not connected state
const statusNotConnected = 'NOT_CONNECTED';

const initialState = {
  status: statusNotConnected,
};

module.exports = function(state = initialState, action) {
  let nextState = Object.assign({}, state);

  switch(action.type) {
    case 'UPDATE_SYNC_STATE': {
      nextState.status = action.status;
      return nextState;
      break;
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
