import { ADD_SLIDE, EDIT_SLIDE, DELETE_SLIDE, INSERT_SLIDE, UPDATE_SLIDE } from '../constants/ActionTypes'

const initialState = [];

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  switch(action.type) {
    case ADD_SLIDE:
      return [
        ...state,
        {
          _id: id(),
          url: action.slide.url,
          duration: action.slide.duration
        }
      ];
    case UPDATE_SLIDE:
      return state.map(slide =>
        slide._id === action.slide._id ?
          action.slide :
          slide
      )
    case INSERT_SLIDE:
      return [
        ...state,
        action.slide
      ]
    case DELETE_SLIDE:
      return state.filter(slide =>
        slide._id !== action.id
      )
    case EDIT_SLIDE:
      return state.map(slide =>
        slide._id === action.id
          ? Object.assign({}, slide, {
              url: action.slide.url,
              duration: action.slide.duration
            })
          : slide
      )

    default:
      /* Return original state if no actions were consumed. */
      return state;
  }
}

function id() {
  return Math.random().toString(36).substring(7);
}
