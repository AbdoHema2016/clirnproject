import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import store from '../../src/store';
import ForgotPassword from '../../src/containers/onBoarding/forgotPassword/ForgotPassword';

jest.mock('@react-native-firebase/messaging', () => {});
jest.mock('react-native-localize', () => {});

jest.useFakeTimers();

describe('ForgotPassword screen', () => {
  it('Snapshot ForgotPassword', () => {
    const props = {
      navigation: {
        setOptions: jest.fn(),
      },
    };
    const tree = renderer
      .create(
        <Provider store={store}>
          <ForgotPassword {...props} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
