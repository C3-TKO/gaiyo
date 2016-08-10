import editSettingsAction from 'actions//editSettings.js'

describe('edit settings action', () => {
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
})
