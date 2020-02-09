module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['./test/setup.ts'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.json'
    }
  },
  transformIgnorePatterns: ['node_modules/(?!@ngrx)']
};
