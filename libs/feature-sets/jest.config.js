const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('./tsconfig.json');

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  displayName: 'feature-sets',
  // default nx jest preset https://github.com/nrwl/nx/blob/13.9.5/packages/jest/preset/jest-preset.ts
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  testMatch: ['**/+(*.)+(spec|test).ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  coverageDirectory: '../../coverage/libs/feature-sets',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  setupFiles: ['<rootDir>/config/test/unit/setupFiles.js'],
  setupFilesAfterEnv: ['<rootDir>/config/test/unit/setupFilesAfterEnv.js'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  coverageReporters: ['html', 'text'],
  collectCoverageFrom: [
    'src/lib',
    /* please add more paths for unit tests */
  ].map((base) => `${base}/**/*.{ts,tsx}`),
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
    /* please update your coverage threshold */
  },
};

module.exports = config;
