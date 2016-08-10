import deleteSlideAction from 'actions//deleteSlide.js'

describe('delete slide action', () => {
  it('should create an action to delete a slide', () => {
    const idSlideToDelete = 'someid';
    const expectedAction = {
      type: 'DELETE_SLIDE',
      id: idSlideToDelete
    }
    expect(deleteSlideAction(idSlideToDelete)).to.deep.equal(expectedAction)
  })
})
