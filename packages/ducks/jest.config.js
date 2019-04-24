module.exports = {
  testURL: 'http://localhost',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '((\\.|/)(spec))\\.ts$',
  coverageReporters: ['lcov', 'text'],
  moduleFileExtensions: ['js', 'ts'],
  moduleNameMapper: {
    '@test/mocks': '<rootDir>/test/mocks/index'
  },
  setupTestFrameworkScriptFile: './test/setup.ts'
};
