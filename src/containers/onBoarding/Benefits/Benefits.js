import {View} from 'react-native';
import React, {Component} from 'react';
import {
  IndicatorViewPager,
  PagerDotIndicator,
} from 'react-native-best-viewpager';
import CBenefit from './component/CBenefit';
import Style from './style';
import CButton from '../../../components/cButton';
import {Constants} from '../../../utilities';
import {translate} from '../../../Localization';

import {logAnalyticsEvent} from '../../../utilities/Firebase';

const {LOCAL_PATH, testIds, analyticsIds} = Constants;

export default class Benefits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
    };
  }

  setPage = () => {
    if (this._setPage._currentIndex === 1) {
      this.props.navigation.navigate('PersonalDetails');
      logAnalyticsEvent(analyticsIds.start_personal_details);
    } else {
      this._setPage._goToNextPage();
      logAnalyticsEvent(analyticsIds.onboard_benefit);
    }
  };

  goToSignIn = () => {
    this.props.navigation.navigate('SignIn');
  };

  render() {
    return (
      <View style={Style.container}>
        <IndicatorViewPager
          style={Style.container}
          indicator={this._renderDotIndicator()}
          ref={(ref) => (this._setPage = ref)}>
          <View style={Style.innerContainers}>
            <CBenefit
              title={translate('BENEFIT_SCREEN_STRINGS.BENEFIT_FIRST_TITLE')}
              subTitle={translate(
                'BENEFIT_SCREEN_STRINGS.BENEFIT_FIRST_SUBTITLE',
              )}
              imagePath={LOCAL_PATH.BENEFIT1_ICON}
            />
          </View>
          <View style={Style.innerContainers}>
            <CBenefit
              title={translate('BENEFIT_SCREEN_STRINGS.BENEFIT_SECOND_TITLE')}
              subTitle={translate(
                'BENEFIT_SCREEN_STRINGS.BENEFIT_SECOND_SUBTITLE',
              )}
              imagePath={LOCAL_PATH.BENEFIT2_ICON}
            />
          </View>
        </IndicatorViewPager>
        <View style={Style.buttonsContainer}>
          <CButton
            testID={testIds.continueToNextBenefit}
            accessibilityLabel={testIds.continueToNextBenefit}
            text={'Continue'}
            textStyle={Style.whiteText}
            onPress={this.setPage}
            buttonContainerStyle={Style.blackButton}
          />
          <CButton
            testID={testIds.gotoSignInFromBenefits}
            accessibilityLabel={testIds.gotoSignInFromBenefits}
            text={'Sign In'}
            textStyle={Style.blackText}
            onPress={this.goToSignIn}
            buttonContainerStyle={Style.whiteButton}
          />
        </View>
      </View>
    );
  }

  _renderDotIndicator() {
    return (
      <PagerDotIndicator
        dotStyle={Style.unSelectedDotStyle}
        selectedDotStyle={Style.selectedDotStyle}
        pageCount={2}
      />
    );
  }
}
