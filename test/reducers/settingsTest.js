var reducer = require('../../src/reducers/settings');

const initialStateSpecification = {
  remoteDbUrl: undefined,
  remoteDbUser: undefined,
  remoteDbPassword: undefined,
  syncMode: 1,
  enabled: false,
  settingsHash: JSON.stringify(
    {
      remoteDbUrl: undefined,
      remoteDbUser: undefined,
      remoteDbPassword: undefined,
      syncMode: 1,
      enabled: false
    }
  )
}

describe('settings reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal(initialStateSpecification)
  })

  it('should not change the passed state', (done) => {

    const state = Object.freeze({});
    reducer(state, {type: 'INVALID'});

    done();
  });

  it('should handle EDIT_SETTINGS when there is no change', () => {
    expect(
      reducer(initialStateSpecification,
        {
          type: 'EDIT_SETTINGS',
          settings: {
            remoteDbUrl: undefined,
            remoteDbUser: undefined,
            remoteDbPassword: undefined,
            syncMode: 1,
            enabled: false
          }
        }
      )
    ).to.deep.equal(initialStateSpecification)
  })

  it('should handle EDIT_SETTINGS when there is a change', () => {
    expect(
      reducer(initialStateSpecification,
        {
          type: 'EDIT_SETTINGS',
          settings: {
            remoteDbUrl: 'http://example.com',
            remoteDbUser: 'test-user',
            remoteDbPassword: 'test-pwd',
            syncMode: 3,
            enabled: true
          }
        }
      )
    ).to.deep.equal(
      {
        remoteDbUrl: 'http://example.com',
        remoteDbUser: 'test-user',
        remoteDbPassword: 'test-pwd',
        syncMode: 3,
        enabled: true,
        settingsHash: JSON.stringify(
          {
            remoteDbUrl: 'http://example.com',
            remoteDbUser: 'test-user',
            remoteDbPassword: 'test-pwd',
            syncMode: 3,
            enabled: true
          }
        )
      }
    )
  })

});
