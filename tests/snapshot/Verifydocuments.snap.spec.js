import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import store from '../../src/store';
import VerifyDocuments from '../../src/containers/onBoarding/verifyDocuments/VerifyDocuments';

jest.mock('@react-navigation/native', () => ({
  withNavigationFocus: (component) => component,
}));

jest.useFakeTimers();

describe('VerifyDocuments screen', () => {
  const props = {
    navigation: {
      setOptions: jest.fn(),
    },
  };
  it('Snapshot VerifyDocuments', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <VerifyDocuments {...props} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
