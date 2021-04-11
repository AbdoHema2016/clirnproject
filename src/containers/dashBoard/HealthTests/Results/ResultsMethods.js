import React from 'react';
import {View, Platform, TouchableOpacity} from 'react-native';
import CLabel from '../../../../components/cLabel';
import CImage from '../../../../components/cImage';
import {Style} from './style';
import {Constants, testIds, HelperFunctions} from '../../../../utilities';
import {translate} from '../../../../Localization';
import dayjs from 'dayjs';
import ModalsQueue from '../../../../services/ModalsQueue';
import {
  logAnalyticsEvent,
  setUserAnalyticsProperties,
} from '../../../../utilities/Firebase';

const {DATEFORMATS, modalIds, analyticsIds} = Constants;
const {isHealthTestPositive} = HelperFunctions;
class ResultsMethods {
  constructor() {
    this.props = null;
    this.instance = null;
  }

  set setProps(props) {
    this.props = props;
  }

  set setInstance(instance) {
    this.instance = instance;
  }
  goBack = () => {
    this.props.navigation.pop();
  };

  addNewTest = () => {
    const {userLocation = '', associatedCompany = '', route} = this.props;
    const screenName = route?.name;
    setUserAnalyticsProperties({
      userLocation,
      screenName,
      associatedCompany,
    });
    logAnalyticsEvent(analyticsIds.healthResultsScreen_test_started, {
      userLocation,
      associatedCompany,
      screenName,
    });

    let data = {
      testData: {
        id: this.instance.state.id,
        testCentre: {value: '', empty: true, status: ''},
        testType: {
          value: Platform.select({
            ios: '',
            android: translate('testTypes.antibodyTest'),
          }),
          empty: Platform.OS === 'ios',
          status: '',
        },
        testDate: {value: '', empty: true, status: ''},
        testResult: {
          value: Platform.select({
            ios: '',
            android: translate('testResults.iggOnlyPositive'),
          }),
          empty: Platform.OS === 'ios',
          status: '',
        },
        howWasThistestPerformed: {
          value: translate('testMethods')[0],
          empty: false,
          status: '',
        },
        document: {
          name: '',
          type: '',
          uri: '',
        },
        missingFields: true,
      },
    };
    this.props.addHealthDataFields(data);
    ModalsQueue.showModal({
      modalId: modalIds.addNewHealthTest,
      showModalFunction: () => this.instance.setState({showModal: true}),
    });
  };
  editTest = async (item) => {
    const {
      test_center,
      test_date,
      test_performed,
      test_result,
      test_type,
      id,
    } = item;
    const {updateHealthTestID, editHealthData} = this.props;

    let docName = item.document.substring(item.document.lastIndexOf('/') + 1);

    let docType = item.document.substring(item.document.lastIndexOf('.') + 1);
    let formattedDate = dayjs(test_date, DATEFORMATS.TEMPERATURE_DATA).format(
      DATEFORMATS.PROFILE_HEALTH_TEST,
    );
    updateHealthTestID(id);
    let data = {
      healthTestData: [
        {
          testData: {
            id,
            howWasThistestPerformed: {
              value: test_performed,
              empty: false,
              status: 'active',
            },

            testCentre: {value: test_center, empty: false, status: 'active'},
            testDate: {value: formattedDate, empty: false, status: 'active'},
            testResult: {value: test_result, empty: false, status: 'active'},
            testType: {value: test_type, empty: false, status: 'active'},

            document: {
              name: docName,
              type: docType,
              uri: item.document,
            },
          },
        },
      ],
      index: id,
    };

    editHealthData(data);
    this.instance.setState({showModal: true});
  };
  showError = () => {
    this.instance.setState({error: !this.instance.state.error});
  };
  setResultIcon(stats, isVerified) {
    let resultIcon = isHealthTestPositive(stats, isVerified);

    return (
      <View style={Style.statusIconContainer}>
        <CImage imageStyle={Style.statusIcon} imagePath={resultIcon} />
      </View>
    );
  }
  refreshTests = () => {
    this.instance.setState({refreshing: true});
    const {access_token} = this.props;
    this.props.getHealthTests(access_token);
    this.instance.setState({refreshing: false});
  };
  formatDate = (currentDate) => {
    let newDate = dayjs(currentDate, DATEFORMATS.TEMPERATURE_DATA).format(
      DATEFORMATS.PROFILE_HEALTH_TEST,
    );
    return newDate;
  };
  showVerified = (isVerified) => {
    if (isVerified) {
      return (
        <CLabel
          style={Style.verify}
          accessibilityLabel={testIds.verifiedTxtSettings}
          testID={testIds.verifiedTxtSettings}
          text={translate('healthTest.verified')}
        />
      );
    }
    if (isVerified === false) {
      return (
        <CLabel
          style={Style.notVerified}
          accessibilityLabel={testIds.verifiedTxtSettings}
          testID={testIds.verifiedTxtSettings}
          text={translate('healthTest.notVerified')}
        />
      );
    }
    return null;
  };
  historyRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        accessibilityLabel={testIds.healthTestResult + index}
        testID={testIds.healthTestResult + index}
        style={Style.historyCard}
        onPress={() =>
          this.props.navigation.navigate('HealthDetails', {id: item.id})
        }>
        <View style={Style.flexRow}>
          {this.setResultIcon(item.stats, item.is_verified)}
          <View style={Style.details}>
            <CLabel style={Style.sharedDetail} text={item.test_type} />

            {this.showVerified(item.is_verified)}
            <CLabel style={Style.time} text={this.formatDate(item.test_date)} />
          </View>
        </View>
        <View style={Style.underLine} />
      </TouchableOpacity>
    );
  };
}

const resultsMethods = new ResultsMethods();

export default resultsMethods;
