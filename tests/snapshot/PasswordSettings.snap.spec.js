import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import store from '../../src/store';
import PasswordSettings from '../../src/containers/dashBoard/Settings/passwordSettings/PasswordSettings';

jest.mock('@react-navigation/native', () => {});
jest.mock('react-native-gesture-handler', () => {});
jest.mock('@react-navigation/native', () => ({
  withNavigationFocus: (component) => component,
}));

jest.useFakeTimers();

describe('Password settings screen', () => {
  const props = {
    navigation: {
      setOptions: jest.fn(),
    },
  };
  it('Snapshot Password settings', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <PasswordSettings {...props} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
