var reducer = require('../../src/reducers/syncState');

describe('syncState', () => {

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal({code: 0})
  })

  it('should not change the passed state', (done) => {

    const state = Object.freeze({});
    reducer(state, {type: 'INVALID'});

    done();
  });
});
