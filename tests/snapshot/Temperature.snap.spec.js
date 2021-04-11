import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import store from '../../src/store';
import Temperature from '../../src/containers/health/temperature/Temperature';

jest.mock('@react-navigation/native', () => ({
  withNavigationFocus: (component) => component,
}));
jest.useFakeTimers();

describe('Temperature screen', () => {
  const props = {
    navigation: {
      setOptions: jest.fn(),
    },
  };
  it('Snapshot Temperature', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Temperature {...props} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
