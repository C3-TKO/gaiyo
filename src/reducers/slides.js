/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
  'timeout' : undefined,
  'isPlaying' : false,
  'pointer': 0,
  'collection': [
    {'id': 1, 'sortOrder': 1, 'url': 'screen_1.html', 'timeout': 5000},
    {'id': 2, 'sortOrder': 2, 'url': 'screen_2.html', 'timeout': 5000},
    {'id': 3, 'sortOrder': 3, 'url': 'screen_3.html', 'timeout': 5000}
  ]
};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = Object.assign({}, state);

  switch(action.type) {
    case 'NEXT': {
      if (++nextState.pointer >= nextState.collection.length) {
        nextState.pointer = 0;
      }
      return nextState;
    }
    case 'STOP': {
      clearTimeout(nextState.timeout);
      nextState.isPlaying = false;
      return nextState;
    }
    case 'PLAY': {
      clearTimeout(nextState.timeout);
      nextState.timeout = action.timeout;
      nextState.isPlaying = true;
      return nextState;
    }
    case 'PREVIOUS': {
      if (--nextState.pointer < 0) {
        nextState.pointer = nextState.collection.length - 1;
      }
      return nextState;
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
