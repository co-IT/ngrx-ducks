module.exports = {
  testURL: 'http://localhost',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '((\\.|/)(spec))\\.ts$',
  coverageReporters: ['lcov', 'text'],
  moduleFileExtensions: ['js', 'ts'],
  setupTestFrameworkScriptFile: './test/setup.ts'
};
