import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import store from '../../src/store';
import Feeling from '../../src/containers/health/feeling/Feeling';

jest.mock('@react-navigation/native', () => ({
  withNavigationFocus: (component) => component,
}));

jest.useFakeTimers();

describe('Feeling screen', () => {
  const props = {
    navigation: {
      setOptions: jest.fn(),
    },
  };
  it('Snapshot Feeling', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Feeling {...props} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
