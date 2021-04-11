import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import store from '../../src/store';
import SignIn from '../../src/containers/onBoarding/SignIn/SignIn';
jest.mock('react-native-otp-verify', () => ({
  getHash: jest.fn().mockImplementation(() => Promise.reject()),
  getOtp: jest.fn(),
  removeListener: jest.fn(),
}));
describe('Snapshot screen', () => {
  const props = {
    navigation: {
      setOptions: jest.fn(),
    },
  };
  it('Snapshot Sign', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <SignIn {...props} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
