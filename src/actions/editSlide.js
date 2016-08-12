import { EDIT_SLIDE } from '../constants/ActionTypes'

module.exports = function(id, slide) {
  return { type: EDIT_SLIDE, id, slide};
};
