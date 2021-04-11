import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import store from '../../src/store';
import HealthTest from '../../src/containers/health/healthTest/HealthTest';

jest.mock('@react-navigation/native', () => {});
jest.mock('react-native-gesture-handler', () => {});

jest.mock('@react-navigation/native', () => ({
  withNavigationFocus: (component) => component,
}));

jest.useFakeTimers();

describe('HealthTest screen', () => {
  const props = {
    navigation: {
      setOptions: jest.fn(),
    },
    addContactetails: jest.fn(),
    resendOtp: jest.fn(),
    emptyOtp: jest.fn(),
    resetOtp: jest.fn(),
    sendOtp: jest.fn(),
  };
  it('Snapshot HealthTest', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <HealthTest {...props} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
