import { EDIT_SETTINGS } from '../constants/ActionTypes'

module.exports = function(settings) {
  return { type: EDIT_SETTINGS, settings};
};
