import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Style} from './style';
import {translate} from '../../../../Localization';
import CImage from '../../../../components/cImage';
import {LOCAL_PATH} from '../../../../Constants';

class MESign extends PureComponent {
  render() {
    const {onPress, skipPress} = this.props;
    return (
      <View style={[Style.meContainer]}>
        <View style={Style.highlightedStep}>
          <CImage
            imagePath={LOCAL_PATH.blurredQR}
            imageStyle={Style.imgBlurredQR}
          />
        </View>
        <View style={[Style.infoAlertcontainer]}>
          <View style={Style.triangle} />
          <View style={Style.infoAlertSubcontainer}>
            <Text style={[Style.infoLabel, Style.infoLabelColor]}>
              {translate('STRINGS.QR_CODE_MESSAGE')}
            </Text>
            <View style={Style.nextButtonContainer}>
              <Text style={Style.skipButton} onPress={skipPress}>
                {translate('walkthrough.SKIP')}
              </Text>

              <TouchableOpacity style={Style.nextButton} onPress={onPress}>
                <Text style={Style.nextButtonLabel}>
                  {translate('walkthrough.NEXT')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default MESign;
