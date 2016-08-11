var reducer = require('../../src/reducers/syncState');
import * as SyncStates from '../../src/constants/SyncStates.js'

describe('syncState', () => {

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal({status: SyncStates.NOT_CONNECTED})
  })

  it('should not change the passed state', (done) => {

    const state = Object.freeze({});
    reducer(state, {type: 'INVALID'});

    done();
  });

  it('should handle EDIT_SETTINGS when there is no change', () => {
    expect(
      reducer({status: SyncStates.NOT_CONNECTED},
        {
          type: 'UPDATE_SYNC_STATE',
          status: SyncStates.NOT_CONNECTED
        }
      )
    ).to.deep.equal({status: SyncStates.NOT_CONNECTED})
  })

  it('should handle EDIT_SETTINGS when there is a change', () => {
    expect(
      reducer({status: SyncStates.NOT_CONNECTED},
        {
          type: 'UPDATE_SYNC_STATE',
          status: SyncStates.ACTIVE
        }
      )
    ).to.deep.equal(
      {
        status: SyncStates.ACTIVE
      }
    )
  })
});
