import addSlideAction from 'actions//addSlide.js'

describe.only('add slide action', () => {
  it('should create an action to add a slide', () => {
    const slide = {
      url: 'http://www.example.com',
      duration: 5000,
      id: 'test'
    }
    const expectedAction = {
      type: 'ADD_SLIDE',
      slide
    }
    expect(addSlideAction(slide)).to.deep.equal(expectedAction)
  })
})
