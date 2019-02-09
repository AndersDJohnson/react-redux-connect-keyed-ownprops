module.exports = {
  collectCoverage: true,
  setupFilesAfterEnv: ['<rootDir>/jestEnzymeSetup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer']
}
