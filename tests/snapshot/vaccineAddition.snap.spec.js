import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import store from '../../src/store';
import CVaccineForm from '../../src/containers/dashBoard/vaccinesResults/vaccineDetails/CVaccineForm';

describe('Vaccine Form', () => {
  it('initial vaccine form data', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <CVaccineForm />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
