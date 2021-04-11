import React from 'react';
import {Text, SafeAreaView, Image, View} from 'react-native';
import Styles from './style/style';
import {Constants} from '../../../utilities';
import {translate} from '../../../Localization';
import CButton from '../../../components/cButton';

const {LOCAL_PATH} = Constants;

const PendingVerification = ({navigation: {goBack}}) => {
  const popScreen = () => goBack();
  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.upperContainer}>
        <Text style={Styles.yourIdBeingVerified}>
          Your ID is currently {'\n'}being verified
        </Text>
        <Text style={Styles.youCanOnlyShare}>
          {translate('STRINGS.PENDING_APPROVAL')}
        </Text>
        <Image
          source={LOCAL_PATH.PENDING_VERIFICATION_TICK}
          style={Styles.pendingVerificationTick}
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

export default PendingVerification;
