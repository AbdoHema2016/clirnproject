module.exports = {
  preset: 'react-native',
  verbose: true,
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
    },
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-router-native|react-native-[a-z-]+|@react-native-[a-z-]+|@twotalltotems/react-native-otp-input)/)',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/__mocks__/fileMock.js',
  },
  setupFiles: [
    './tests/setup.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
};
