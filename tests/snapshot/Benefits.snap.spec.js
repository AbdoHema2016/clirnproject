import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import store from '../../src/store';
import Benefits from '../../src/containers/onBoarding/Benefits/Benefits';

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
          <Benefits {...props} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
