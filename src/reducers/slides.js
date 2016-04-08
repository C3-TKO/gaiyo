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
    case 'ADD_SLIDE' :
      const result = [
        {
          _id: id(),
          url: action.slide.url,
          duration: action.slide.duration
        },
        ...nextState
      ]

      console.log(result);
      console.log(nextState);

      return result;

    default:
      /* Return original state if no actions were consumed. */
      return state;
  }
}

function id() {
  return Math.random().toString(36).substring(7);
}
