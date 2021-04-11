import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Style} from './style';
import {translate} from '../../../../Localization';
class CWalkthrough extends PureComponent {
  render() {
    const {onPress, marginTop, skipPress} = this.props;
    return (
      <View style={[Style.infoAlertcontainer, {marginTop: marginTop}]}>
        <View style={Style.infoAlertSubcontainer}>
          <Text style={[Style.infoLabel, Style.infoLabelColor]}>
            {translate('STRINGS.TUTORIAL_STEP_THREE')}
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
      </View>
    );
  }
}

export default CWalkthrough;
