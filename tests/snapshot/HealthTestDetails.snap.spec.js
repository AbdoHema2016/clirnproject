import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import store from '../../src/store';
import HealthDetails from '../../src/containers/dashBoard/HealthTests/Details';
import {Constants} from '../../src/utilities';
const {screenSource, RejectionTypes} = Constants;
jest.mock('react-native-gesture-handler', () => {});
jest.mock('@react-navigation/native', () => ({
  withNavigationFocus: (component) => component,
}));

jest.useFakeTimers();

describe('Health Test Details screen', () => {
  const props = {
    navigation: {
      setOptions: jest.fn(),
    },
    source: screenSource.OTHER_USER_PROFILE,
    zoom: false,
    loading: false,
    healthTestDetails: {
      deny_reason: RejectionTypes.illegibleDocument,
      is_verified: false,
    },
  };
  it('Snapshot rejected Health test Details illegible document (other user profile)', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <HealthDetails {...props} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Snapshot rejected Health test Details illegible document (own user test)', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <HealthDetails {...{...props, source: screenSource.HEALTH_RESULTS}} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Snapshot verified Health test Details (own user test)', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <HealthDetails
            {...{
              ...props,
              source: screenSource.HEALTH_RESULTS,
              is_verified: true,
              deny_reason: '',
            }}
          />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
