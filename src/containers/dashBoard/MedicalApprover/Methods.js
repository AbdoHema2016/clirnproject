import {logAnalyticsEvent} from '../../../utilities/Firebase';
import {Constants, OpenExternalURl} from '../../../utilities';
import {translate} from '../../../Localization';

const {openUrl} = OpenExternalURl;
const {
  analyticsIds,
  MedicalApproverLocationIds,
  URLS,
  medicalApproverSteps,
  medicalApproverCountry,
} = Constants;

class MedicalApprover {
  constructor() {
    this.props = null;
    this.instance = null;
  }

  setProps(props) {
    this.props = props;
  }

  setInstance(instance) {
    this.instance = instance;
  }
  triggerMedicalApproverFlow = () => {
    logAnalyticsEvent(analyticsIds.trigger_medical_approver_flow);
    this.instance.setState({step: medicalApproverSteps.chooseLocation});
  };
  toggleTermsAcceptance = () => {
    this.instance.setState({termsChecked: !this.instance.state.termsChecked});
  };
  chooseLocation = (Location) => {
    switch (Location) {
      case MedicalApproverLocationIds.unitedKingdom:
        this.instance.setState({
          unitedKingdom: true,
          unitedStates: false,
          other: false,
          chosenLocation: translate('MEDICAL_APPROVER.UNITED_KINGDOM'),
        });
        break;
      case MedicalApproverLocationIds.unitedStates:
        this.instance.setState({
          unitedKingdom: false,
          unitedStates: true,
          other: false,
          chosenLocation: translate('MEDICAL_APPROVER.UNITED_STATES'),
        });
        break;
      case MedicalApproverLocationIds.other:
        this.instance.setState({
          unitedKingdom: false,
          unitedStates: false,
          other: true,
          chosenLocation: translate('MEDICAL_APPROVER.OTHER_LOCATION'),
        });
        break;
      default:
        break;
    }
  };
  confirmLocation = () => {
    this.instance.setState({
      locationConfirmed: true,
      step: medicalApproverSteps.addMedicalApproverMedicalIdData,
    });
    if (this.instance.state.other) {
      logAnalyticsEvent(analyticsIds.submit_medical_approver_other_location);
    }
  };
  confirmSubmitUK = () => {
    const {medicalProfessionalTitle, GMCNumber} = this.instance.state;
    if (GMCNumber.length < 7) {
      this.instance.setState({GMCError: true});
      return;
    }
    const {becomeMedicalApprover} = this.props;

    becomeMedicalApprover({
      title: medicalProfessionalTitle,
      gmc: GMCNumber,
      country: medicalApproverCountry.UK,
    });
  };
  confirmSubmitUS = () => {
    const {medicalProfessionalTitle, licenseNum, USState} = this.instance.state;
    const {becomeMedicalApprover} = this.props;

    becomeMedicalApprover({
      title: medicalProfessionalTitle,
      licence_number: licenseNum,
      state: USState,
      country: medicalApproverCountry.USA,
    });
  };
  openTermsLink = () => {
    openUrl(URLS.TC_URL);
  };
  isLocationConfirmed = () => {
    const {unitedKingdom, unitedStates, other} = this.instance.state;
    return unitedKingdom || unitedStates || other;
  };
  isUKApproverDataComplete = () => {
    const {
      medicalProfessionalTitle,
      GMCNumber,
      termsChecked,
    } = this.instance.state;
    const isGMCNumberFilled = GMCNumber.trim();
    const isMedicalProfessionalTitleFilled = medicalProfessionalTitle.trim();
    return (
      isMedicalProfessionalTitleFilled && isGMCNumberFilled && termsChecked
    );
  };

  isUSApproverDataComplete = () => {
    const {
      medicalProfessionalTitle,
      licenseNum,
      USState,
      termsChecked,
    } = this.instance.state;
    const USStateAdded =
      USState !== translate('MEDICAL_APPROVER.STATE_PLACEHOLDER');
    const isLicenseNumFilled = licenseNum.trim();
    const isMedicalProfessionalTitleFilled = medicalProfessionalTitle.trim();
    return (
      isMedicalProfessionalTitleFilled &&
      isLicenseNumFilled &&
      USStateAdded &&
      termsChecked
    );
  };
  focusTitle = () => {
    this.medicalProfessionalTitle.focus();
  };
  setTitle = (title) => {
    this.instance.setState({medicalProfessionalTitle: title});
  };
  setGMC_number = (GMCNumber) => {
    this.instance.setState({GMCNumber});
    if (this.instance.state.GMCError && GMCNumber.length === 7) {
      this.instance.setState({GMCError: false});
    }
  };
  setLicenseNum = (licenseNum) => {
    this.instance.setState({licenseNum});
  };
}
export const MedicalApproverObj = new MedicalApprover();
