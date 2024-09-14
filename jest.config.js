export default {
    setupFilesAfterEnv: ['./tests/jest.setup.js'],
    testEnvironment: 'node', // or 'jsdom' depending on your needs
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'json', 'node'],
    // Other configurations
  };
  