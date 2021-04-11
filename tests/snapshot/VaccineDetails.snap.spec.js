import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import store from '../../src/store';
import VaccineDetails from '../../src/containers/dashBoard/vaccinesResults/vaccineDetails';
import {Constants} from '../../src/utilities';
const {screenSource, RejectionTypes} = Constants;
jest.mock('@react-navigation/native', () => ({
  withNavigationFocus: (component) => component,
}));
jest.mock('@react-native-community/netinfo', () => ({
  fetch: () => Promise.resolve({isConnected: true}),
}));

jest.useFakeTimers();

describe('Vaccine Details', () => {
  const props = {
    navigation: {
      setOptions: jest.fn(),
    },
    route: {params: {source: screenSource.OTHER_USER_PROFILE}},
    vaccineDetails: {
      isVerified: false,
      denyReason: RejectionTypes.illegibleDocument,
    },
  };
  it('Snapshot rejected vaccine Details illegible document (other user profile)', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <VaccineDetails {...props} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot verified vaccine Details (own user test)', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <VaccineDetails
            {...{
              ...props,
              vaccineDetails: {isVerified: true, denyReason: ''},
              route: {params: {source: screenSource.VACCINE}},
            }}
          />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot rejected vaccine Details illegible document (own user test)', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <VaccineDetails
            {...{
              ...props,
              route: {params: {source: screenSource.VACCINE}},
            }}
          />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
