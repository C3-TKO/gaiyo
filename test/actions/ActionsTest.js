import addSlideAction from 'actions//addSlide.js'
import deleteSlideAction from 'actions//deleteSlide.js'
import editSlideAction from 'actions//editSlide.js'
import editSettingsAction from 'actions//editSettings.js'
import updateSyncStateAction from 'actions//updateSyncState.js'

describe('Actions', () => {
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

  it('should create an action to delete a slide', () => {
    const idSlideToDelete = 'someid';
    const expectedAction = {
      type: 'DELETE_SLIDE',
      id: idSlideToDelete
    }
    expect(deleteSlideAction(idSlideToDelete)).to.deep.equal(expectedAction)
  })

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

  it('should create an action to edit settings', () => {

    const settings = {
      remoteDbUrl: 'http://www.exampe.com:5984',
      remoteDbUser: 'foo',
      remoteDbPassword: 'bar',
      syncMode: '3'
    }
    const expectedAction = {
      type: 'EDIT_SETTINGS',
      settings: settings
    }
    expect(editSettingsAction(settings)).to.deep.equal(expectedAction)
  })

  it('should create an action to update the state of the sync with a remote db', () => {
    const status = 'somestatus';
    const expectedAction = {
      type: 'UPDATE_SYNC_STATE',
      status: status
    }
    expect(updateSyncStateAction(status)).to.deep.equal(expectedAction)
  })
})
