import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import store from '../../src/store';
import VerificationPermissionUpdate from '../../src/containers/dashBoard/EmployerPermissions/verificationPopup';

jest.mock('@react-navigation/native', () => ({
  withNavigationFocus: (component) => component,
}));

jest.useFakeTimers();

describe('Verification permission', () => {
  const props = {
    navigation: {
      setOptions: jest.fn(),
    },
  };
  it('Snapshot Pop up', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <VerificationPermissionUpdate {...props} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
