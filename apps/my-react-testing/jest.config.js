module.exports = {
  displayName: 'my-react-testing',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  coverageDirectory: '../../coverage/apps/my-react-testing',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  setupFiles: ['<rootDir>/config/test/unit/setupFiles.ts'],
  setupFilesAfterEnv: ['<rootDir>/config/test/unit/setupFilesAfterEnv.ts'],
};
