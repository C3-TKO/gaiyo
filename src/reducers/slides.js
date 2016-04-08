/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
  /*'collection': [
    {'_id': '1', '_rev' : '', 'sortOrder': 1, 'url': 'screen_1.html', 'timeout': 5000},
    {'_id': '2', '_rev' : '', 'sortOrder': 2, 'url': 'screen_2.html', 'timeout': 5000},
    {'_id': '3', '_rev' : '', 'sortOrder': 3, 'url': 'screen_3.html', 'timeout': 5000}
  ],*/
  'collection': []
};

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
