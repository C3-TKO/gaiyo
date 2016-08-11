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
});
