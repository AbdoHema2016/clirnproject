import 'react-native';
import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';

jest.mock('react-native-otp-verify', () => ({
  getHash: jest.fn().mockImplementation(() => Promise.reject()),
  getOtp: jest.fn(),
  removeListener: jest.fn(),
}));

jest.useFakeTimers();

describe('<App>', () => {
  it('renders correctly', async () => {
    renderer.create(<App />);
  });
});
