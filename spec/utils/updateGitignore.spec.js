const { join } = require('path')

describe('updateGitignore script', () => {
  /* eslint-disable global-require */
  it('updates .gitignore with new entries', () => {
    jest.mock('../../config/filelist')
    const packName = join(process.cwd(), '.gitignore')
    require('fs-extra').__setFilesManifest({
      [packName]: `
*.DS_Store
.AppleDouble
.LSOverride
Thumbs.db
ehthumbs.db
ehthumbs_vista.db
node_modules/
jspm_packages/`,
    })
    const expectedContent = `
*.DS_Store
.AppleDouble
.LSOverride
Thumbs.db
ehthumbs.db
ehthumbs_vista.db
node_modules/
jspm_packages/
functions/**
!functions/package.json
`
    const updateGitignore = require('../../scripts/utils/updateGitignore')

    return updateGitignore().then((actual) => {
      expect(actual.filename).toEqual(packName)
      expect(actual.content).toEqual(expectedContent)
    })
  })
})
