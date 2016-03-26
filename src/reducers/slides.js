/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = Object.assign({}, state);

  switch(action.type) {
    case 'NEXT': {
      // Modify next state depending on the action and return it
      return nextState;
    } break;
    case 'STOP': {
      // Modify next state depending on the action and return it
      return nextState;
    } break;
    case 'PLAY': {
      // Modify next state depending on the action and return it
      return nextState;
    } break;
    case 'PREVIOUS': {
      // Modify next state depending on the action and return it
      return nextState;
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
