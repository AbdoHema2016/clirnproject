import React, {Component} from 'react';
import {View, Platform} from 'react-native';
import {connect} from 'react-redux';
import {Style} from './style';
import {MedicalApproverObj} from './Methods';
import CLabel from '../../../components/cLabel';
import {translate} from '../../../Localization';

import {becomeMedicalApproverAction} from './redux/actions';
import Loader from '../../../components/cLoader';
import MedicalApproverContent from './MedicalContentComponent';
import {getJumioCredentials} from '../../onBoarding/verifyDocuments/redux/actions';
import {JumioFlowMethodsObj} from '../../Jumio/verificationFlowMethods';
import CPicker from '../../../components/cPicker';
import {USStates} from './USStates';
class MedicalApprover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      termsChecked: false,
      approverRole: '',
      unitedKingdom: false,
      unitedStates: false,
      other: false,
      chosenLocation: '',
      locationConfirmed: false,
      source: 'medicalApprover',
      medicalProfessionalTitle: '',
      GMCNumber: '',
      GMCError: false,
      pickerVisible: false,
      licenseNum: '',
      USState:
        Platform.OS === 'ios'
          ? translate('MEDICAL_APPROVER.STATE_PLACEHOLDER')
          : translate('MEDICAL_APPROVER.FIRST_STATE'),
    };
    MedicalApproverObj.setProps(this.props);
    MedicalApproverObj.setInstance(this);
    JumioFlowMethodsObj.setProps(this.props);
    JumioFlowMethodsObj.setInstance(this);
  }

  componentDidMount() {
    const {idValidated} = this.props;
    if (!idValidated) {
      JumioFlowMethodsObj.getJumioData();
    }
  }
  showChooseRole = () => {
    this.setState({step: 2});
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.idValidated &&
      this.props.idValidated !== prevProps.idValidated
    ) {
      this.showChooseRole();
    }
  }

  render() {
    const {loading, approved, idValidated} = this.props;
    const {
      step,
      termsChecked,
      unitedKingdom,
      unitedStates,
      other,
      locationConfirmed,
      GMCError,
      pickerVisible,
      USState,
    } = this.state;
    return (
      <View style={Style.container}>
        <CLabel
          style={Style.appTitle}
          text={translate('MEDICAL_APPROVER.TITLE')}
        />
        <MedicalApproverContent
          step={step}
          termsChecked={termsChecked}
          unitedKingdom={unitedKingdom}
          unitedStates={unitedStates}
          other={other}
          approved={approved}
          idValidated={idValidated}
          locationConfirmed={locationConfirmed}
          GMCError={GMCError}
          USState={USState}
          pickerVisible={pickerVisible}
          setPickerVisible={(value) => this.setState({pickerVisible: value})}
          setUSState={(USStateValue) => this.setState({USState: USStateValue})}
        />
        {Platform.OS === 'ios' && (
          <CPicker
            selectedValue={USState}
            showDatePicker={() =>
              this.setState({pickerVisible: !pickerVisible})
            }
            pickerItems={USStates}
            setTitle={(state) => {
              this.setState({USState: state});
            }}
            modalVisible={pickerVisible}
          />
        )}

        <Loader loading={loading} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    signIn: {token, userID},
    becomeMedicalApprover: {loading, approved},
    userProfile: {idValidated},
    jumio: {apiSecret, apiToken, dataCenter, error},
  } = state;
  return {
    token,
    loading,
    approved,
    idValidated,
    apiSecret,
    apiToken,
    dataCenter,
    error,
    userId: userID,
  };
};

const mapDispatchToProps = {
  becomeMedicalApprover: becomeMedicalApproverAction,
  fetchJumioCredentials: getJumioCredentials,
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalApprover);
