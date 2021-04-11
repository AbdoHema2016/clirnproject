import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ContactDetails from '../containers/onBoarding/contactDetails/ContactDetails';

const ContactStack = createStackNavigator();

export default class ContactNavigationStack extends React.Component {
  render() {
    return (
      <ContactStack.Navigator>
        <ContactStack.Screen name="ContactDetails" component={ContactDetails} />
      </ContactStack.Navigator>
    );
  }
}
