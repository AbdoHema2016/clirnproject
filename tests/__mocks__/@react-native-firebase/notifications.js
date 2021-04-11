module.exports = jest.fn(() => {
  return {
    onNotification: jest.fn(),
    onNotificationDisplayed: jest.fn(),
  };
});
