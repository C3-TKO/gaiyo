/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = [];

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  switch(action.type) {
    case 'ADD_SLIDE':
      return [
        {
          _id: id(),
          url: action.slide.url,
          duration: action.slide.duration
        },
        ...state
      ]
    case 'UPDATE_SLIDE':
      return state.map(slide =>
        slide._id === action.slide._id ?
          action.slide :
          slide
      )
    case 'INSERT_SLIDE':
      return [
        action.slide,
        ...state
      ]
    case 'DELETE_SLIDE':
      return state.filter(slide =>
        slide._id !== action.id
      )
    default:
      /* Return original state if no actions were consumed. */
      return state;
  }
}

function id() {
  return Math.random().toString(36).substring(7);
}
