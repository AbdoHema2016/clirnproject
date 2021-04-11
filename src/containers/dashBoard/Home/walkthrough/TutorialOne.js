import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, Switch} from 'react-native';
import {Style} from './style';
import {Layout, testIds} from '../../../../utilities';
import {translate} from '../../../../Localization';
import {connect} from 'react-redux';
const {HEX_COLOR_CODES} = Layout;

class TutorialOne extends PureComponent {
  render() {
    const {
      onPress,
      marginTop,
      skipPress,
      left,
      testID,
      accessibilityLabel,
      email,
    } = this.props;
    if (!email) {
      return <></>;
    }
    return (
      <View style={[Style.infoAlertcontainer, {marginTop: marginTop}]}>
        <Switch
          trackColor={{
            false: HEX_COLOR_CODES.GREEN,
            true: HEX_COLOR_CODES.GREEN,
          }}
          disabled
          style={{...Style.switchStyle, left: left - 2}}
          value={true}
        />
        <View style={[Style.triangle, {left: left}]} />
        <View style={Style.infoAlertSubcontainer}>
          <Text style={[Style.infoLabel, Style.infoLabelColor]}>
            {translate('STRINGS.TUTORIAL_STEP_ONE')}
          </Text>
          <View style={Style.nextButtonContainer}>
            <Text
              accessibilityLabel={testIds.skipTutID}
              style={Style.skipButton}
              onPress={skipPress}>
              {translate('walkthrough.SKIP')}
            </Text>

            <TouchableOpacity
              testID={testID}
              accessibilityLabel={accessibilityLabel}
              style={Style.nextButton}
              onPress={onPress}>
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
const mapStateToProps = (state) => {
  const {
    userProfile: {
      userInfo: {email},
    },
  } = state;
  return {
    email,
  };
};

export default connect(mapStateToProps, {})(TutorialOne);
