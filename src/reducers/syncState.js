// Using a proprietary HTTP status code for the not connected state
const codeNotConnected = 900;

const initialState = {
  code: codeNotConnected
};

module.exports = function(state = initialState, action) {
  let nextState = Object.assign({}, state);

  switch(action.type) {
    case 'UPDATE_SYNC_STATE': {
      nextState.code = action.code;
      return nextState;
      break;
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
