const defaultState = {
  type: 'cellular',
  isConnected: true,
  isInternetReachable: true,
  details: {
    isConnectionExpensive: true,
    cellularGeneration: '3g',
  },
};

const RNCNetInfoMock = {
  configure: jest.fn(),
  fetch: () => Promise.resolve(defaultState),
  addEventListener: jest.fn(),
  useNetInfo: jest.fn(),
};

RNCNetInfoMock.useNetInfo.mockResolvedValue(defaultState);

module.exports = RNCNetInfoMock;
