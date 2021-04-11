import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {MenuProvider} from 'react-native-popup-menu';
import store from '../../src/store';
import Profile from '../../src/containers/dashBoard/Home/Profile';

jest.mock('@react-navigation/native', () => {});
jest.mock('react-native-gesture-handler', () => {});

jest.mock('@react-navigation/native', () => ({
  withNavigationFocus: (component) => component,
}));

jest.useFakeTimers();

describe('Profile screen', () => {
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
  it('Snapshot Profile', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MenuProvider>
            <Profile {...props} />
          </MenuProvider>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
