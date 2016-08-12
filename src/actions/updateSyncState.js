import { UPDATE_SYNC_STATE } from '../constants/ActionTypes'

module.exports = function(status) {
  return { type: UPDATE_SYNC_STATE, status };
};
