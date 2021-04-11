import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import store from '../../src/store';
import OTP from '../../src/containers/onBoarding/otp/OTP';

jest.mock('react-native-gesture-handler', () => {});
jest.mock('react-native-otp-verify', () => ({
  getOtp: jest.fn(),
  removeListener: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
  withNavigationFocus: (component) => component,
}));
jest.useFakeTimers();
describe('OTP screen', () => {
  const props = {
    navigation: {
      setOptions: jest.fn(),
      addListener: jest.fn(),
    },
    addContactetails: jest.fn(),
    resendOtp: jest.fn(),
    emptyOtp: jest.fn(),
    resetOtp: jest.fn(),
    sendOtp: jest.fn(),
    route: {
      params: jest.fn(),
    },
  };
  it('Snapshot OTP', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <OTP {...props} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
