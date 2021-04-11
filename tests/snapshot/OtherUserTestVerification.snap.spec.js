import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import store from '../../src/store';
import OtherUserProfileData from '../../src/containers/dashBoard/OtherUserProfile/components/profileData';
import {Constants} from '../../src/utilities';
const {screenSource} = Constants;

jest.mock('react-native-gesture-handler', () => {});
jest.mock('@react-navigation/native', () => ({
  withNavigationFocus: (component) => component,
}));

jest.useFakeTimers();

describe('Other user profile screen', () => {
  const VerifiedTestProps = {
    navigation: {
      setOptions: jest.fn(),
    },
    isVerified: true,
    type: screenSource.HEALTH_RESULTS,
    canVerify: true,
    date: '2021-01-25 00:00:00',
  };
  it('Snapshot verified Test', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <OtherUserProfileData {...VerifiedTestProps} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot not verified Test', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <OtherUserProfileData
            {...{...VerifiedTestProps, isVerified: false}}
          />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Snapshot cannot verify Test', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <OtherUserProfileData {...{...VerifiedTestProps, canVerify: false}} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Snapshot not verified, cannot verify Test', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <OtherUserProfileData
            {...{...VerifiedTestProps, canVerify: false, isVerified: false}}
          />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Snapshot different page source', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <OtherUserProfileData
            {...{...VerifiedTestProps, type: screenSource.EDIT_VACCINE}}
          />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Snapshot verified vaccine', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <OtherUserProfileData
            {...{...VerifiedTestProps, type: screenSource.VACCINE}}
          />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Snapshot not verified vaccine', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <OtherUserProfileData
            {...{
              ...VerifiedTestProps,
              type: screenSource.VACCINE,
              isVerified: false,
            }}
          />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Snapshot cannot verify vaccine', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <OtherUserProfileData
            {...{
              ...VerifiedTestProps,
              type: screenSource.VACCINE,
              canVerify: false,
            }}
          />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Snapshot not verified, cannot verify vaccine', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <OtherUserProfileData
            {...{
              ...VerifiedTestProps,
              type: screenSource.VACCINE,
              canVerify: false,
              isVerified: false,
            }}
          />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
