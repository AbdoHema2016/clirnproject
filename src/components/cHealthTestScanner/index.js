import React, {PureComponent} from 'react';
import {View, Modal, Text, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Constants} from '../../utilities';
import {translate} from '../../Localization';

import Style from './style';
import Image from '../cImage';
import CButtonWithImage from '../cButtonWithImage';
import ErrorView from '../cMeError';

const {LOCAL_PATH} = Constants;

class CMeSignScanner extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  render() {
    const {close} = this.props;

    return (
      <View style={Style.scannerContainer}>
        <Modal style={Style.modal} animationType="fade" transparent={true}>
          <View style={Style.modalContainer}>
            <RNCamera
              style={Style.camera}
              captureAudio={false}
              notAuthorizedView={
                <View style={Style.errContainer}>
                  <ErrorView
                    errorText={translate('STRINGS.ERROR_CAMERA')}
                    onClose={close}
                  />
                </View>
              }>
              <View style={Style.scannerMaskBackground}>
                <Image
                  resizeMode={'contain'}
                  imageStyle={Style.scannerMaskImage}
                  imagePath={LOCAL_PATH.healthTestMask}
                />
              </View>
              <View style={Style.topContent}>
                <CButtonWithImage
                  buttonContainerStyle={Style.buttonContainer}
                  buttonCustomStyle={Style.buttonStyle}
                  textStyle={Style.textStyle}
                  customeImageStyle={Style.imageStyle}
                  imagePath={LOCAL_PATH.LEFT_ARROW_WHITE_ICON}
                  text={translate('STRINGS.CAMERA_HEALTH_TEST_SCAN_BACK')}
                  onPress={() => close()}
                />
              </View>
              <View style={Style.bottomContent}>
                <TouchableOpacity style={[Style.infoBox]}>
                  <Text style={Style.infoHeader}>
                    {translate('STRINGS.CAMERA_HEALTH_TEST_SCAN_ID_MSG')}
                  </Text>
                  <Text style={Style.infoMessage}>
                    {translate('STRINGS.CAMERA_HEALTH_TEST_SCAN_POSITION_MSG')}
                  </Text>
                </TouchableOpacity>
              </View>
            </RNCamera>
          </View>
        </Modal>
      </View>
    );
  }
}

export default CMeSignScanner;
