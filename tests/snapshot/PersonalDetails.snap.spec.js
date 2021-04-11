import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import store from '../../src/store';
import PersonalDetails from '../../src/containers/onBoarding/personalDetails/PersonalDetails';

jest.mock('@react-navigation/native', () => {});

jest.mock('@react-navigation/native', () => ({
  withNavigationFocus: (component) => component,
}));

jest.useFakeTimers();

describe('PersonalDetails screen', () => {
  const props = {
    navigation: {
      setOptions: jest.fn(),
    },
  };
  it('Snapshot PersonalDetails', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <PersonalDetails {...props} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
