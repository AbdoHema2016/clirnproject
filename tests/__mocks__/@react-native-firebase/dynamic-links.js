module.exports = {
  __esModule: true,
  default: () => ({
    getInitialLink: jest.fn(() => Promise.resolve(true)),
    onLink: jest.fn(() => Promise.resolve(true)),
    buildShortLink: jest.fn(() => Promise.resolve(true)),
  }),
};
