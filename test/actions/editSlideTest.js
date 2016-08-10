import editSlideAction from 'actions//editSlide.js'

describe('edit slide action', () => {
  it('should create an action to edit an exsiting slide', () => {
    const slideId = 'someId';
    const slide = {
      url: 'http://www.example.com',
      duration: 5000,
      id: slideId
    }
    const expectedAction = {
      type: 'EDIT_SLIDE',
      id: slideId,
      slide: slide
    }
    expect(editSlideAction(slideId, slide)).to.deep.equal(expectedAction)
  })
})
