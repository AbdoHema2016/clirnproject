module.exports = jest.fn(() => {
  return {
    hasPermission: jest.fn(() => Promise.resolve(true)),
    subscribeToTopic: jest.fn(),
    unsubscribeFromTopic: jest.fn(),
    requestPermission: jest.fn(() => Promise.resolve(true)),
    getToken: jest.fn(() => Promise.resolve('myMockToken')),
    getInitialNotification: jest.fn(() =>
      Promise.resolve('myMockNotification'),
    ),
    onTokenRefresh: jest.fn(),
    onMessage: jest.fn(),
    onNotificationOpenedApp: jest.fn(),
  };
});
