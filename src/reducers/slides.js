/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
  'timeout' : undefined,
  'isPlaying' : true,
  'pointer': 0,
  'collection': [
    {'url': 'http://smash.cologne', 'timeout': 5000},
    {'url': 'http://cevapsushi.de', 'timeout': 5000},
    {'url': 'http://www.opel.de', 'timeout': 5000}
  ]
};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = Object.assign({}, state);

  switch(action.type) {
    case 'NEXT': {
      clearTimeout(nextState.timeout);
      if (++nextState.pointer >= nextState.collection.length) {
        nextState.pointer = 0;
      }
      handleTimeout(nextState);
      return nextState;
    } break;
    case 'STOP': {
      clearTimeout(nextState.timeout);
      nextState.isPlaying = false;
      handleTimeout(nextState);
      return nextState;
    } break;
    case 'PLAY': {
      clearTimeout(nextState.timeout);
      nextState.isPlaying = true;
      handleTimeout(nextState);
      return nextState;
    } break;
    case 'PREVIOUS': {
      clearTimeout(nextState.timeout);
      if (--nextState.pointer < 0) {
        nextState.pointer = nextState.collection.length - 1;
      }
      handleTimeout(nextState);
      return nextState;
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

function handleTimeout(state) {
  clearTimeout(state.timeout);
  if (state.isPlaying) {
    console.log('should dispatch play after timeout');
  }
  else {
    console.log('should do nothing');
  }
}
