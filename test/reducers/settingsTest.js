var reducer = require('../../src/reducers/settings');

describe.only('settings reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal(
      {
        remoteDbUrl: undefined,
        remoteDbUser: undefined,
        remoteDbPassword: undefined,
        syncMode: 1,
        enabled: false,
        lastChanged: undefined
      }
    )
  })

  it('should not change the passed state', (done) => {

    const state = Object.freeze({});
    reducer(state, {type: 'INVALID'});

    done();
  });
  
});
