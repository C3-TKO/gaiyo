import { ADD_SLIDE } from '../constants/ActionTypes'

module.exports = function(slide) {
  return { type: ADD_SLIDE, slide };
};
