module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: ['**/*.js', '!node_modules/**', '!dist/**', '!coverage/**'],
  testMatch: ['**/__tests__/**/*.test.js', '**/*.test.js'],
  forceExit: true,
  clearMocks: true,
}
