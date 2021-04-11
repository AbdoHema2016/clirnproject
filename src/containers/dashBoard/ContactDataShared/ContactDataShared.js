import React from 'react';
import {Text, SafeAreaView, Image, View} from 'react-native';
import Styles from './style/style';
import {Constants} from '../../../utilities';

import {translate} from '../../../Localization';

import CButton from '../../../components/cButton';

const {LOCAL_PATH} = Constants;

const ContactDataShared = ({
  navigation: {goBack},
  route: {params: {source, idMatched} = {}},
}) => {
  const popScreen = () => goBack();
  const getSource = () => {
    if (source === 'Employee' || (source === 'VenueEnter' && idMatched)) {
      return translate('STRINGS.EMPLOYEE_ADDED_SUCCESSFULLY');
    }
    if (source === 'VenueEnter' && !idMatched) {
      return translate('STRINGS.VISITOR_ENTERED_VENUE');
    }
    if (source === 'VenueLeave') {
      return translate('STRINGS.VENUE_LEFT');
    }
    return translate('STRINGS.CONTACT_DATA_SHARED_CONFIRMATION');
  };
  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.upperContainer}>
        <Text style={Styles.yourIdBeingVerified}>{getSource()}</Text>
        <Image
          source={LOCAL_PATH.CONTACT_DATA_SHARED_TICK}
          style={Styles.tick}
        />
      </View>
      <CButton
        text={'OK'}
        textStyle={Styles.ok}
        onPress={popScreen}
        buttonContainerStyle={Styles.okButton}
      />
    </SafeAreaView>
  );
};

export default ContactDataShared;
