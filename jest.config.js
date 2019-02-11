module.exports = {
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  setupFilesAfterEnv: ['enzyme-adapter-configure'],
  snapshotSerializers: ['enzyme-to-json/serializer']
}
