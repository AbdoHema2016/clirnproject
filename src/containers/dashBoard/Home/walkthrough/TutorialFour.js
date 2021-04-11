import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Style} from './style';
import CButtonWithImage from '../../../../components/cButtonWithImage';
import {Constants} from '../../../../utilities';
import {translate} from '../../../../Localization';

const {LOCAL_PATH} = Constants;

class CWalkthrough extends PureComponent {
  render() {
    const {onPress, marginTop, skipPress} = this.props;
    return (
      <View style={[Style.infoAlertcontainer, {marginTop: marginTop}]}>
        <View style={Style.infoAlertSubcontainer}>
          <Text style={[Style.infoLabel, Style.infoLabelColor]}>
            {translate('STRINGS.TUTORIAL_STEP_FOUR')}
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
        <View style={Style.bottomTriangle} />
        <View style={Style.shareIdButtonContainer}>
          <CButtonWithImage
            text={'Share my ID'}
            customeImageStyle={Style.shareMyIdIcon}
            imagePath={LOCAL_PATH.SHAREID_ICON}
            buttonContainerStyle={Style.shareIdButton}
            buttonCustomStyle={Style.buttonCustomStyle}
            textStyle={Style.shareIdButtonTitle}
          />
        </View>
      </View>
    );
  }
}

export default CWalkthrough;
