import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import {connect} from 'react-redux';
import Style from './style';
import CLabel from '../cLabel';
import CButton from '../cButton';
import {Constants} from '../../utilities';
import {translate} from '../../Localization';

import {updateTempHistoryModalIndexAction} from '../../containers/dashBoard/Settings/temperatureResults/redux/actions';
import {HealthStatusMethodObj} from '../../containers/dashBoard/Home/Methods';
import {updateModalIndexAction} from '../../containers/dashBoard/Home/redux/actions';
import {skipStatsAction} from '../../containers/health/feeling/redux/actions';
const {healthStatuses, profileModals, testIds} = Constants;

class CHowYouAreFeeling extends React.Component {
  nextModal = () => {
    this.skipModal(false);
    HealthStatusMethodObj.sendHealthStat();
  };

  skipModal = (status) => {
    const {
      source,
      updateTempHistoryModalIndex,
      updateModalIndex,
      skipStats,
    } = this.props;
    if (status) {
      skipStats(true);
    }
    if (source === 'History') {
      return updateTempHistoryModalIndex(profileModals.temparatureUpdateModal);
    }

    return updateModalIndex(profileModals.temparatureUpdateModal);
  };

  render() {
    const {
      feeling: {feeling: healthStatus, loading},
    } = this.props;
    return (
      <View style={Style.container}>
        <View style={Style.subContainer}>
          <ScrollView style={Style.innerContainer} bounces={false}>
            <View style={Style.lablesContainer}>
              <CLabel
                style={Style.appTitle}
                text={translate('healthStatus.howareyoufeeling')}
              />
              <CLabel
                style={Style.chooseAns}
                text={translate('healthStatus.choosetheanswer')}
              />
            </View>

            <View style={Style.answerButtons}>
              <CButton
                testID={testIds.feelingOne}
                accessibilityLabel={testIds.feelingOne}
                onPress={() =>
                  HealthStatusMethodObj.feelingSelected(
                    healthStatuses.great,
                    translate('healthStatus.Ifeelgreat'),
                  )
                }
                text={translate('healthStatus.Ifeelgreat')}
                textStyle={Style.blackText}
                buttonContainerStyle={
                  healthStatus.index === healthStatuses.great
                    ? Style.selectedButton
                    : Style.unselectedButton
                }
                buttonCustomStyle={Style.unselectedButtonContAINER}
                backgroundColor={Style.selectedButton.backgroundColor}
              />
              <CButton
                testID={testIds.feelingTwo}
                accessibilityLabel={testIds.feelingTwo}
                onPress={() =>
                  HealthStatusMethodObj.feelingSelected(
                    healthStatuses.normal,
                    translate('healthStatus.Ifeelnormal'),
                  )
                }
                text={translate('healthStatus.Ifeelnormal')}
                textStyle={Style.blackText}
                buttonContainerStyle={
                  healthStatus.index === healthStatuses.normal
                    ? Style.selectedButton
                    : Style.unselectedButton
                }
                buttonCustomStyle={Style.unselectedButtonContAINER}
                backgroundColor={Style.selectedButton.backgroundColor}
              />
              <CButton
                testID={testIds.feelingThree}
                accessibilityLabel={testIds.feelingThree}
                onPress={() =>
                  HealthStatusMethodObj.feelingSelected(
                    healthStatuses.notsure,
                    translate('healthStatus.Iamnottoosure'),
                  )
                }
                text={translate('healthStatus.Iamnottoosure')}
                textStyle={Style.blackText}
                buttonContainerStyle={
                  healthStatus.index === healthStatuses.notsure
                    ? Style.selectedButton
                    : Style.unselectedButton
                }
                buttonCustomStyle={Style.unselectedButtonContAINER}
                backgroundColor={Style.selectedButton.backgroundColor}
              />
              <CButton
                testID={testIds.feelingFour}
                accessibilityLabel={testIds.feelingFour}
                onPress={() =>
                  HealthStatusMethodObj.feelingSelected(
                    healthStatuses.notwell,
                    translate('healthStatus.Idonotfeelwell'),
                  )
                }
                text={translate('healthStatus.Idonotfeelwell')}
                textStyle={Style.blackText}
                buttonContainerStyle={
                  healthStatus.index === healthStatuses.notwell
                    ? Style.selectedButton
                    : Style.unselectedButton
                }
                buttonCustomStyle={Style.unselectedButtonContAINER}
                backgroundColor={Style.selectedButton.backgroundColor}
              />
            </View>
          </ScrollView>
        </View>
        <View style={Style.buttonsContainer}>
          <CButton
            testID={testIds.continue}
            accessibilityLabel={testIds.continue}
            text={translate('STRINGS.SAVE')}
            textStyle={Style.whiteText}
            loading={loading}
            onPress={this.nextModal}
            disabled={healthStatus.value ? false : true}
            buttonContainerStyle={Style.abledGreenButton}
          />
          <Text
            accessibilityLabel={testIds.skipFeeling}
            style={Style.skip}
            onPress={() => this.skipModal(true)}>
            {translate('STRINGS.SKIP')}
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    feeling: state.feeling,
    tempSkipped: state.selectTempType.skip,
  };
};

const mapDispatchToProps = {
  updateTempHistoryModalIndex: updateTempHistoryModalIndexAction,
  updateModalIndex: updateModalIndexAction,
  skipStats: skipStatsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CHowYouAreFeeling);
