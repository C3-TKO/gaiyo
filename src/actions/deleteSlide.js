import { DELETE_SLIDE } from '../constants/ActionTypes'

module.exports = function(id) {
  return { type: DELETE_SLIDE, id };
};
