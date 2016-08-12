var reducer = require('../../src/reducers/slides');
import addSlideAction from '../../src/actions/addSlide.js';
import editSlideAction from '../../src/actions/editSlide.js';
import deleteSlideAction from '../../src/actions/deleteSlide.js';
import * as ActionTypes from '../../src/constants/ActionTypes'

describe('slides', () => {

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal([])
  })

  it('should not change the passed state', (done) => {

    const state = Object.freeze({});
    reducer(state, {type: 'INVALID'});

    done();
  });

  describe('action handling', () => {
    it('should handle ADD_SLIDE', () => {
      const reducerStateAfterHandlingAddSlide = reducer(undefined, addSlideAction({
        url: 'http://www.example.com',
        duration: 5000
      }))
      expect(reducerStateAfterHandlingAddSlide.length).to.equal(1);
      expect(reducerStateAfterHandlingAddSlide[0].url).to.equal('http://www.example.com');
      expect(reducerStateAfterHandlingAddSlide[0].duration).to.equal(5000);
    })

    it('should handle EDIT_SLIDE', () => {
      const reducerStateAfterHandlingAddSlide = reducer(
        [
          {
            _id: '1234567',
            url: 'http://www.exmaple.com',
            duration: 5000
          }
        ], editSlideAction('1234567',
          {
            url: 'http://smash.cologne',
            duration: 7500
          }
        )
      )
      expect(reducerStateAfterHandlingAddSlide.length).to.equal(1);
      expect(reducerStateAfterHandlingAddSlide[0].url).to.equal('http://smash.cologne');
      expect(reducerStateAfterHandlingAddSlide[0].duration).to.equal(7500);
    })

    it('should handle DELETE_SLIDE', () => {
      const reducerStateAfterHandlingAddSlide = reducer(
        [
          {
            _id: '1234567',
            url: 'http://www.exmaple.com',
            duration: 5000
          }
        ], deleteSlideAction('1234567')
      )
      expect(reducerStateAfterHandlingAddSlide.length).to.equal(0);
    })
  })

  describe('pouch db middleware action handling', () => {
    it('should handle INSERT_SLIDE', () => {
      const reducerStateAfterHandlingAddSlide = reducer(
        [],
        {
          type: ActionTypes.INSERT_SLIDE,
          slide: {
            _id: '1234567',
            url: 'http://www.exmaple.com',
            duration: 5000
          }
        }
      )
      expect(reducerStateAfterHandlingAddSlide).to.deep.equal([
        {
          _id: '1234567',
          url: 'http://www.exmaple.com',
          duration: 5000
        }
      ]);
    })

    it('should handle UPDATE_SLIDE', () => {
      const reducerStateAfterHandlingAddSlide = reducer(
        [{
          _id: '1234567',
          url: 'http://www.exmaple.com',
          duration: 5000
        }],
        {
          type: ActionTypes.UPDATE_SLIDE,
          slide: {
            _id: '1234567',
            url: 'http://smash.cologne',
            duration: 7500
          }
        }
      )
      expect(reducerStateAfterHandlingAddSlide).to.deep.equal([
        {
          _id: '1234567',
          url: 'http://smash.cologne',
          duration: 7500
        }
      ]);
    })
  })
});
