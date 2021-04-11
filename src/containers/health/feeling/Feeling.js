import React from 'react';
import {View, ScrollView, SafeAreaView, Text} from 'react-native';
import Style from './style';
import {connect} from 'react-redux';
import CLabel from '../../../components/cLabel/index';
import CButton from '../../../components/cButton/index';
import navigationService from '../../../Navigation/NavigationService';
import {
  feelingSelectedAction,
  sendHealthStatAction,
} from '../feeling/redux/actions';
import {signUpStepAction} from '../../onBoarding/personalDetails/redux/actions';
import AsyncStorage, {AsyncConstants} from '../../../utilities/AsyncStorage';
import CNavigationBackButton from '../../../components/cNavigationBackButton';
import {signUpSteps, testIds, analyticsIds} from '../../../utilities';

import {translate} from '../../../Localization';

import {logAnalyticsEvent} from '../../../utilities/Firebase';

class Feeling extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    navigationService.navigation = this.props.navigation;
  }

  componentDidMount() {
    this.navigationOptions();
  }

  navigationOptions = () => {
    this.props.navigation.setOptions({
      title: '',
      headerTransparent: true,
      headerLeft: () => (
        <CNavigationBackButton
          title={translate('BACK.BACK_BUTTON_TITLE')}
          backButtonAction={this.goBack}
        />
      ),
    });
  };

  goBack = () => {
    this.props.navigation.navigate('VerifyDocuments');
  };

  feelingSelected = (index, value) => {
    this.props.setFeeling(value, index);
  };

  onSkipPressed = () => {
    this.props.signupStep('6');
    AsyncStorage.setItemInStorage(AsyncConstants.STEP, signUpSteps.Temperature);
    this.props.navigation.navigate('Temperature');
    logAnalyticsEvent(analyticsIds.onboard_feeling_skipped);
  };

  sendHealthStat = () => {
    const {
      tempSkipped,
      modalIndex,
      feeling: {
        feeling: {value},
      },
    } = this.props;
    let data = {
      params: {
        health_status: value,
        step: 5,
      },
      token: this.props.access_token,
      via: 'signup',
      skip: tempSkipped,
      modalIndex: modalIndex,
    };
    logAnalyticsEvent(analyticsIds.onboard_feeling_added);
    this.props.sendHealthStat(data);
  };

  render() {
    return (
      <SafeAreaView style={Style.container}>
        <ScrollView style={Style.innerContainer} bounces={false}>
          <View style={Style.lablesContainer}>
            <CLabel style={Style.infoStageLabel} text={'5/7'} />
            <CLabel
              style={Style.appTitle}
              text={'How are you feeling right now?'}
            />
            <CLabel style={Style.chooseAns} text={'Choose the answer'} />
          </View>

          <View style={Style.answerButtons}>
            <CButton
              testID={testIds.feelingOne}
              accessibilityLabel={testIds.feelingOne}
              onPress={() => this.feelingSelected(0, 'I feel great')}
              text={'I feel great'}
              textStyle={Style.blackText}
              buttonContainerStyle={
                this.props.feeling.feeling.index === 0
                  ? Style.selectedButton
                  : Style.unselectedButton
              }
              backgroundColor={Style.selectedButton.backgroundColor}
            />
            <CButton
              testID={testIds.feelingTwo}
              accessibilityLabel={testIds.feelingTwo}
              onPress={() => this.feelingSelected(1, 'I feel normal')}
              text={'I feel normal'}
              textStyle={Style.blackText}
              buttonContainerStyle={
                this.props.feeling.feeling.index === 1
                  ? Style.selectedButton
                  : Style.unselectedButton
              }
              backgroundColor={Style.selectedButton.backgroundColor}
            />
            <CButton
              testID={testIds.feelingThree}
              accessibilityLabel={testIds.feelingThree}
              onPress={() => this.feelingSelected(2, 'I’m not too sure')}
              text={'I’m not too sure'}
              textStyle={Style.blackText}
              buttonContainerStyle={
                this.props.feeling.feeling.index === 2
                  ? Style.selectedButton
                  : Style.unselectedButton
              }
              backgroundColor={Style.selectedButton.backgroundColor}
            />
            <CButton
              testID={testIds.feelingFour}
              accessibilityLabel={testIds.feelingFour}
              onPress={() => this.feelingSelected(3, 'I don’t feel well')}
              text={'I don’t feel well'}
              textStyle={Style.blackText}
              buttonContainerStyle={
                this.props.feeling.feeling.index === 3
                  ? Style.selectedButton
                  : Style.unselectedButton
              }
              backgroundColor={Style.selectedButton.backgroundColor}
            />
          </View>
        </ScrollView>
        <View style={Style.buttonsContainer}>
          <CButton
            testID={testIds.continue}
            accessibilityLabel={testIds.continue}
            disabled={this.props.feeling.feeling.value == null ? true : false}
            text={'Continue'}
            textStyle={Style.whiteText}
            loading={this.props.feeling.loading}
            onPress={() => this.sendHealthStat()}
            buttonContainerStyle={
              this.props.feeling.feeling.value == null
                ? Style.disabledButton
                : Style.abledGreenButton
            }
          />
          <Text
            accessible={true}
            testID={testIds.skip}
            accessibilityLabel={testIds.skip}
            style={Style.skip}
            onPress={() => this.onSkipPressed()}>
            {translate('STRINGS.SKIP')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({
  feeling,
  personalDetails,
  userProfile,
  selectTempType,
}) => {
  return {
    feeling,
    access_token: personalDetails.access_token,
    tempSkipped: selectTempType.skip,
    modalIndex: userProfile.modalIndex,
  };
};

const mapDispatchToProps = {
  setFeeling: feelingSelectedAction,
  sendHealthStat: sendHealthStatAction,
  signupStep: signUpStepAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feeling);
