import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import store from '../../src/store';
import AboutVersion from '../../src/containers/dashBoard/AboutVersion';
jest.mock('@react-navigation/native', () => ({
  withNavigationFocus: (component) => component,
}));

jest.useFakeTimers();

describe('Benefits screen', () => {
  const props = {
    navigation: {
      setOptions: jest.fn(),
    },
  };
  it('Benefits OTP', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <AboutVersion {...props} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
