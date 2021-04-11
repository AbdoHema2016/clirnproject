import {Constants, Validations, OpenExternalURl} from '../../../utilities';
import {Keyboard} from 'react-native';
import {logAnalyticsEvent} from '../../../utilities/Firebase';

const {validateEmail, validatePhonenumber, validatePassword} = Validations;
const {URLS, analyticsIds} = Constants;
const {openUrl} = OpenExternalURl;

class ContactDetailsHelperFunctions {
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
    this.props.navigation.navigate('PersonalDetails');
  };
  editDetails = (label, value) => {
    if (label === 'email') {
      this.instance.setState({
        email: {
          value: value,
          empty: !validateEmail(value.trim()),
          state: 'Focused',
        },
      });
      return;
    }
    if (label === 'mobile') {
      this.instance.setState({
        phone: {
          value: value,
          empty: !validatePhonenumber(value.trim()),
          state: 'Focused',
        },
      });
      return;
    }
    if (label === 'countryCode') {
      this.instance.setState({
        countryCode: {
          value: value,
          empty: value.trim() === '' ? false : true,
          state: 'Focused',
        },
      });
      return;
    }
    this.instance.setState({
      password: {
        value: value,
        empty: !validatePassword(value.trim()),
        state: 'Focused',
        hidden: this.instance.state.password.hidden,
      },
    });
    return;
  };

  setPreviousActiveFieldStatus = (ref) => {
    const {email, phone, password} = this.instance.state;
    if (ref === this.instance.email) {
      this.instance.setState({
        email: {
          ...email,
          state: email.value ? 'Active' : '',
        },
      });
    }
    if (ref === this.instance.phonenumber) {
      this.instance.setState({
        phone: {
          ...phone,
          state: phone.value ? 'Active' : '',
        },
      });
    }
    if (ref === this.instance.password) {
      this.instance.setState({
        password: {
          ...password,
          state: password.value ? 'Active' : '',
        },
      });
    }
  };
  addDetails = () => {
    const {
      access_token,
      userId,
      contactDetails: {policyChecked},
      missingContactFields,
      addContactetails,
    } = this.props;
    const {
      email,
      countryCode,
      callingCode,
      phone,
      password,
    } = this.instance.state;
    if (!policyChecked) {
      return;
    }
    if (email.empty || phone.empty || password.empty) {
      return missingContactFields(true);
    }

    let contactDetails = {
      email: email.value,
      country_code: countryCode.value,
      mobile: `+${callingCode + phone.value}`,
      password: password.value,
      step: 2,
    };

    missingContactFields(false);
    logAnalyticsEvent(analyticsIds.finish_contact_details);
    addContactetails(contactDetails, userId, access_token);
  };

  privacyPolicyAction = () => {
    this.props.policyCheck(this.props.contactDetails.policyChecked);
  };

  showCodeList = () =>
    this.instance.setState({showCodeList: !this.instance.state.showCodeList});

  navToPrivacy = () => {
    openUrl(URLS.PRIVACY_POLICY_URL);
  };
  navToTerms = () => {
    openUrl(URLS.TC_URL);
  };

  focusPhoneNumber = () => {
    this.instance.previousActiveField = this.instance.email;
    this.instance.phonenumber.focus();
  };
  focusPassword = () => {
    this.instance.previousActiveField = this.instance.phonenumber;
    this.instance.password.focus();
  };
  submitPasswordEditing = () => {
    this.instance.previousActiveField = this.instance.password;
    Keyboard.dismiss();
  };
  hidePassword = () => {
    const {password} = this.instance.state;

    this.instance.setState({
      password: {
        ...password,
        hidden: !password.hidden,
      },
    });
  };
}

const contactDetailsHelperFunctions = new ContactDetailsHelperFunctions();

export default contactDetailsHelperFunctions;
