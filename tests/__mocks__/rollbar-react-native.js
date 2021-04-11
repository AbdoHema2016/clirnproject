export const Client = jest.fn(() => {
  return {
    log: jest.fn(),
    debug: jest.fn(),
  };
});
export default Client;
