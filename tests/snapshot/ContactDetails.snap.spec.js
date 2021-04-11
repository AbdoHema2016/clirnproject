import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import store from '../../src/store';
import ContactDetails from '../../src/containers/onBoarding/contactDetails/ContactDetails';

jest.mock('@react-navigation/native', () => {});
jest.mock('react-native-gesture-handler', () => {});
jest.mock('react-native-otp-verify', () => ({
  getHash: jest.fn().mockImplementation(() => Promise.reject()),
  getOtp: jest.fn(),
  removeListener: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  withNavigationFocus: (component) => component,
}));

jest.useFakeTimers();

describe('Contact Details screen', () => {
  const props = {
    navigation: {
      setOptions: jest.fn(),
    },
    editContactDetails: jest.fn(),
    addContactetails: jest.fn(),
    missingContactFields: jest.fn(),
    policyCheck: jest.fn(),
    getCodeList: jest.fn(),
  };
  it('Snapshot ContactDetails', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ContactDetails {...props} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
