import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Style} from './style';
import CImage from '../../../../components/cImage';
import {Constants} from '../../../../utilities';
import {translate} from '../../../../Localization';

const {LOCAL_PATH} = Constants;

class TutorialSix extends PureComponent {
  render() {
    const {onPress, marginTop, skipPress, left} = this.props;
    return (
      <View style={{...Style.tutorial6Container, marginTop: marginTop}}>
        <View style={[Style.infoAlertcontainer]}>
          <TouchableOpacity
            style={[Style.scanMeButton, {left: left - 20}]}
            onPress={this.showMeSignScanner}>
            <CImage
              resizeMode={'cover'}
              imageStyle={Style.scanMeIcon}
              imagePath={LOCAL_PATH.SCAN_ICON}
            />
            <Text style={Style.scanMeText}>{translate('STRINGS.SCAN_ME')}</Text>
          </TouchableOpacity>
          <View style={[Style.triangle, {left: left}]} />
          <View style={Style.infoAlertSubcontainer}>
            <Text style={[Style.infoLabel, Style.infoLabelColor]}>
              {translate('STRINGS.TUTORIAL_STEP_SIX')}
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

export default TutorialSix;
