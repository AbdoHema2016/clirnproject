import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Style} from './style';
import CImage from '../../../../components/cImage';
import {Constants} from '../../../../utilities';
import {translate} from '../../../../Localization';

const {LOCAL_PATH, testIds} = Constants;

class TutorialOne extends PureComponent {
  render() {
    const {onPress, marginTop, skipPress, left} = this.props;
    return (
      <View style={[Style.infoAlertcontainer, {marginTop: marginTop}]}>
        <TouchableOpacity style={[Style.addImageButton, {left: left - 2}]}>
          <CImage
            resizeMode={'contain'}
            imageStyle={Style.userImage}
            imagePath={LOCAL_PATH.CONFIRMED_ICON}
          />
        </TouchableOpacity>
        <View style={[Style.triangle, {left: left}]} />
        <View style={Style.infoAlertSubcontainer}>
          <Text style={[Style.infoLabel, Style.infoLabelColor]}>
            {translate('STRINGS.TUTORIAL_STEP_TWO')}
          </Text>
          <View style={Style.nextButtonContainer}>
            <Text
              accessibilityLabel={testIds.skip}
              style={Style.skipButton}
              onPress={skipPress}>
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
    );
  }
}

export default TutorialOne;
